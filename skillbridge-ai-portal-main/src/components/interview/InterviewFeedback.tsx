import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type Props = {
  feedback: {
    readiness: number;
    strengths: string[];
    improvements: string[];
    next_steps: string[];
  };
};

export default function InterviewFeedback({ feedback }: Props) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold">
        🎉 AI Interview Feedback
      </h2>

      <div className="mt-5 space-y-6">

        {/* Placement Readiness */}
        <div>
          <div className="flex justify-between">
            <span>Placement Readiness</span>

            <span className="font-semibold">
              {feedback.readiness}%
            </span>
          </div>

          <Progress
            value={feedback.readiness}
            className="mt-2"
          />
        </div>

        {/* Strengths */}
        <div>
          <h3 className="font-semibold">
            ✅ Strengths
          </h3>

          <ul className="mt-2 space-y-2">
            {feedback.strengths.map((item, index) => (
              <li key={index}>
                • {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Improvements */}
        <div>
          <h3 className="font-semibold">
            ⚠️ Needs Improvement
          </h3>

          <ul className="mt-2 space-y-2">
            {feedback.improvements.map((item, index) => (
              <li key={index}>
                • {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Next Steps */}
        <div>
          <h3 className="font-semibold">
            🚀 Next Steps
          </h3>

          <ul className="mt-2 space-y-2">
            {feedback.next_steps.map((item, index) => (
              <li key={index}>
                • {item}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </Card>
  );
}