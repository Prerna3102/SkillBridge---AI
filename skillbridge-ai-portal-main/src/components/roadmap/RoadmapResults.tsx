import { Card } from "@/components/ui/card";

type Props = {
  roadmap: any;
};

export default function RoadmapResult({ roadmap }: Props) {

  const months = roadmap?.roadmap || [];

  return (
    <div className="mt-8">

      {/* HEADER */}

      <Card className="mb-5 p-5">

        <h2 className="text-xl font-bold">
          🤖 Your AI Career Roadmap
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Personalized for your selected role, experience level,
          study time and current skills.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">

          <div className="rounded-lg bg-muted/50 p-3">

            <p className="text-xs text-muted-foreground">
              Target Role
            </p>

            <p className="mt-1 font-medium">
              {roadmap.target_role}
            </p>

          </div>


          <div className="rounded-lg bg-muted/50 p-3">

            <p className="text-xs text-muted-foreground">
              Experience
            </p>

            <p className="mt-1 font-medium">
              {roadmap.experience_level}
            </p>

          </div>


          <div className="rounded-lg bg-muted/50 p-3">

            <p className="text-xs text-muted-foreground">
              Daily Study
            </p>

            <p className="mt-1 font-medium">
              {roadmap.daily_hours} Hours
            </p>

          </div>

        </div>

        {roadmap.recommended_duration && (

          <div className="mt-4">

            <p className="text-sm">
              ⏱️ <strong>Recommended Duration:</strong>{" "}
              {roadmap.recommended_duration}
            </p>

          </div>

        )}

      </Card>


      {/* PERSONALIZATION */}

      {roadmap.personalized_for && (

        <Card className="mb-5 p-5">

          <h3 className="font-semibold">
            🧠 Why this roadmap?
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            {roadmap.personalized_for}
          </p>

        </Card>

      )}


      {/* MONTHS */}

      <div className="space-y-4">

        {months.map(
          (month: any, index: number) => (

            <Card
              key={index}
              className="p-5"
            >

              <h3 className="text-lg font-semibold">
                📅 {month.month}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                {month.focus}
              </p>

              <div className="mt-4 space-y-2">

                {month.tasks?.map(
                  (task: string, taskIndex: number) => (

                    <div
                      key={taskIndex}
                      className="rounded-lg bg-muted/50 p-3 text-sm"
                    >
                      ✅ {task}
                    </div>

                  )
                )}

              </div>

            </Card>

          )
        )}

      </div>


      {/* PROJECTS */}

      {roadmap.projects?.length > 0 && (

        <Card className="mt-5 p-5">

          <h3 className="text-lg font-semibold">
            🚀 Recommended Projects
          </h3>

          <div className="mt-3 space-y-2">

            {roadmap.projects.map(
              (project: string, index: number) => (

                <div
                  key={index}
                  className="rounded-lg bg-muted/50 p-3 text-sm"
                >
                  💡 {project}
                </div>

              )
            )}

          </div>

        </Card>

      )}


      {/* INTERVIEW */}

      {roadmap.interview?.length > 0 && (

        <Card className="mt-5 p-5">

          <h3 className="text-lg font-semibold">
            🎯 Interview Preparation
          </h3>

          <div className="mt-3 space-y-2">

            {roadmap.interview.map(
              (item: string, index: number) => (

                <div
                  key={index}
                  className="rounded-lg bg-muted/50 p-3 text-sm"
                >
                  🎤 {item}
                </div>

              )
            )}

          </div>

        </Card>

      )}


      {/* AI ADVICE */}

      {roadmap.advice?.length > 0 && (

        <Card className="mt-5 p-5">

          <h3 className="text-lg font-semibold">
            ✨ Final AI Advice
          </h3>

          <div className="mt-3 space-y-2">

            {roadmap.advice.map(
              (item: string, index: number) => (

                <div
                  key={index}
                  className="text-sm"
                >
                  💬 {item}
                </div>

              )
            )}

          </div>

        </Card>

      )}

    </div>
  );
}