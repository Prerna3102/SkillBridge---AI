import { createFileRoute } from "@tanstack/react-router";
import InterviewForm from "../components/interview/InterviewForm";
export const Route = createFileRoute("/dashboard/interview")({
  component: InterviewPage,
});

function InterviewPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <InterviewForm />
    </div>
  );
}