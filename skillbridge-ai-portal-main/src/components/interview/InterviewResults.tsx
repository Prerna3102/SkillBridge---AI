import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  role: string;
  questions: any[];
};

export default function InterviewResult({
  role,
  questions,
}: Props) {

  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );

  const [feedback, setFeedback] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const updateAnswer = (
    index: number,
    value: string
  ) => {
    const newAnswers = [...answers];

    newAnswers[index] = value;

    setAnswers(newAnswers);
  };

  const submitInterview = async () => {

    setLoading(true);

    try {

      const response = await fetch(
        "http://127.0.0.1:5000/interview-feedback",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            role: role,
            answers: questions.map((item, index) => ({
              question: item.question,
              answer: answers[index],
            })),
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setFeedback(data.feedback);
      } else {
        alert(data.message);
      }

    } catch (error) {

      alert("Unable to connect with backend.");

    }

    setLoading(false);
  };

  return (
    <div className="mt-6 space-y-4">

      <h2 className="text-xl font-bold">
        🤖 AI Generated Interview
      </h2>

      {questions.map((item, index) => (

        <Card
          key={index}
          className="p-5"
        >

          <div className="flex justify-between">

            <h3 className="font-semibold">
              Question {index + 1}
            </h3>

            <span className="text-sm text-muted-foreground">
              {item.difficulty}
            </span>

          </div>

          <p className="mt-3">
            {item.question}
          </p>

          <textarea
            className="mt-4 w-full rounded-lg border p-3 min-h-[100px]"
            placeholder="Write your answer..."
            value={answers[index]}
            onChange={(e) =>
              updateAnswer(index, e.target.value)
            }
          />

        </Card>

      ))}

      <Button
        className="w-full"
        onClick={submitInterview}
        disabled={loading}
      >
        {loading
          ? "🤖 AI is evaluating your answers..."
          : "📊 Submit Interview"}
      </Button>

      {feedback && (
        <Card className="p-6 mt-6">

          <h2 className="text-xl font-bold">
            🎉 AI Interview Feedback
          </h2>

          <div className="mt-5">

            <h3 className="font-semibold">
              Placement Readiness
            </h3>

            <div className="mt-2 text-3xl font-bold">
              {feedback.readiness}%
            </div>

          </div>

          <div className="mt-6">

            <h3 className="font-semibold">
              ✅ Strengths
            </h3>

            <ul className="mt-2 space-y-2">
              {feedback.strengths.map(
                (item: string, index: number) => (
                  <li key={index}>
                    • {item}
                  </li>
                )
              )}
            </ul>

          </div>

          <div className="mt-6">

            <h3 className="font-semibold">
              ⚠ Needs Improvement
            </h3>

            <ul className="mt-2 space-y-2">
              {feedback.improvements.map(
                (item: string, index: number) => (
                  <li key={index}>
                    • {item}
                  </li>
                )
              )}
            </ul>

          </div>

          <div className="mt-6">

            <h3 className="font-semibold">
              💡 AI Advice
            </h3>

            <p className="mt-2 text-muted-foreground">
              {feedback.advice}
            </p>

          </div>

        </Card>
      )}

    </div>
  );
}