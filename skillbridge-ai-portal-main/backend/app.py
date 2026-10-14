from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from dotenv import load_dotenv
import os
import sqlite3
import json
import re
import time

# =========================================================
# ENVIRONMENT
# =========================================================

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    print("WARNING: GEMINI_API_KEY is missing from .env")

client = genai.Client(api_key=API_KEY) if API_KEY else None

MODEL = "gemini-3.8-flash"


# =========================================================
# FLASK
# =========================================================

app = Flask(__name__)

CORS(
    app,
    resources={
        r"/*": {
            "origins": "*"
        }
    }
)


# =========================================================
# DATABASE
# =========================================================

DB_NAME = "users.db"


def get_db():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():

    conn = get_db()

    conn.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    """)

    conn.commit()
    conn.close()


init_db()


# =========================================================
# GEMINI HELPER
# =========================================================

def ask_gemini(prompt):

    if not client:
        raise Exception("GEMINI_API_KEY is missing.")

    try:

        response = client.models.generate_content(
            model=MODEL,
            contents=prompt
        )

        if not response.text:
            raise Exception("Gemini returned an empty response.")

        return response.text.strip()

    except Exception as e:

        error_text = str(e)

        print("Gemini Error:", error_text)

        # Gemini quota error
        if "429" in error_text or "RESOURCE_EXHAUSTED" in error_text:

            raise Exception(
                "Gemini API quota exceeded. Please wait and try again later."
            )

        # Temporary server error
        if "503" in error_text or "UNAVAILABLE" in error_text:

            time.sleep(2)

            raise Exception(
                "Gemini AI service is temporarily unavailable."
            )

        raise Exception(error_text)


# =========================================================
# HEALTH CHECK
# =========================================================

@app.route("/", methods=["GET"])
def home():

    return jsonify({
        "success": True,
        "message": "SkillBridge AI backend is running."
    })


# =========================================================
# SIGNUP
# =========================================================

@app.route("/signup", methods=["POST"])
def signup():

    try:

        data = request.get_json(silent=True) or {}

        name = data.get("name", "").strip()
        email = data.get("email", "").strip().lower()
        password = data.get("password", "")

        if not name or not email or not password:

            return jsonify({
                "success": False,
                "message": "Please fill all fields."
            }), 400

        if len(password) < 8:

            return jsonify({
                "success": False,
                "message": "Password must contain at least 8 characters."
            }), 400

        conn = get_db()

        existing_user = conn.execute(
            "SELECT id FROM users WHERE email = ?",
            (email,)
        ).fetchone()

        if existing_user:

            conn.close()

            return jsonify({
                "success": False,
                "message": "This email is already registered. Please log in."
            }), 409

        conn.execute(
            """
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
            """,
            (name, email, password)
        )

        conn.commit()
        conn.close()

        return jsonify({
            "success": True,
            "message": "Account created successfully!"
        })

    except Exception as e:

        print("Signup Error:", e)

        return jsonify({
            "success": False,
            "message": "Signup failed."
        }), 500


# =========================================================
# LOGIN
# =========================================================

@app.route("/login", methods=["POST"])
def login():

    try:

        data = request.get_json(silent=True) or {}

        email = data.get("email", "").strip().lower()
        password = data.get("password", "")

        if not email or not password:

            return jsonify({
                "success": False,
                "message": "Please enter email and password."
            }), 400

        conn = get_db()

        user = conn.execute(
            """
            SELECT id, name, email
            FROM users
            WHERE email = ? AND password = ?
            """,
            (email, password)
        ).fetchone()

        conn.close()

        if not user:

            return jsonify({
                "success": False,
                "message": "Invalid email or password."
            }), 401

        return jsonify({
            "success": True,
            "message": "Login successful!",
            "user": {
                "id": user["id"],
                "name": user["name"],
                "email": user["email"]
            }
        })

    except Exception as e:

        print("Login Error:", e)

        return jsonify({
            "success": False,
            "message": "Login failed."
        }), 500


# =========================================================
# AI CHAT
# =========================================================

@app.route("/chat", methods=["POST"])
def chat():

    try:

        data = request.get_json(silent=True) or {}

        message = data.get("message", "").strip()

        if not message:

            return jsonify({
                "success": False,
                "reply": "Please enter a message."
            }), 400

        prompt = f"""
You are SkillBridge AI, an AI career assistant for students.

User question:
{message}

