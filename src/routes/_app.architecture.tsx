import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Bot, Brain, Cpu, Database, Eye, Map, Radar, Satellite } from "lucide-react";
import { Disclaimer, FlowDiagram, PageHeader, SectionCard } from "@/components/ui-kit";

export const Route = createFileRoute("/_app/architecture")({
  head: () => ({
    meta: [
      { title: "AI Architecture — CROPNEX" },
      { name: "description", content: "Computer vision, risk prediction, weather intelligence, GIS, IoT, LLM advisory and expert validation in one engine." },
      { property: "og:title", content: "AI Architecture — CROPNEX" },
      { property: "og:description", content: "Presentation-ready architecture for SIH judges." },
    ],
  }),
  component: Architecture,
});

const MODULES = [
  { icon: Eye, title: "Computer Vision Model", text: "CNN/ViT ensemble for leaf, stem and fruit symptom classification with per-class confidence and affected-area estimation." },
  { icon: Brain, title: "Risk Prediction Model", text: "Gradient-boosted temporal model fusing weather, stage, soil, pest and cluster history into 5-day risk curves." },
  { icon: Satellite, title: "Weather & Satellite Intelligence", text: "Forecast ingestion, leaf-wetness modelling and NDVI anomaly detection with cloud-cover fallback." },
  { icon: Map, title: "GIS Layer", text: "Geospatial clustering of anonymised reports into village-level hotspots with trend scoring." },
  { icon: Radar, title: "IoT Ingestion", text: "Trap cameras and sensors stream species counts through an edge detector into the risk engine." },
  { icon: Bot, title: "LLM Advisory", text: "Multilingual explanation and IPM guidance grounded in verified case data with strict safety constraints." },
  { icon: BadgeCheck, title: "Expert Validation", text: "Human-in-the-loop confirmation, correction, rejection and laboratory referral with feedback capture." },
];

const TABLES = [
  "users", "farms", "crops", "crop_scans", "disease_predictions", "weather_data", "soil_data",
  "pest_traps", "pest_observations", "outbreak_reports", "risk_predictions", "expert_reviews",
  "lab_referrals", "advisories", "followups", "notifications",
];

function Architecture() {
  return (
    <>
      <PageHeader
        eyebrow="Under the hood"
        title="AI Architecture"
        description="Seven modules feed one unified crop health intelligence engine."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MODULES.map(({ icon: Icon, title, text }) => (
          <SectionCard key={title} bodyClassName="p-5">
            <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-3 text-sm font-bold">{title}</h3>
            <p className="mt-1.5 text-xs text-muted-foreground">{text}</p>
          </SectionCard>
        ))}
        <SectionCard bodyClassName="p-5" className="border-primary/30 bg-primary/6">
          <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Cpu className="size-5" />
          </span>
          <h3 className="mt-3 text-sm font-bold text-primary">Unified Crop Health Intelligence Engine</h3>
          <p className="mt-1.5 text-xs text-foreground/75">
            All modules converge here. Outputs: disease risk, pest risk, yield risk, explainable reasons, IPM advisory
            and escalation routing.
          </p>
        </SectionCard>
      </div>

      <SectionCard title="End-to-end journey">
        <FlowDiagram
          steps={[
            "Farmer uploads crop image",
            "AI analyses symptoms",
            "Weather + crop + soil + pest + location",
            "AI risk engine",
            "Disease / pest risk score",
            "Explainable reasons",
            "Early warning",
            "IPM recommendation",
            "Expert validation",
            "Lab referral if needed",
            "Follow-up monitoring",
            "Confirmed field data",
            "AI learning",
            "Official hotspot dashboard",
          ]}
        />
      </SectionCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Data model" subtitle="Ready to map onto a managed Postgres backend">
          <div className="flex flex-wrap gap-2">
            {TABLES.map((t) => (
              <span key={t} className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium">
                <Database className="size-3.5 text-primary" />
                {t}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            The demo runs on a single typed data module. Each collection maps one-to-one onto these tables, so
            connecting a real backend only changes the fetch layer.
          </p>
        </SectionCard>

        <SectionCard title="Why this is not just disease detection">
          <ul className="space-y-3 text-sm">
            {[
              ["SEE", "Image-based symptom detection with confidence and affected area."],
              ["PREDICT", "Forward-looking 5-day risk, not just what is already visible."],
              ["MAP", "Village-level clustering turns individual cases into outbreak intelligence."],
              ["VERIFY", "Expert and laboratory confirmation before any high-stakes action."],
              ["LEARN", "Verified outcomes flow back into the model every cycle."],
            ].map(([k, v]) => (
              <li key={k} className="flex gap-3">
                <span className="w-16 shrink-0 text-xs font-bold text-primary">{k}</span>
                <span className="text-foreground/85">{v}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <Disclaimer />
    </>
  );
}
