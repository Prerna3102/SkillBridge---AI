import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Target, TrendingUp, BookOpen, Brain, FileCheck, Rocket, Star } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkillBridge AI — Land Your Dream Placement" },
      { name: "description", content: "Track skills, build projects, ace interviews. The AI-powered placement prep platform for college students." },
      { property: "og:title", content: "SkillBridge AI — Land Your Dream Placement" },
      { property: "og:description", content: "AI-powered placement prep for students." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Target, title: "Career Roadmap", desc: "Personalized step-by-step path to your dream role." },
  { icon: TrendingUp, title: "Skill Tracking", desc: "Monitor your progress across in-demand technologies." },
  { icon: Rocket, title: "Project Ideas", desc: "Curated projects that stand out to recruiters." },
  { icon: Brain, title: "Interview Prep", desc: "Practice with AI-powered mock interviews." },
  { icon: FileCheck, title: "Resume Review", desc: "AI feedback to make your resume shine." },
  { icon: Sparkles, title: "Placement Score", desc: "Know exactly how ready you are, in real time." },
];

const testimonials = [
  { name: "Ananya S.", role: "CS Junior, IIT Delhi", quote: "SkillBridge helped me structure my prep. Landed 3 offers this season!" },
  { name: "Rohan M.", role: "ECE Senior, NIT Trichy", quote: "The AI mock interviews felt real. I walked into Google confident." },
  { name: "Priya K.", role: "IT Junior, VIT", quote: "The roadmap took the guesswork out. Everything just clicked." },
];

const faqs = [
  { q: "Is SkillBridge AI free for students?", a: "Yes, our core features are free forever. Premium tools are available for advanced prep." },
  { q: "Which roles does it support?", a: "Software Engineering, Data Science, Product, Design, and more career tracks." },
  { q: "How is the placement score calculated?", a: "We combine your skills, projects, mock interview scores, and resume quality into one number." },
  { q: "Do I need experience to start?", a: "Not at all. SkillBridge is built for beginners and helps you go from zero to placement-ready." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-soft">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center animate-fade-in-up">
            <Badge variant="secondary" className="mb-6 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-primary">
              <Sparkles className="mr-1 h-3 w-3" /> AI-powered placement prep
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
              Land your dream placement with{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">SkillBridge AI</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              Track your skills, build standout projects, and ace interviews — all in one platform built for college students.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="bg-gradient-hero shadow-elegant hover:opacity-90">
                <Link to="/signup">Start free <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/dashboard">View dashboard</Link>
              </Button>
            </div>
            <div className="mt-10 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div><span className="text-2xl font-bold text-foreground">50k+</span><div>Students</div></div>
              <div><span className="text-2xl font-bold text-foreground">92%</span><div>Placement rate</div></div>
              <div><span className="text-2xl font-bold text-foreground">4.9★</span><div>Rating</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Everything you need to get placed</h2>
            <p className="mt-4 text-muted-foreground">Six powerful tools working together to make you interview-ready.</p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title} className="group border-border/60 bg-gradient-card p-6 transition-all hover:-translate-y-1 hover:shadow-elegant">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-muted/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Loved by students everywhere</h2>
            <p className="mt-4 text-muted-foreground">Real stories from students who cracked their dream companies.</p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="border-border/60 bg-card p-6 shadow-card-soft">
                <div className="flex gap-1 text-primary">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-4 text-sm leading-relaxed">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-hero font-semibold text-primary-foreground">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Frequently asked questions</h2>
            <p className="mt-4 text-muted-foreground">Everything you need to know about SkillBridge AI.</p>
          </div>
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border/60">
                <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-hero p-10 text-center shadow-glow sm:p-16">
            <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl">Ready to bridge the gap?</h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/90">Join thousands of students turning skills into offers.</p>
            <Button asChild size="lg" className="mt-8 bg-background text-foreground hover:bg-background/90">
              <Link to="/signup"><BookOpen className="mr-2 h-4 w-4" /> Get started free</Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
