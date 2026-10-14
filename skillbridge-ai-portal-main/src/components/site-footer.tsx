import { GraduationCap } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-hero">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold">SkillBridge AI</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Bridging students to their dream careers.</p>
          </div>
          {[
            { title: "Product", links: ["Features", "Dashboard", "Roadmap", "Pricing"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
            { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold">{col.title}</h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="text-sm text-muted-foreground hover:text-foreground">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          © 2026 SkillBridge AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
