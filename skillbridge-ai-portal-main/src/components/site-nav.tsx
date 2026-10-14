import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-hero shadow-elegant">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight">SkillBridge <span className="text-primary">AI</span></span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">Features</a>
          <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground">Testimonials</a>
          <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm"><Link to="/login">Log in</Link></Button>
          <Button asChild size="sm" className="bg-gradient-hero shadow-elegant hover:opacity-90"><Link to="/signup">Get started</Link></Button>
        </div>
      </div>
    </header>
  );
}
