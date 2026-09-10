import { Link, createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, CloudRain, Bug, Sprout } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Disclaimer, PageHeader, RiskChip, ScoreBar, SectionCard, StatCard } from "@/components/ui-kit";
import { FORECAST, RISK_FACTORS, RISK_SCORE, riskLevelFromScore } from "@/lib/demo-data";

export const Route = createFileRoute("/_app/forecast")({
  head: () => ({
    meta: [
      { title: "Risk Forecast — CROPNEX" },
      { name: "description", content: "5-day disease, pest and weather risk forecast with explainable AI reasons." },
      { property: "og:title", content: "Risk Forecast — CROPNEX" },
      { property: "og:description", content: "Early warning before symptoms become visible." },
    ],
  }),
  component: Forecast,
});

const RISK_COLORS = ["var(--risk-moderate)", "var(--risk-moderate)", "var(--risk-high)", "var(--risk-critical)", "var(--risk-critical)"];

function Forecast() {
  return (
    <>
      <PageHeader
        eyebrow="Predict"
        title="Disease & Pest Risk Forecast"
        description="Projected risk for the next five days based on weather, crop stage, pest pressure and nearby reports."
        actions={
          <Button asChild variant="outline">
            <Link to="/simulator">Open CropRisk Simulator</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Overall Risk Score" value={`${RISK_SCORE}/100`} level={riskLevelFromScore(RISK_SCORE)} />
        <StatCard label="Disease Risk (Day 5)" value="91%" level="critical" icon={<Sprout className="size-4" />} />
        <StatCard label="Pest Risk (Day 5)" value="70%" level="high" icon={<Bug className="size-4" />} />
        <StatCard label="Weather Risk (Day 5)" value="90%" level="critical" icon={<CloudRain className="size-4" />} />
      </div>

      <div className="rounded-xl border border-risk-critical/30 bg-risk-critical/8 p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-risk-critical" />
          <div>
            <p className="text-sm font-bold text-risk-critical">Early warning</p>
            <p className="mt-1 text-sm text-foreground/85">
              High probability of fungal infection within the next 3–5 days.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard title="5-day risk projection" className="lg:col-span-2">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={FORECAST} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }} />
                <Line type="monotone" dataKey="disease" name="Disease risk" stroke="var(--chart-5)" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="pest" name="Pest risk" stroke="var(--chart-3)" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="weather" name="Weather risk" stroke="var(--chart-4)" strokeWidth={2.5} strokeDasharray="5 4" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {FORECAST.map((f) => (
              <div key={f.day} className="rounded-xl border border-border p-3 text-center">
                <p className="text-xs text-muted-foreground">{f.day}</p>
                <p className="mt-1 text-xl font-bold tabular-nums">{f.disease}%</p>
                <div className="mt-1.5 flex justify-center">
                  <RiskChip level={riskLevelFromScore(f.disease)} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Why is my crop at risk?" subtitle={`Risk score ${RISK_SCORE}/100 · HIGH`}>
          <div className="space-y-4">
            {RISK_FACTORS.map((f) => (
              <div key={f.label}>
                <ScoreBar value={f.value} label={f.label} detail={`${f.detail} · weight ${f.weight}%`} />
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl border border-primary/20 bg-primary/6 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">AI explanation</p>
            <p className="mt-1.5 text-sm text-foreground/85">
              Risk is high because humidity and rainfall conditions are favorable for fungal disease while your crop is
              currently in a susceptible growth stage.
            </p>
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Factor contribution" subtitle="How much each signal pushes the score">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={RISK_FACTORS} layout="vertical" margin={{ top: 4, right: 16, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" domain={[0, 30]} tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <YAxis type="category" dataKey="label" width={120} tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }} />
                <Bar dataKey="weight" name="Weight %" radius={[0, 6, 6, 0]}>
                  {RISK_FACTORS.map((_, i) => (
                    <Cell key={i} fill={RISK_COLORS[i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Recommended action" subtitle="Before any chemical intervention">
          <ol className="space-y-3">
            {[
              "Inspect lower leaves",
              "Monitor moisture",
              "Check nearby plants",
              "Avoid unnecessary pesticide application",
              "Contact extension worker if symptoms increase",
            ].map((s, i) => (
              <li key={s} className="flex gap-3 rounded-xl border border-border p-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/12 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <span className="text-sm">{s}</span>
              </li>
            ))}
          </ol>
          <Button asChild className="mt-4 w-full">
            <Link to="/advisory">Open full IPM advisory</Link>
          </Button>
        </SectionCard>
      </div>

      <Disclaimer />
    </>
  );
}
