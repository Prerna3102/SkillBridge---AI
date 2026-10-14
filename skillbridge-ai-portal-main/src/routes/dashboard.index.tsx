import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  ArrowUpRight,
  Sparkles,
  Rocket,
  CheckCircle2,
  Circle,
  TrendingUp,
  Code2,
  Database,
  Palette,
  Brain,
  GitBranch,
  Trophy,
  Target,
  Zap,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

// ---------------- SKILLS ----------------

const skills = [
  { name: "Data Structures", progress: 82, icon: Code2 },
  { name: "System Design", progress: 45, icon: GitBranch },
  { name: "Databases (SQL)", progress: 68, icon: Database },
  { name: "UI / UX Basics", progress: 55, icon: Palette },
];

// ---------------- GOALS ----------------

const goals = [
  { id: 1, text: "Solve 3 DSA problems on arrays", done: true },
  { id: 2, text: "Complete System Design chapter 2", done: true },
  { id: 3, text: "Practice 1 mock interview", done: false },
  { id: 4, text: "Update resume with new project", done: false },
];

// ---------------- PROJECTS ----------------

const projects = [
  {
    title: "Real-time Chat App",
    tag: "Full Stack",
    difficulty: "Intermediate",
    time: "2 weeks",
  },
  {
    title: "AI Resume Analyzer",
    tag: "AI / ML",
    difficulty: "Advanced",
    time: "3 weeks",
  },
  {
    title: "E-commerce Dashboard",
    tag: "Frontend",
    difficulty: "Beginner",
    time: "1 week",
  },
];

// ---------------- WEEKLY PROGRESS ----------------

const weekly = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 3.2 },
  { day: "Wed", hours: 1.8 },
  { day: "Thu", hours: 4.1 },
  { day: "Fri", hours: 3.5 },
  { day: "Sat", hours: 5.2 },
  { day: "Sun", hours: 4.6 },
];

// ---------------- ACTIVITY ----------------

const activity = [
  {
    icon: Trophy,
    text: "Completed 'Binary Trees' course",
    time: "2h ago",
    color: "text-amber-500",
  },
  {
    icon: Brain,
    text: "Finished mock interview — scored 8/10",
    time: "5h ago",
    color: "text-primary",
  },
  {
    icon: Rocket,
    text: "Started project: Real-time Chat App",
    time: "1d ago",
    color: "text-purple-500",
  },
  {
    icon: CheckCircle2,
    text: "Solved 5 DSA problems",
    time: "2d ago",
    color: "text-emerald-500",
  },
];

// ---------------- DASHBOARD ----------------

