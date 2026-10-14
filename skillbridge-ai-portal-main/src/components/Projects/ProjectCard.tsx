import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ProjectCardProps = {
  title: string;
  difficulty: string;
  duration: string;
  skills: string[];
  onStart: () => void;
};

export default function ProjectCard({
  title,
  difficulty,
  duration,
  skills,
  onStart,
}: ProjectCardProps) {
  return (
    <Card className="p-5 space-y-4">
      <div>
        <h3 className="text-xl font-bold">{title}</h3>

        <div className="mt-2 flex gap-2 flex-wrap">
          <Badge>{difficulty}</Badge>
          <Badge variant="secondary">{duration}</Badge>
        </div>
      </div>

      <div>
        <p className="font-medium mb-2">Skills Required</p>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="outline">
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      <Button className="w-full mt-5" onClick={onStart}>
  🚀 Start Project
</Button>
    </Card>
  );
}