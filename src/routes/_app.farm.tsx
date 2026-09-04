import { Link, createFileRoute } from "@tanstack/react-router";
import { Droplets, MapPin, Ruler, Sprout } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { PageHeader, RiskChip, ScoreBar, SectionCard, StatCard } from "@/components/ui-kit";
import { FARM, RISK_STYLES, TIMELINE, TRAPS, WEATHER, riskLevelFromScore } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/farm")({
  head: () => ({
    meta: [
      { title: "My Farm — KrishiRakshak AI" },
      { name: "description", content: "Farm profile, plots, crop stage, soil, irrigation and health timeline." },
      { property: "og:title", content: "My Farm — KrishiRakshak AI" },
      { property: "og:description", content: "Plot-level crop health and monitoring status." },
    ],
  }),
  component: MyFarm,
});

const HEALTH_HISTORY = [
  { day: "Aug 22", health: 91 },
  { day: "Aug 25", health: 89 },
  { day: "Aug 28", health: 89 },
  { day: "Aug 31", health: 84 },
  { day: "Sep 2", health: 79 },
  { day: "Sep 4", health: 82 },
];

const PLOTS = [
  { name: "North Field", area: "1.4 acres", crop: "Tomato", stage: "Flowering", score: 74 },
  { name: "East Field", area: "1.1 acres", crop: "Tomato", stage: "Fruiting", score: 88 },
  { name: "South Boundary", area: "0.9 acres", crop: "Onion", stage: "Vegetative", score: 81 },
  { name: "West Block", area: "0.8 acres", crop: "Wheat", stage: "Germination", score: 63 },
];

function MyFarm() {
  return (
    <>
      <PageHeader
        eyebrow="Farm profile"
        title={FARM.name}
        description={`${FARM.village}, ${FARM.district}, ${FARM.state} · ${FARM.coords}`}
        actions={
          <Button asChild variant="outline">
            <Link to="/scanner">New scan</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Area" value={FARM.area} icon={<Ruler className="size-4" />} hint="4 plots" />
        <StatCard label="Primary Crop" value="Tomato" icon={<Sprout className="size-4" />} hint={FARM.stage} />
        <StatCard label="Soil Moisture" value={`${WEATHER.soilMoisture}%`} icon={<Droplets className="size-4" />} hint={FARM.soil} />
        <StatCard label="Farm Health" value={`${FARM.healthScore}/100`} icon={<MapPin className="size-4" />} trend={-4} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard title="Farm health trend" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={HEALTH_HISTORY} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="healthFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <YAxis domain={[50, 100]} tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }} />
                <Area type="monotone" dataKey="health" stroke="var(--chart-1)" strokeWidth={2.5} fill="url(#healthFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Crop record">
          <dl className="space-y-3 text-sm">
            {[
              ["Crop & variety", FARM.crop],
              ["Growth stage", FARM.stage],
              ["Sown on", FARM.sownOn],
              ["Soil type", FARM.soil],
              ["Irrigation", FARM.irrigation],
              ["Last scan", FARM.lastScan],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-border pb-2 last:border-0">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="text-right font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Plots" subtitle="Health score per plot">
          <div className="space-y-4">
            {PLOTS.map((p) => (
              <div key={p.name} className="rounded-xl border border-border p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{p.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {p.crop} · {p.stage} · {p.area}
                    </p>
                  </div>
                  <RiskChip level={riskLevelFromScore(100 - p.score)} label={`${p.score}/100`} />
                </div>
                <div className="mt-3">
                  <ScoreBar value={p.score} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard title="Connected traps on this farm" bodyClassName="p-0">
            <ul className="divide-y divide-border">
              {TRAPS.slice(0, 5).map((t) => (
                <li key={t.id} className="flex items-center justify-between gap-3 px-5 py-3">
                  <span className="text-sm font-medium">
                    {t.id} <span className="text-muted-foreground">· {t.location}</span>
                  </span>
                  <span className="text-sm tabular-nums">{t.pests}</span>
                  <span className="text-xs text-muted-foreground">{t.status}</span>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard title="Recent events" bodyClassName="p-0">
            <ol className="divide-y divide-border">
              {TIMELINE.slice(-4).map((t) => (
                <li key={t.date} className="flex gap-3 px-5 py-3">
                  <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", RISK_STYLES[t.tone].dot)} />
                  <span>
                    <span className="block text-sm font-semibold">
                      {t.date} — {t.title}
                    </span>
                    <span className="block text-xs text-muted-foreground">{t.detail}</span>
                  </span>
                </li>
              ))}
            </ol>
          </SectionCard>
        </div>
      </div>
    </>
  );
}
