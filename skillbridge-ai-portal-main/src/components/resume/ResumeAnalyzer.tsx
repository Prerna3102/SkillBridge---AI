import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ResumeResult from "./ResumeResult";

import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function ResumeAnalyzer() {
  const [selectedRole, setSelectedRole] = useState("data-analyst");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [showResult, setShowResult] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // PDF TEXT EXTRACTION
  // =========================

  const extractPdfText = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer,
    }).promise;

    let text = "";

    for (
      let pageNumber = 1;
      pageNumber <= pdf.numPages;
      pageNumber++
    ) {
      const page = await pdf.getPage(pageNumber);

      const content = await page.getTextContent();

      const pageText = content.items
        .map((item: any) => item.str)
        .join(" ");

      text += pageText + "\n";
    }

    return text;
  };

  // =========================
  // DOCX TEXT EXTRACTION
  // =========================

  const extractDocxText = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();

    const result = await mammoth.extractRawText({
      arrayBuffer,
    });

    return result.value;
  };

  // =========================
  // ANALYZE RESUME
  // =========================

  const handleAnalyze = async () => {
    if (!selectedFile) {
      return;
    }

    setLoading(true);
    setError("");
    setShowResult(false);

    try {
      let extractedText = "";

      if (
        selectedFile.name
          .toLowerCase()
          .endsWith(".pdf")
      ) {
        extractedText = await extractPdfText(
          selectedFile
        );
      } else if (
        selectedFile.name
          .toLowerCase()
          .endsWith(".docx")
      ) {
        extractedText = await extractDocxText(
          selectedFile
        );
      } else {
        throw new Error(
          "Please upload a PDF or DOCX resume."
        );
      }

      if (!extractedText.trim()) {
        throw new Error(
          "Could not extract text from this resume."
        );
      }

      console.log(
        "Extracted Resume Text:",
        extractedText
      );

      setResumeText(extractedText);

      // =========================
      // SEND TO GEMINI BACKEND
      // =========================

      const response = await fetch(
        "http://127.0.0.1:5000/resume-analyze",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            role: selectedRole,
            resumeText: extractedText,
          }),
        }
      );

      const data = await response.json();

      console.log(
        "AI Resume Analysis:",
        data
      );

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "AI resume analysis failed."
        );
      }

      setShowResult(true);
    } catch (error) {
      console.error(
        "Resume analysis error:",
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

  return (
    <>
      <Card className="p-6">

        <h2 className="text-2xl font-bold">
          📄 Resume Analyzer
        </h2>

        <p className="mt-2 text-muted-foreground">
          Upload your resume and get AI-powered
          suggestions to improve your placement chances.
        </p>

        {/* ROLE */}

        <div className="mt-6 space-y-2">

          <label className="text-sm font-medium">
            Target Career Role
          </label>

          <Select
            value={selectedRole}
            onValueChange={(value) => {
              setSelectedRole(value);
              setShowResult(false);
            }}
          >

            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>

              <SelectItem value="data-analyst">
                Data Analyst
              </SelectItem>

              <SelectItem value="java">
                Java Developer
              </SelectItem>

              <SelectItem value="full-stack">
                Full Stack Developer
              </SelectItem>

              <SelectItem value="aiml">
                AI / ML Engineer
              </SelectItem>

              <SelectItem value="cloud">
                Cloud Engineer
              </SelectItem>

            </SelectContent>

          </Select>

        </div>

        {/* FILE */}

        <div className="mt-6">

          <input
            type="file"
            accept=".pdf,.docx"
            className="w-full rounded-lg border p-3"
            onChange={(e) => {

              const file =
                e.target.files?.[0];

              if (file) {

                setSelectedFile(file);
                setResumeText("");
                setShowResult(false);
                setError("");

              }

            }}
          />

        </div>

        {/* SELECTED FILE */}

        {selectedFile && (

          <p className="mt-3 text-sm text-green-600">

            📄 Selected File:{" "}
            {selectedFile.name}

          </p>

        )}

        {/* ERROR */}

        {error && (

          <p className="mt-3 rounded-lg bg-red-100 p-3 text-sm text-red-600">

            ❌ {error}

          </p>

        )}

        {/* ANALYZE BUTTON */}

        <div className="mt-6">

          <Button
            className="w-full"
            disabled={!selectedFile || loading}
            onClick={handleAnalyze}
          >

            {loading
              ? "🤖 AI is analyzing your resume..."
              : "Analyze Resume"}

          </Button>

        </div>

      </Card>

      {/* RESULT */}

      {showResult && resumeText && (

        <ResumeResult
          role={selectedRole}
          resumeText={resumeText}
        />

      )}

    </>
  );
}