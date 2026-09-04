import { createFileRoute } from "@tanstack/react-router";
import { Gauge, RotateCcw, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Disclaimer, PageHeader, RiskChip, SectionCard } from "@/components/ui-kit";
import { CROP_STAGES, riskLevelFromScore } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/simulator")({
  head: () => ({
    meta: [
      { title: "KrishiRisk Simulator — KrishiRakshak AI" },
      { name: "description", content: "What-if simulator: change rainfall, humidity, temperature, soil moisture, crop stage and pest load to see predicted risk." },
      { property: "og:title", content: "KrishiRisk Simulator — KrishiRakshak AI" },
      { property: "og:description", content: "Model tomorrow's risk before it happens." },
    ],
  }),
  component: Simulator,
});

const BASE = { rainfall: 40, temperature: 29, humidity: 70, soil: 55, stage: 2, pest: 30, action: 0 };

/** Simulated risk model — replace with a served model without changing this UI. */
function computeRisk(v: typeof BASE) {
  const humidity = (v.humidity - 55) * 0.55;
  const rainfall = v.rainfall * 0.22;
  const temp = Math.max(0, 12 - Math.abs(v.temperature - 28)) * 1.1;
  const soil = Math.max(0, v.soil - 55) * 0.32;
  const stage = [6, 12, 22, 18, 10, 4][v.stage] ?? 10;
  const pest = v.pest * 0.34;
  const mitigation = v.action * 0.38;
  return Math.round(Math.min(99, Math.max(3, 12 + humidity + rainfall + temp + soil + stage + pest - mitigation)));
}

const SCENARIOS = [
  { label: "What if rainfall increases?", patch: { rainfall: 85, humidity: 90 } },
  { label: "What if pest population doubles?", patch: { pest: 80 } },
  { label: "What if I take preventive action?", patch: { action: 70, pest: 25 } },
  { label: "What if I delay intervention?", patch: { action: 0, pest: 75, humidity: 88, rainfall: 70 } },
];

function Simulator() {
  const [v, setV] = useState(BASE);
  const baseRisk = useMemo(() => computeRisk(BASE), []);
  const risk = computeRisk(v);
  const delta = risk - baseRisk;

  const projection = useMemo(
    () =>
      ["Today", "Day 2", "Day 3", "Day 4", "Day 5"].map((day, i) => ({
        day,
        baseline: Math.min(99, Math.round(baseRisk + i * 5.5)),
        simulated: Math.min(99, Math.round(risk + i * (v.action > 40 ? -3 : 6))),
      })),
    [baseRisk, risk, v.action],
  );

  const sliders: { key: keyof typeof BASE; label: string; suffix: string; min: number; max: number }[] = [
    { key: "rainfall", label: "Rainfall", suffix: " mm", min: 0, max: 120 },
    { key: "temperature", label: "Temperature", suffix: " °C", min: 10, max: 45 },
    { key: "humidity", label: "Humidity", suffix: " %", min: 20, max: 100 },
    { key: "soil", label: "Soil moisture", suffix: " %", min: 10, max: 100 },
    { key: "pest", label: "Pest population index", suffix: "", min: 0, max: 100 },
    { key: "action", label: "Preventive action intensity", suffix: "", min: 0, max: 100 },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Standout feature"
        title="KrishiRisk Simulator"
        description="Move the sliders to see how weather, crop stage, pest pressure and your own preventive action change the predicted risk."
        actions={
          <Button variant="outline" onClick={() => setV(BASE)}>
            <RotateCcw className="size-4" /> Reset to current conditions
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <SectionCard title="Conditions" subtitle="Adjust any factor">
          <div className="space-y-6">
            {sliders.map((s) => (
              <div key={s.key}>
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="text-sm font-medium">{s.label}</span>
                  <span className="text-sm font-semibold tabular-nums">
                    {v[s.key]}
                    {s.suffix}
                  </span>
                </div>
                <Slider
                  value={[v[s.key] as number]}
                  min={s.min}
                  max={s.max}
                  step={1}
                  onValueChange={([val]) => setV((prev) => ({ ...prev, [s.key]: val }))}
                />
              </div>
            ))}
            <div>
              <div className="mb-2 flex items-baseline justify-between">
                <span className="text-sm font-medium">Crop stage</span>
                <span className="text-sm font-semibold">{CROP_STAGES[v.stage]}</span>
              </div>
              <Slider
                value={[v.stage]}
                min={0}
                max={CROP_STAGES.length - 1}
                step={1}
                onValueChange={([val]) => setV((prev) => ({ ...prev, stage: val ?? 0 }))}
              />
            </div>
          </div>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard title="Predicted outcome">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-border p-4">
                <p className="text-xs text-muted-foreground">Current risk</p>
                <p className="mt-1 text-3xl font-bold tabular-nums">{baseRisk}%</p>
              </div>
              <div className="rounded-xl border border-primary/30 bg-primary/6 p-4">
                <p className="text-xs text-muted-foreground">Predicted risk</p>
                <p className="mt-1 text-3xl font-bold tabular-nums text-primary">{risk}%</p>
                <div className="mt-2">
                  <RiskChip level={riskLevelFromScore(risk)} />
                </div>
              </div>
              <div className="rounded-xl border border-border p-4">
                <p className="text-xs text-muted-foreground">Change</p>
                <p
                  className={cn(
                    "mt-1 text-3xl font-bold tabular-nums",
                    delta > 0 ? "text-risk-critical" : delta < 0 ? "text-risk-low" : "",
                  )}
                >
                  {delta > 0 ? "+" : ""}
                  {delta}
                </p>
              </div>
            </div>

            <div className="mt-5 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={projection} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="baseline" name="Current path" stroke="var(--muted-foreground)" strokeWidth={2} strokeDasharray="5 4" dot={false} />
                  <Line type="monotone" dataKey="simulated" name="Simulated path" stroke="var(--chart-1)" strokeWidth={3} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard title="Scenarios" subtitle="One click applies a full condition set">
            <div className="grid gap-2 sm:grid-cols-2">
              {SCENARIOS.map((s) => (
                <button
                  key={s.label}
                  onClick={() => setV((prev) => ({ ...prev, ...s.patch }))}
                  className="flex items-center gap-2 rounded-xl border border-border p-3 text-left text-sm font-medium transition-colors hover:border-primary/40 hover:bg-primary/5"
                >
                  <Sparkles className="size-4 shrink-0 text-primary" />
                  {s.label}
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-primary/20 bg-primary/6 p-4">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
                <Gauge className="size-3.5" /> AI reading
              </p>
              <p className="mt-1.5 text-sm text-foreground/85">
                {risk >= 80
                  ? "These conditions are strongly favourable for disease development. Inspect the crop daily and prepare preventive measures."
                  : risk >= 60
                    ? "Risk is elevated. Monitoring frequency should increase and cultural controls should begin now."
                    : risk >= 40
                      ? "Moderate risk. Routine scouting every two days is sufficient at this stage."
                      : "Conditions are currently unfavourable for outbreak. Maintain normal monitoring."}
              </p>
            </div>
          </SectionCard>
        </div>
      </div>

      <Disclaimer text="Simulator outputs are model estimates for planning only and do not replace field inspection or expert diagnosis." />
    </>
  );
}
