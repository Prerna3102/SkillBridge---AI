import { createFileRoute } from "@tanstack/react-router";
import CareerAssistant from "../components/ai/CareerAssistant";

export const Route = createFileRoute("/dashboard/ai")({
  component: AI,
});

function AI() {
  return (
    <div className="mx-auto max-w-6xl">
      <CareerAssistant />
    </div>
  );
}