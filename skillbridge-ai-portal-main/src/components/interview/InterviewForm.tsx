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

import InterviewResult from "./InterviewResults";

export default function InterviewForm() {
  const [role, setRole] = useState("data-analyst");

  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const generateInterview = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: role,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setQuestions(data.questions);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Unable to connect with backend.");
    }

    setLoading(false);
  };

  return (
    <>
      <Card className="p-6">

        <h2 className="text-2xl font-bold">
          🎤 AI Mock Interview
        </h2>

        <p className="mt-2 text-muted-foreground">
          Practice a personalized AI-generated interview.
        </p>

        <div className="mt-6 space-y-2">

          <label className="text-sm font-medium">
            Target Role
          </label>

          <Select
            value={role}
            onValueChange={setRole}
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

        <Button
          className="w-full mt-6"
          onClick={generateInterview}
          disabled={loading}
        >
          {loading
            ? "🤖 AI is preparing your interview..."
            : "🎯 Generate AI Interview"}
        </Button>

      </Card>

      {questions.length > 0 && (
        <InterviewResult
          role={role}
          questions={questions}
        />
      )}
    </>
  );
}