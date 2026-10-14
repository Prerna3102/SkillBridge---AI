import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
};

export default function ProjectDetails({ title }: Props) {
  return (
    <Card className="mt-6 p-6 space-y-5">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground mt-2">
          This project is highly recommended for placement preparation and will
          strengthen your resume.
        </p>
      </div>

      <div>
        <h3 className="font-semibold">🛠 Tech Stack</h3>

        <div className="mt-2 flex flex-wrap gap-2">
          <Badge>React</Badge>
          <Badge>TypeScript</Badge>
          <Badge>Tailwind CSS</Badge>
          <Badge>Node.js</Badge>
        </div>
      </div>

      <div>
        <h3 className="font-semibold">📅 Development Plan</h3>

        <ul className="mt-2 space-y-2 list-disc ml-5">
          <li>Day 1 - UI Design</li>
          <li>Day 2 - Backend Setup</li>
          <li>Day 3 - Database</li>
          <li>Day 4 - Features</li>
          <li>Day 5 - Testing</li>
          <li>Day 6 - Deployment</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold">⭐ Resume Impact</h3>

        <p className="mt-2">
          This project can significantly improve your placement portfolio and
          demonstrate practical development skills.
        </p>
      </div>

      <Button className="w-full">
        🚀 Start Building
      </Button>
    </Card>
  );
}