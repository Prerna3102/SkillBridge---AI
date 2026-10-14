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

import SkillsSelector from "./SkillSelector";
import RoadmapResult from "./RoadmapResults";

export default function CareerForm() {
  const [selectedRole, setSelectedRole] = useState("data-analyst");

  const [level, setLevel] = useState("");
  const [hours, setHours] = useState("");

  const [skills, setSkills] = useState<string[]>([]);

  const [roadmap, setRoadmap] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const generateRoadmap = async () => {

    if (!level) {
      alert("Please select your experience level.");
      return;
    }

    if (!hours) {
      alert("Please select your daily study hours.");
      return;
    }

    setLoading(true);
    setRoadmap(null);

    try {

      const response = await fetch(
        "http://127.0.0.1:5000/roadmap",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            role: selectedRole,
            level: level,
            hours: hours,
            skills: skills,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Backend error");
      }

      const data = await response.json();

      if (data.success) {

        setRoadmap(data.roadmap);

      } else {

        alert(data.message || "Unable to generate roadmap.");
      }

    } catch (error) {

      console.error(error);

      alert(
        "Unable to connect with backend. Make sure Flask is running."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <Card className="p-6">

      <h2 className="text-2xl font-bold">
        ✨ AI Career Roadmap
      </h2>

      <p className="mt-2 text-muted-foreground">
        Tell us about your career goal and we'll generate a
        personalized learning roadmap.
      </p>


      {/* ROLE */}

      <div className="mt-6 space-y-2">

        <label className="text-sm font-medium">
          Target Career Role
        </label>

        <Select
          value={selectedRole}
          onValueChange={setSelectedRole}
        >

          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>

            <SelectItem value="data-analyst">
              Data Analyst
            </SelectItem>

            <SelectItem value="full-stack">
              Full Stack Developer
            </SelectItem>

            <SelectItem value="java">
              Java Developer
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


      {/* EXPERIENCE */}

      <div className="mt-4 space-y-2">

        <label className="text-sm font-medium">
          Experience Level
        </label>

        <Select
          value={level}
          onValueChange={setLevel}
        >

          <SelectTrigger>
            <SelectValue placeholder="Select your level" />
          </SelectTrigger>

          <SelectContent>

            <SelectItem value="beginner">
              Beginner
            </SelectItem>

            <SelectItem value="intermediate">
              Intermediate
            </SelectItem>

            <SelectItem value="advanced">
              Advanced
            </SelectItem>

          </SelectContent>

        </Select>

      </div>


      {/* STUDY HOURS */}

      <div className="mt-4 space-y-2">

        <label className="text-sm font-medium">
          Daily Study Hours
        </label>

        <Select
          value={hours}
          onValueChange={setHours}
        >

          <SelectTrigger>
            <SelectValue placeholder="Select study hours" />
          </SelectTrigger>

          <SelectContent>

            <SelectItem value="1">
              1 Hour
            </SelectItem>

            <SelectItem value="2">
              2 Hours
            </SelectItem>

            <SelectItem value="3">
              3 Hours
            </SelectItem>

            <SelectItem value="4+">
              4+ Hours
            </SelectItem>

          </SelectContent>

        </Select>

      </div>


      {/* SKILLS */}

      <div className="mt-4">

        <SkillsSelector
          selectedSkills={skills}
          onChange={setSkills}
        />

      </div>


      {/* GENERATE */}

      <div className="mt-6">

        <Button
          className="w-full"
          onClick={generateRoadmap}
          disabled={loading}
        >

          {loading
            ? "✨ AI is analyzing your profile..."
            : "✨ Generate AI Career Roadmap"}

        </Button>

      </div>


      {/* RESULT */}

      {roadmap && (
        <RoadmapResult roadmap={roadmap} />
      )}

    </Card>
  );
}