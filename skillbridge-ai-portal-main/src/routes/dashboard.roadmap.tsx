import { createFileRoute } from "@tanstack/react-router";
import CareerForm from "@/components/roadmap/CareerForm";

export const Route = createFileRoute("/dashboard/roadmap")({
  component: CareerForm,
});