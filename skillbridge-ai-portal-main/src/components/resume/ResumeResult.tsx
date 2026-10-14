import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

type ResumeAnalysis = {
  score: number;
  skillsScore: number;
  projectsScore: number;
  educationScore: number;
  experienceScore: number;
  formattingScore: number;

  strengths: string[];
  improvements: string[];
  recommendations: string[];

  summary: string;
};

type ResumeResultProps = {
  role: string;
  resumeText: string;
};

export default function ResumeResult({
  role,
  resumeText,
}: ResumeResultProps) {

  const [analysis, setAnalysis] =
    useState<ResumeAnalysis | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    const analyzeResume = async () => {

      try {

        setLoading(true);
        setError("");

        const response = await fetch(
          "http://127.0.0.1:5000/resume-analyze",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              role,
              resumeText,
            }),
          }
        );

        const data =
          await response.json();

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.message ||
              "AI analysis failed."
          );
        }

        setAnalysis(
          data.analysis
        );

      } catch (error) {

        console.error(
          "AI analysis error:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Unable to analyze resume."
        );

      } finally {

        setLoading(false);

      }

    };

    if (resumeText) {
      analyzeResume();
    }

  }, [role, resumeText]);

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <Card className="mt-6 p-6">

        <h3 className="text-lg font-semibold">

          🤖 AI is analyzing your resume...

        </h3>

        <p className="mt-2 text-sm text-muted-foreground">

          Gemini is checking your skills,
          projects, experience and ATS compatibility.

        </p>

      </Card>

    );

  }

  // =========================
  // ERROR
  // =========================

  if (error) {

    return (

      <Card className="mt-6 p-6">

        <h3 className="font-semibold text-red-600">

          ❌ Analysis Failed

        </h3>

        <p className="mt-2 text-sm">

          {error}

        </p>

      </Card>

    );

  }

  if (!analysis) {
    return null;
  }

  // =========================
  // RESULT
  // =========================

  return (

    <div className="mt-6 space-y-4">

      {/* SCORE */}

      <Card className="p-5">

        <h3 className="text-lg font-bold">

          📊 AI Resume Score

        </h3>

        <div className="mt-4">

          <Progress
            value={analysis.score}
          />

        </div>

        <p className="mt-3 text-2xl font-bold text-primary">

          {analysis.score}%

        </p>

        <p className="text-sm text-muted-foreground">

          AI-generated score for{" "}
          <strong>{role}</strong>

        </p>

        <p className="mt-4 text-sm">

          {analysis.summary}

        </p>

      </Card>


      {/* SCORE BREAKDOWN */}

      <Card className="p-5">

        <h3 className="font-semibold">

          📈 ATS Score Breakdown

        </h3>

        <div className="mt-4 space-y-4">

          <ScoreBar
            label="Skills"
            value={analysis.skillsScore}
          />

          <ScoreBar
            label="Projects"
            value={analysis.projectsScore}
          />

          <ScoreBar
            label="Education"
            value={analysis.educationScore}
          />

          <ScoreBar
            label="Experience"
            value={analysis.experienceScore}
          />

          <ScoreBar
            label="Formatting"
            value={analysis.formattingScore}
          />

        </div>

      </Card>


      {/* STRENGTHS */}

      <Card className="p-5">

        <h3 className="font-semibold">

          ✅ Strengths

        </h3>

        <ul className="mt-3 space-y-2">

          {analysis.strengths.map(
            (item, index) => (

              <li key={index}>

                ✔ {item}

              </li>

            )
          )}

        </ul>

      </Card>


      {/* IMPROVEMENTS */}

      <Card className="p-5">

        <h3 className="font-semibold">

          ⚠️ Needs Improvement

        </h3>

        <ul className="mt-3 space-y-2">

          {analysis.improvements.map(
            (item, index) => (

              <li key={index}>

                • {item}

              </li>

            )
          )}

        </ul>

      </Card>


      {/* RECOMMENDATIONS */}

      <Card className="p-5">

        <h3 className="font-semibold">

          💡 AI Skill Recommendations

        </h3>

        <p className="mt-2 text-sm text-muted-foreground">

          Skills Gemini recommends for your
          selected career role:

        </p>

        <div className="mt-4 flex flex-wrap gap-2">

          {analysis.recommendations.map(
            (skill, index) => (

              <Badge key={index}>

                {skill}

              </Badge>

            )
          )}

        </div>

      </Card>

    </div>

  );
}


// =========================
// SCORE BAR
// =========================

function ScoreBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {

  return (

    <div>

      <div className="flex justify-between text-sm">

        <span>{label}</span>

        <span>{value}%</span>

      </div>

      <Progress
        value={value}
        className="mt-1"
      />

    </div>

  );

}