import { createFileRoute } from "@tanstack/react-router";
import ResumeAnalyzer from "@/components/resume/ResumeAnalyzer";

export const Route = createFileRoute("/dashboard/resume")({
  component: ResumePage,
});

function ResumePage() {
  return (
    <div className="mx-auto max-w-4xl">
      <ResumeAnalyzer />
    </div>
  );
}