Instructions:
- Use simple English.
- Give practical career advice.
- Keep the response concise.
- Use bullet points when useful.
- Avoid unnecessary long explanations.
"""

        answer = ask_gemini(prompt)

        return jsonify({
            "success": True,
            "reply": answer
        })

    except Exception as e:

        print("Chat Error:", e)

        return jsonify({
            "success": False,
            "reply": str(e)
        }), 503


# =========================================================
# CAREER ROADMAP
# =========================================================

@app.route("/roadmap", methods=["POST"])
def roadmap():

    try:

        data = request.get_json(silent=True) or {}

        role = data.get("role", "software developer")
        level = data.get("level", "beginner")
        hours = data.get("hours", 2)
        skills = data.get("skills", [])

        skills_text = ", ".join(skills) if skills else "None"

        prompt = f"""
Create a practical career roadmap.

Target role:
{role}

Current level:
{level}

Study hours per day:
{hours}

Current skills:
{skills_text}

Return ONLY valid JSON.

Format:

{{
  "role": "{role}",
  "level": "{level}",
  "months": [
    {{
      "month": "Month 1",
      "focus": "Topic",
      "tasks": [
        "Task 1",
        "Task 2",
        "Task 3"
      ]
    }}
  ]
}}

Create 3 to 4 months of roadmap.
Keep tasks realistic for a college student.
"""

        result = ask_gemini(prompt)

        result = clean_json(result)

        roadmap_data = json.loads(result)

        return jsonify({
            "success": True,
            "roadmap": roadmap_data
        })

    except Exception as e:

        print("Roadmap Error:", e)

        return jsonify({
            "success": False,
            "message": str(e)
        }), 503


# =========================================================
# RESUME ANALYZER
# =========================================================

@app.route("/resume-analyze", methods=["POST"])
def resume_analyze():

    try:

        data = request.get_json(silent=True) or {}

        resume_text = data.get("resumeText", "").strip()
        role = data.get("role", "general").strip()

        if not resume_text:

            return jsonify({
                "success": False,
                "message": "Resume text is required."
            }), 400

        # Prevent unnecessarily huge requests
        resume_text = resume_text[:30000]

        prompt = f"""
You are an expert ATS resume analyzer.

Analyze the following resume for the target career role.

Target Role:
{role}

Resume:
--------------------
{resume_text}
--------------------

Return ONLY valid JSON.

Use this exact structure:

{{
  "score": 0,
  "skills": 0,
  "projects": 0,
  "education": 0,
  "experience": 0,

  "ats": {{
    "formatting": 0,
    "skills": 0,
    "projects": 0,
    "experience": 0,
    "education": 0
  }},

  "strengths": [
    "strength 1",
    "strength 2",
    "strength 3"
  ],

  "improvements": [
    "improvement 1",
    "improvement 2",
    "improvement 3"
  ],

  "recommendations": [
    "skill 1",
    "skill 2",
    "skill 3",
    "skill 4"
  ]
}}

Rules:
- Scores must be integers between 0 and 100.
- Do NOT use fixed scores.
- Scores must depend on the actual resume.
- Consider the target role.
- Do not invent experience that is not present.
- Strengths must come from the resume.
- Improvements should be useful and realistic.
- Recommendations should match the target role.
"""

        result = ask_gemini(prompt)

        result = clean_json(result)

        analysis = json.loads(result)

        # Make sure required values exist
        analysis.setdefault("score", 0)
        analysis.setdefault("skills", 0)
        analysis.setdefault("projects", 0)
        analysis.setdefault("education", 0)
        analysis.setdefault("experience", 0)

        analysis.setdefault(
            "ats",
            {
                "formatting": 0,
                "skills": 0,
                "projects": 0,
                "experience": 0,
                "education": 0
            }
        )

        analysis.setdefault("strengths", [])
        analysis.setdefault("improvements", [])
        analysis.setdefault("recommendations", [])

        return jsonify({
            "success": True,
            "analysis": analysis
        })

    except json.JSONDecodeError:

        print("Resume Error: Gemini returned invalid JSON.")

        return jsonify({
            "success": False,
            "message": "AI returned an invalid analysis. Please try again."
        }), 500

    except Exception as e:

        print("Resume Analysis Error:", e)

        return jsonify({
            "success": False,
            "message": str(e)
        }), 503


# =========================================================
# CLEAN GEMINI JSON
# =========================================================

def clean_json(text):

    text = text.strip()

    # Remove markdown code fences
    text = re.sub(
        r"^```json\s*",
        "",
        text,
        flags=re.IGNORECASE
    )

    text = re.sub(
        r"^```\s*",
        "",
        text
    )

    text = re.sub(
        r"\s*```$",
        "",
        text
    )

    return text.strip()


# =========================================================
# RUN SERVER
# =========================================================

if __name__ == "__main__":

    print("====================================")
    print("SkillBridge AI Backend")
    print("Server: http://127.0.0.1:5000")
    print("====================================")

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )