import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ProjectCard from "./ProjectCard";
import ProjectDetails from "./ProjectDetails";

export default function ProjectRecommendation() {
  const [role, setRole] = useState("data-analyst");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const projects: Record<
    string,
    {
      title: string;
      difficulty: string;
      duration: string;
      skills: string[];
    }[]
  > = {
    "data-analyst": [
      {
        title: "Netflix Data Analysis",
        difficulty: "Intermediate",
        duration: "7 Days",
        skills: ["Python", "SQL", "Pandas", "Power BI"],
      },
      {
        title: "Sales Dashboard",
        difficulty: "Beginner",
        duration: "5 Days",
        skills: ["Excel", "Power BI", "SQL"],
      },
      {
        title: "Customer Churn Prediction",
        difficulty: "Advanced",
        duration: "12 Days",
        skills: ["Python", "Machine Learning", "Pandas"],
      },
    ],

    java: [
      {
        title: "Library Management System",
        difficulty: "Beginner",
        duration: "6 Days",
        skills: ["Java", "MySQL"],
      },
      {
        title: "Bank Management System",
        difficulty: "Intermediate",
        duration: "10 Days",
        skills: ["Java", "JDBC", "MySQL"],
      },
      {
        title: "Student Portal",
        difficulty: "Advanced",
        duration: "14 Days",
        skills: ["Spring Boot", "MySQL"],
      },
    ],

    "full-stack": [
      {
        title: "E-Commerce Website",
        difficulty: "Intermediate",
        duration: "14 Days",
        skills: ["React", "Node.js", "MongoDB"],
      },
      {
        title: "Chat Application",
        difficulty: "Advanced",
        duration: "12 Days",
        skills: ["React", "Socket.io", "Node.js"],
      },
      {
        title: "Task Manager",
        difficulty: "Beginner",
        duration: "7 Days",
        skills: ["React", "Firebase"],
      },
    ],

    aiml: [
      {
        title: "AI Resume Analyzer",
        difficulty: "Intermediate",
        duration: "10 Days",
        skills: ["Python", "NLP", "Machine Learning"],
      },
      {
        title: "Crop Recommendation System",
        difficulty: "Advanced",
        duration: "15 Days",
        skills: ["Python", "TensorFlow", "Flask"],
      },
      {
        title: "Face Detection",
        difficulty: "Intermediate",
        duration: "8 Days",
        skills: ["OpenCV", "Python"],
      },
    ],

    cloud: [
      {
        title: "AWS File Storage",
        difficulty: "Intermediate",
        duration: "8 Days",
        skills: ["AWS", "S3", "IAM"],
      },
      {
        title: "Docker Deployment",
        difficulty: "Beginner",
        duration: "5 Days",
        skills: ["Docker", "Linux"],
      },
      {
        title: "Kubernetes Cluster",
        difficulty: "Advanced",
        duration: "15 Days",
        skills: ["Docker", "Kubernetes", "AWS"],
      },
    ],
  };

  const data = projects[role];

  return (
    <div className="space-y-6">
      <Select value={role} onValueChange={setRole}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="data-analyst">Data Analyst</SelectItem>
          <SelectItem value="java">Java Developer</SelectItem>
          <SelectItem value="full-stack">Full Stack Developer</SelectItem>
          <SelectItem value="aiml">AI / ML Engineer</SelectItem>
          <SelectItem value="cloud">Cloud Engineer</SelectItem>
        </SelectContent>
      </Select>

      <div className="grid gap-4">
        {data.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            difficulty={project.difficulty}
            duration={project.duration}
            skills={project.skills}
            onStart={() => setSelectedProject(project.title)}
          />
        ))}
      </div>

      {selectedProject && (
        <ProjectDetails title={selectedProject} />
      )}
    </div>
  );
}