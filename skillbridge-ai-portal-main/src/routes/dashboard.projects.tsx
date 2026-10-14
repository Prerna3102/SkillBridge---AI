import { createFileRoute } from "@tanstack/react-router";
import ProjectRecommendation from "../components/Projects/ProjectRecommendation";

export const Route = createFileRoute("/dashboard/projects")({
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <ProjectRecommendation />
    </div>
  );
}