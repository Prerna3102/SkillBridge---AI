import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export function PlaceholderPage({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mx-auto max-w-4xl">
      <Card className="border-border/60 bg-gradient-card p-10 text-center shadow-card-soft">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-hero shadow-elegant">
          <Sparkles className="h-6 w-6 text-primary-foreground" />
        </div>
        <h1 className="mt-6 text-2xl font-bold">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
        <p className="mt-6 text-xs text-muted-foreground">Coming soon — this section is under construction.</p>
      </Card>
    </div>
  );
}
