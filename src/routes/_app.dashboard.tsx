import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  Bot,
  BugPlay,
  CloudRain,
  Droplets,
  HeartPulse,
  LineChart as LineChartIcon,
  ScanLine,
  Sprout,
  Thermometer,
  Wind,
} from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Disclaimer, PageHeader, RiskChip, ScoreBar, SectionCard, StatCard } from "@/components/ui-kit";
import {
  FARM,
  FORECAST,
  RECENT_SCANS,
  RISK_FACTORS,
  TIMELINE,
  WEATHER,
  riskLevelFromScore,
} from "@/lib/demo-data";
import { useSession } from "@/lib/session";
import { RISK_STYLES } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Farmer Dashboard — KrishiRakshak AI" },
      { name: "description", content: "Farm health score, disease risk, pest activity, weather and recommended actions." },
      { property: "og:title", content: "Farmer Dashboard — KrishiRakshak AI" },
      { property: "og:description", content: "Your farm's crop-health early warning at a glance." },
    ],
  }),
  component: Dashboard,
});

const QUICK_ACTIONS = [
  { to: "/scanner", label: "Scan Crop", icon: ScanLine },
  { to: "/assistant", label: "Ask KrishiRakshak AI", icon: Bot },
  { to: "/forecast", label: "View Risk Forecast", icon: LineChartIcon },
  { to: "/outbreak", label: "Report Pest/Disease", icon: BugPlay },
  { to: "/farm", label: "My Farm", icon: Sprout },
];

function Dashboard() {
  const { user } = useSession();

  return (
    <>
      <PageHeader
        eyebrow="Farmer workspace"
        title={`Namaste, ${user?.name?.split(" ")[0] ?? "Farmer"}`}
        description={`${FARM.crop} · ${FARM.stage} · ${FARM.village}, ${FARM.district}, ${FARM.state}`}
        actions={
          <Button asChild>
            <Link to="/scanner">
              <ScanLine className="size-4" /> Scan Crop
            </Link>
          </Button>
        }
      />

      <div className="flex flex-wrap gap-2">
        {QUICK_ACTIONS.map(({ to, label, icon: Icon }) => (
          <Button key={to} asChild variant="outline" className="h-auto py-3">
            <Link to={to}>
              <Icon className="size-4 text-primary" /> {label}
            </Link>
          </Button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Farm Health" value={`${FARM.healthScore}/100`} icon={<HeartPulse className="size-4" />} hint="Stable" />
        <StatCard label="Disease Risk" value="Moderate" level="moderate" icon={<Activity className="size-4" />} />
        <StatCard label="Pest Activity" value="Increasing" trend={37} icon={<BugPlay className="size-4" />} />
        <StatCard label="Weather Risk" value="High" level="high" icon={<CloudRain className="size-4" />} />
        <StatCard label="Last Scan" value="2 h ago" hint="SC-20941 · Tomato" icon={<ScanLine className="size-4" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard
          title="5-day risk forecast"
          subtitle="Disease, pest and weather risk projection"
          className="lg:col-span-2"
          actions={
            <Button asChild size="sm" variant="ghost">
              <Link to="/forecast">Open forecast</Link>
            </Button>
          }
        >
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={FORECAST} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                    background: "var(--card)",
                    fontSize: 12,
                  }}
                />
                <Line type="monotone" dataKey="disease" name="Disease" stroke="var(--chart-5)" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="pest" name="Pest" stroke="var(--chart-3)" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="weather" name="Weather" stroke="var(--chart-4)" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 rounded-xl border border-risk-high/25 bg-risk-high/8 p-4">
            <p className="text-sm font-semibold text-risk-high">Early warning</p>
            <p className="mt-1 text-sm text-foreground/80">
              High probability of fungal infection within the next 3–5 days.
            </p>
          </div>
        </SectionCard>

        <SectionCard title="Weather now" subtitle={WEATHER.condition}>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Thermometer, label: "Temperature", value: `${WEATHER.temp}°C` },
              { icon: Droplets, label: "Humidity", value: `${WEATHER.humidity}%` },
              { icon: CloudRain, label: "Rainfall (48h)", value: `${WEATHER.rainfall} mm` },
              { icon: Wind, label: "Wind", value: `${WEATHER.wind} km/h` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-xl border border-border p-3">
                <Icon className="size-4 text-primary" />
                <p className="mt-2 text-lg font-bold">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-3">
            <ScoreBar value={WEATHER.soilMoisture} label="Soil moisture" detail="Above optimal band" />
            <ScoreBar value={FARM.diseaseRisk} label="Disease risk index" />
            <ScoreBar value={FARM.pestRisk} label="Pest risk index" />
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard title="Recent scans" className="lg:col-span-2" bodyClassName="p-0">
          <div className="divide-y divide-border">
            {RECENT_SCANS.map((scan) => (
              <div key={scan.id} className="flex flex-wrap items-center gap-3 px-5 py-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">
                    {scan.suspected} <span className="text-muted-foreground">· {scan.crop}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {scan.id} · {scan.date} · affected ~{scan.affected}%
                  </p>
                </div>
                <span className="text-sm font-semibold tabular-nums">{scan.confidence}%</span>
                <RiskChip level={riskLevelFromScore(scan.confidence)} label={scan.severity} />
                <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                  {scan.status}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Recommended actions" subtitle="IPM-first sequence">
          <ol className="space-y-3">
            {[
              "Inspect lower leaves of 10 random plants",
              "Monitor soil and canopy moisture daily",
              "Check nearby plants for spreading lesions",
              "Avoid unnecessary pesticide application",
              "Contact extension worker if symptoms increase",
            ].map((step, i) => (
              <li key={step} className="flex gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/12 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <span className="text-sm text-foreground/85">{step}</span>
              </li>
            ))}
          </ol>
          <Button asChild variant="outline" className="mt-4 w-full">
            <Link to="/advisory">Open smart advisory</Link>
          </Button>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Why is my crop at risk?" subtitle={`Risk score ${87}/100 · HIGH`}>
          <div className="space-y-4">
            {RISK_FACTORS.map((f) => (
              <ScoreBar key={f.label} value={f.value} label={`${f.label} — ${f.detail}`} />
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-primary/20 bg-primary/6 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">AI explanation</p>
            <p className="mt-1.5 text-sm text-foreground/85">
              Risk is high because humidity and rainfall conditions are favorable for fungal disease while your crop is
              currently in a susceptible growth stage.
            </p>
          </div>
        </SectionCard>

        <SectionCard title="Farm health timeline" bodyClassName="p-0">
          <ol className="divide-y divide-border">
            {TIMELINE.map((t) => (
              <li key={t.date} className="flex gap-4 px-5 py-3.5">
                <span className="w-14 shrink-0 text-xs font-semibold text-muted-foreground">{t.date}</span>
                <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", RISK_STYLES[t.tone].dot)} />
                <span>
                  <span className="block text-sm font-semibold">{t.title}</span>
                  <span className="block text-xs text-muted-foreground">{t.detail}</span>
                </span>
              </li>
            ))}
          </ol>
        </SectionCard>
      </div>

      <Disclaimer />
    </>
  );
}