function DashboardHome() {
  // Logged-in user
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("currentUser") || "null")
      : null;

  const userName = user?.name || "Student";

  // Today's Goals state
  const [goalList, setGoalList] = useState(goals);

  return (
    <div className="mx-auto max-w-7xl space-y-6">

      {/* ================= WELCOME ================= */}

      <Card className="relative overflow-hidden border-0 bg-gradient-hero p-6 text-primary-foreground shadow-elegant sm:p-8">

        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">

          <div className="min-w-0">

            <Badge className="mb-3 rounded-full border-0 bg-white/20 text-primary-foreground hover:bg-white/30">
              <Sparkles className="mr-1 h-3 w-3" />
              Welcome back
            </Badge>

            <h1 className="truncate text-2xl font-bold sm:text-3xl">
              Hi {userName} 👋
            </h1>

            <p className="mt-1 text-sm text-primary-foreground/90 sm:text-base">
              You're on a 7-day streak. Keep the momentum going!
            </p>

          </div>

          <Button className="shrink-0 bg-white text-primary hover:bg-white/90">
            <Zap className="mr-2 h-4 w-4" />
            Resume prep
          </Button>

        </div>
      </Card>

      {/* ================= READINESS + WEEKLY ================= */}

      <div className="grid gap-6 lg:grid-cols-3">

        {/* Placement Readiness */}

        <Card className="border-border/60 bg-gradient-card p-6 shadow-card-soft lg:col-span-1">

          <div className="flex items-center justify-between">

            <div>

              <div className="text-sm text-muted-foreground">
                Placement Readiness
              </div>

              <div className="mt-1 text-3xl font-bold">
                72
                <span className="text-lg text-muted-foreground">
                  /100
                </span>
              </div>

            </div>

            <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
              <Target className="h-6 w-6" />
            </div>

          </div>

          <Progress value={72} className="mt-4 h-3" />

          <div className="mt-3 flex items-center gap-1 text-xs text-emerald-600">
            <TrendingUp className="h-3 w-3" />
            +8 this week
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center">

            {[
              { l: "Skills", v: 82 },
              { l: "Projects", v: 65 },
              { l: "Mock", v: 70 },
            ].map((s) => (

              <div
                key={s.l}
                className="rounded-lg bg-muted/50 p-2"
              >
                <div className="text-sm font-bold text-foreground">
                  {s.v}%
                </div>

                <div className="text-[10px] text-muted-foreground">
                  {s.l}
                </div>
              </div>

            ))}

          </div>

        </Card>

        {/* Weekly Progress */}

        <Card className="border-border/60 p-6 shadow-card-soft lg:col-span-2">

          <div className="flex items-center justify-between">

            <div>
              <h3 className="font-semibold">
                Weekly Progress
              </h3>

              <p className="text-xs text-muted-foreground">
                Study hours this week
              </p>
            </div>

            <Badge variant="secondary" className="rounded-full">
              24.9 hrs
            </Badge>

          </div>

          <div className="mt-4 h-56 w-full">

            <ResponsiveContainer width="100%" height="100%">

              <AreaChart
                data={weekly}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 0,
                }}
              >

                <defs>

                  <linearGradient
                    id="grad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="0%"
                      stopColor="var(--primary)"
                      stopOpacity={0.4}
                    />

                    <stop
                      offset="100%"
                      stopColor="var(--primary)"
                      stopOpacity={0}
                    />

                  </linearGradient>

                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  vertical={false}
                />

                <XAxis
                  dataKey="day"
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="var(--primary)"
                  strokeWidth={2.5}
                  fill="url(#grad)"
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </Card>

      </div>

      {/* ================= SKILLS ================= */}

      <Card className="border-border/60 p-6 shadow-card-soft">

        <div className="mb-4 flex items-center justify-between">

          <h3 className="font-semibold">
            Skills Progress
          </h3>

          <Button
            variant="ghost"
            size="sm"
            className="text-primary"
          >
            View all
            <ArrowUpRight className="ml-1 h-3 w-3" />
          </Button>

        </div>

        <div className="grid gap-4 sm:grid-cols-2">

          {skills.map((s) => (

            <div
              key={s.name}
              className="rounded-xl border border-border/60 bg-gradient-card p-4"
            >

              <div className="flex items-center gap-3">

                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <s.icon className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">

                  <div className="flex items-center justify-between">

                    <div className="truncate text-sm font-semibold">
                      {s.name}
                    </div>

                    <div className="text-xs font-semibold text-primary">
                      {s.progress}%
                    </div>

                  </div>

                  <Progress
                    value={s.progress}
                    className="mt-2 h-2"
                  />

                </div>

              </div>

            </div>

          ))}

        </div>

      </Card>

      {/* ================= GOALS + ACTIVITY ================= */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Today's Goals */}

        <Card className="border-border/60 p-6 shadow-card-soft">

          <div className="mb-4 flex items-center justify-between">

            <div>

              <h3 className="font-semibold">
                Today's Goals
              </h3>

              <p className="text-xs text-muted-foreground">
                {goalList.filter((g) => g.done).length}/
                {goalList.length} completed
              </p>

            </div>

            <Button
              size="sm"
              variant="outline"
            >
              Add goal
            </Button>

          </div>

          <div className="space-y-2">

            {goalList.map((g) => (

              <label
                key={g.id}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-border/60 p-3 transition-colors hover:bg-muted/40"
              >

                <Checkbox
                  checked={g.done}
                  onCheckedChange={(checked) => {

                    setGoalList((prev) =>
                      prev.map((goal) =>
                        goal.id === g.id
                          ? {
                              ...goal,
                              done: checked === true,
                            }
                          : goal
                      )
                    );

                  }}
                />

                <span
                  className={`flex-1 text-sm ${
                    g.done
                      ? "text-muted-foreground line-through"
                      : ""
                  }`}
                >
                  {g.text}
                </span>

                {g.done ? (

                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />

                ) : (

                  <Circle className="h-4 w-4 text-muted-foreground" />

                )}

              </label>

            ))}

          </div>

        </Card>

        {/* Recent Activity */}

        <Card className="border-border/60 p-6 shadow-card-soft">

          <h3 className="mb-4 font-semibold">
            Recent Activity
          </h3>

          <div className="space-y-4">

            {activity.map((a, i) => (

              <div
                key={i}
                className="flex items-start gap-3"
              >

                <div
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-muted ${a.color}`}
                >
                  <a.icon className="h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1">

                  <div className="text-sm">
                    {a.text}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {a.time}
                  </div>

                </div>

              </div>

            ))}

          </div>

        </Card>

      </div>

      {/* ================= RECOMMENDED PROJECTS ================= */}

      <Card className="border-border/60 p-6 shadow-card-soft">

        <div className="mb-4 flex items-center justify-between">

          <div>

            <h3 className="font-semibold">
              Recommended Projects
            </h3>

            <p className="text-xs text-muted-foreground">
              Handpicked to boost your placement score
            </p>

          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-primary"
          >
            Browse all
            <ArrowUpRight className="ml-1 h-3 w-3" />
          </Button>

        </div>

        <div className="grid gap-4 md:grid-cols-3">

          {projects.map((p) => (

            <div
              key={p.title}
              className="group cursor-pointer rounded-xl border border-border/60 bg-gradient-card p-5 transition-all hover:-translate-y-1 hover:shadow-elegant"
            >

              <div className="mb-3 flex items-center justify-between">

                <Badge
                  variant="secondary"
                  className="rounded-full"
                >
                  {p.tag}
                </Badge>

                <Rocket className="h-4 w-4 text-primary opacity-0 transition-opacity group-hover:opacity-100" />

              </div>

              <h4 className="font-semibold">
                {p.title}
              </h4>

              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">

                <span>{p.difficulty}</span>
                <span>{p.time}</span>

              </div>

            </div>

          ))}

        </div>

      </Card>

    </div>
  );
}