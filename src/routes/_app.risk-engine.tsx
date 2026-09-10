import { createFileRoute } from "@tanstack/react-router";
import {
  Bug,
  CloudSun,
  Image,
  Layers,
  Leaf,
  MapPin,
  Mountain,
  Satellite,
  Sprout,
  History,
} from "lucide-react";
import { useState } from "react";
import { Disclaimer, PageHeader, ScoreBar, SectionCard } from "@/components/ui-kit";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/risk-engine")({
  head: () => ({
    meta: [
      { title: "AI Risk Engine — CROPNEX" },
      { name: "description", content: "How nine data sources fuse into disease, pest and yield risk with a recommended action." },
      { property: "og:title", content: "AI Risk Engine — CROPNEX" },
      { property: "og:description", content: "Multi-source fusion, not a single-image classifier." },
    ],
  }),
  component: RiskEngine,
});

const SOURCES = [
  { icon: Image, label: "Crop Image", weight: 22, detail: "Symptom pattern, lesion type, affected area from the latest scan." },
  { icon: CloudSun, label: "Weather", weight: 18, detail: "Humidity, rainfall, temperature and leaf wetness duration." },
  { icon: Sprout, label: "Crop Stage", weight: 12, detail: "Susceptibility varies sharply between vegetative and flowering." },
  { icon: Leaf, label: "Crop Variety", weight: 7, detail: "Known resistance profile of the sown variety." },
  { icon: Mountain, label: "Soil Condition", weight: 8, detail: "Moisture, drainage and organic matter influence pathogen load." },
  { icon: Bug, label: "Pest Trap", weight: 13, detail: "IoT trap counts and species mix from the last 7 days." },
  { icon: History, label: "Historical Disease", weight: 9, detail: "Past outbreaks on this farm and in the surrounding radius." },
  { icon: MapPin, label: "GPS Location", weight: 5, detail: "Proximity to active clusters and agro-climatic zone." },
  { icon: Satellite, label: "Satellite Vegetation", weight: 6, detail: "NDVI anomalies, skipped automatically under cloud cover." },
];

const OUTPUTS = [
  { label: "Disease Risk", value: 87, note: "Fungal infection likely within 3–5 days" },
  { label: "Pest Risk", value: 66, note: "Fruit borer pressure rising in west block" },
  { label: "Yield Risk", value: 41, note: "Recoverable if action is taken this week" },
];

function RiskEngine() {
  const [active, setActive] = useState(SOURCES[0]!);

  return (
    <>
      <PageHeader
        eyebrow="Engine"
        title="Multi-Source AI Risk Engine"
        description="Nine independent signals are weighted and fused. If any source is unavailable, weights redistribute automatically."
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_auto_1fr] lg:items-center">
        <SectionCard title="Data sources" subtitle="Tap a source to see its role" bodyClassName="p-4">
          <div className="grid gap-2 sm:grid-cols-2">
            {SOURCES.map((s) => (
              <button
                key={s.label}
                onClick={() => setActive(s)}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-3 text-left transition-all hover:-translate-y-0.5",
                  active.label === s.label ? "border-primary bg-primary/6" : "border-border",
                )}
              >
                <s.icon className="size-4 shrink-0 text-primary" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">{s.label}</span>
                  <span className="block text-xs text-muted-foreground">weight {s.weight}%</span>
                </span>
              </button>
            ))}
          </div>
        </SectionCard>

        <div className="flex flex-col items-center gap-3 py-2">
          <span className="text-2xl text-primary/70">↓</span>
          <div className="grid place-items-center rounded-2xl border border-primary/30 bg-primary/8 px-6 py-5 text-center">
            <Layers className="size-6 text-primary" />
            <p className="mt-2 text-sm font-bold text-primary">AI RISK ENGINE</p>
            <p className="text-[11px] text-muted-foreground">weighted fusion + temporal model</p>
          </div>
          <span className="text-2xl text-primary/70">↓</span>
        </div>

        <div className="space-y-4">
          {OUTPUTS.map((o) => (
            <SectionCard key={o.label} bodyClassName="p-4">
              <div className="flex items-baseline justify-between">
                <p className="text-sm font-semibold">{o.label}</p>
                <p className="text-xl font-bold tabular-nums">{o.value}%</p>
              </div>
              <div className="mt-2">
                <ScoreBar value={o.value} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{o.note}</p>
            </SectionCard>
          ))}
          <div className="rounded-xl border border-primary/25 bg-primary/6 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Recommended action</p>
            <p className="mt-1 text-sm text-foreground/85">
              Begin IPM tier 1–3 immediately: scout 10 plants, reduce leaf wetness, remove heavily infected leaves.
              Re-scan in 3 days.
            </p>
          </div>
        </div>
      </div>

      <SectionCard title={`${active.label} — how it contributes`}>
        <p className="text-sm text-foreground/85">{active.detail}</p>
        <div className="mt-4 max-w-md">
          <ScoreBar value={active.weight * 4} label="Relative influence on the current score" />
        </div>
      </SectionCard>

      <Disclaimer />
    </>
  );
}
