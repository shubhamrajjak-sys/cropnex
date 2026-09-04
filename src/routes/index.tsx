import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Eye,
  GraduationCap,
  Leaf,
  Map,
  Radar,
  Satellite,
  ScanLine,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import heroImage from "@/assets/hero-fields.jpg";
import { Button } from "@/components/ui/button";
import { Disclaimer, FlowDiagram } from "@/components/ui-kit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KrishiRakshak AI — Detect Early. Predict Risk. Act Smart." },
      {
        name: "description",
        content:
          "AI crop-health early warning platform combining crop images, weather, IoT pest traps, satellite intelligence and expert validation for Indian farmers.",
      },
      { property: "og:title", content: "KrishiRakshak AI" },
      {
        property: "og:description",
        content: "SEE + PREDICT + MAP + VERIFY + LEARN — an end-to-end crop-health early warning system.",
      },
    ],
  }),
  component: Landing,
});

const LAYERS = [
  { key: "SEE", icon: Eye, text: "Crop image analysis detects symptoms early from a single photo." },
  { key: "PREDICT", icon: BrainCircuit, text: "Weather, soil, stage and pest signals fuse into a 5-day risk forecast." },
  { key: "MAP", icon: Map, text: "Village-level hotspots reveal outbreaks before they spread." },
  { key: "VERIFY", icon: ShieldCheck, text: "Experts and laboratories confirm every high-stakes case." },
  { key: "LEARN", icon: GraduationCap, text: "Confirmed field data continuously improves the models." },
];

const FEATURES = [
  { icon: ScanLine, title: "Crop Health Scanner", text: "Upload, drag-drop or capture a leaf image and get an explainable AI suspicion in seconds." },
  { icon: Radar, title: "IoT Pest Traps", text: "Connected traps stream species counts and trends straight into the risk engine." },
  { icon: Satellite, title: "Satellite + Ground Fusion", text: "Cloud cover never blinds the platform — ground, weather and IoT intelligence take over." },
  { icon: Bot, title: "Multilingual Assistant", text: "Ask in Hindi, Marathi, Bengali, Tamil, Telugu or English with voice and image support." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Leaf className="size-5" />
            </span>
            <span>
              <span className="block text-sm font-bold">KrishiRakshak AI</span>
              <span className="block text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                SIH PS 26131
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link to="/architecture">AI Architecture</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/login">Sign in</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <img
          src={heroImage}
          alt="Aerial view of green Indian farmland at sunrise"
          width={1600}
          height={1000}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/92 to-background/40" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5" /> Crop-health early warning & decision support
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.05] sm:text-6xl">
            KRISHIRAKSHAK <span className="text-primary">AI</span>
          </h1>
          <p className="mt-3 text-lg font-semibold text-foreground/80 sm:text-2xl">
            Detect Early. Predict Risk. Act Smart.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            An AI-powered crop-health early warning and decision-support platform combining crop images, weather, IoT,
            satellite intelligence and expert validation.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/scanner">
                <ScanLine className="size-4" /> Scan Your Crop
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/dashboard">
                Explore Dashboard <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ["12,540", "Farms monitored"],
              ["93%", "Verified AI accuracy"],
              ["36", "Villages covered"],
              ["11 h", "Avg response time"],
            ].map(([v, l]) => (
              <div key={l} className="surface p-3">
                <dt className="text-xl font-bold text-primary">{v}</dt>
                <dd className="text-xs text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold sm:text-3xl">Five layers of intelligence</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          KrishiRakshak AI does not merely detect crop disease. It combines SEE + PREDICT + MAP + VERIFY + LEARN into an
          end-to-end early warning system.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {LAYERS.map(({ key, icon: Icon, text }, i) => (
            <div key={key} className="surface p-5 transition-transform duration-200 hover:-translate-y-1">
              <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <p className="mt-4 text-xs font-semibold text-muted-foreground">0{i + 1}</p>
              <h3 className="text-lg font-bold">{key}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">How it works</h2>
          <div className="mt-6 surface p-6">
            <FlowDiagram steps={["Farmer", "AI", "Risk Engine", "Expert", "Action", "Monitoring"]} />
            <p className="mt-5 text-sm text-muted-foreground">
              A farmer submits a crop photo. The AI analyses symptoms, the risk engine fuses weather, soil, pest and
              location signals, an expert validates the case, an IPM advisory is issued, and follow-up scans confirm
              whether risk actually fell.
            </p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="surface p-5">
                <Icon className="size-5 text-primary" />
                <h3 className="mt-3 text-sm font-bold">{title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="surface flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Explore the full demo</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Four role-based workspaces with realistic sample data for tomato, wheat, rice and cotton — no external
              APIs required.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/login">Choose a role</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/official">Official dashboard</Link>
            </Button>
          </div>
        </div>
        <Disclaimer className="mt-6" />
      </section>

      <footer className="border-t border-border px-4 py-8 text-center text-xs text-muted-foreground sm:px-6">
        KrishiRakshak AI · Smart India Hackathon Problem Statement 26131 · Demo build with simulated data
      </footer>
    </div>
  );
}
