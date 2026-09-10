import { Link, createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { toast } from "sonner";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { HotspotMap } from "@/components/hotspot-map";
import { Button } from "@/components/ui/button";
import { PageHeader, RiskChip, SectionCard, StatCard } from "@/components/ui-kit";
import {
  CROP_CASES,
  DISEASE_DISTRIBUTION,
  HOTSPOTS,
  OFFICIAL_STATS,
  RESPONSE_TIME,
  RISK_TREND,
  VILLAGE_CASES,
  riskLevelFromScore,
} from "@/lib/demo-data";

export const Route = createFileRoute("/_app/official")({
  head: () => ({
    meta: [
      { title: "Official Dashboard — CROPNEX" },
      { name: "description", content: "District-level crop health command centre: alerts, hotspots, disease distribution and response performance." },
      { property: "og:title", content: "Official Dashboard — CROPNEX" },
      { property: "og:description", content: "Agriculture officials monitor outbreaks and deploy teams." },
    ],
  }),
  component: OfficialDashboard,
});

const PIE_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

function OfficialDashboard() {
  const priorities = [...HOTSPOTS].sort((a, b) => b.score - a.score).slice(0, 4);

  return (
    <>
      <PageHeader
        eyebrow="District command centre"
        title="Agriculture Official Dashboard"
        description="Nashik division · live crop-health intelligence across 36 villages"
        actions={
          <Button asChild variant="outline">
            <Link to="/analytics">Full analytics</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {OFFICIAL_STATS.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} hint={s.delta} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <SectionCard title="Hotspot map" subtitle="Click a marker for village detail" bodyClassName="p-4">
          <HotspotMap className="min-h-[360px]" />
          <Button asChild variant="outline" className="mt-4 w-full">
            <Link to="/hotspots">Open full-screen map with filters</Link>
          </Button>
        </SectionCard>

        <SectionCard title="Priority areas" bodyClassName="p-0">
          <ul className="divide-y divide-border">
            {priorities.map((h, i) => (
              <li key={h.id} className="px-5 py-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold">
                    Priority #{i + 1} · {h.village}
                  </p>
                  <RiskChip level={riskLevelFromScore(h.score)} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {h.crop} · {h.disease} · {h.reports} cases · trend {h.trend}
                </p>
                <Button
                  size="sm"
                  className="mt-3"
                  onClick={() => toast.success(`Extension team deployed to ${h.village}`)}
                >
                  <Users className="size-4" /> Deploy Extension Team
                </Button>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Disease distribution">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={DISEASE_DISTRIBUTION} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
                  {DISEASE_DISTRIBUTION.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Disease & pest risk trend">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={RISK_TREND} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="disease" name="Disease" stroke="var(--chart-5)" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="pest" name="Pest" stroke="var(--chart-3)" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Village-wise cases">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={VILLAGE_CASES} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="village" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }} />
                <Bar dataKey="cases" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Crop-wise cases">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CROP_CASES} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="crop" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }} />
                <Bar dataKey="cases" fill="var(--chart-2)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Intervention response time" subtitle="Hours from alert to field visit">
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={RESPONSE_TIME} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
              <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }} />
              <Line type="monotone" dataKey="hours" name="Hours" stroke="var(--chart-4)" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </>
  );
}
