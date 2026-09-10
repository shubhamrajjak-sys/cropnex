import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader, SectionCard, StatCard } from "@/components/ui-kit";
import { ACCURACY_TREND, CROP_CASES, RESPONSE_TIME, RISK_TREND, VILLAGE_CASES } from "@/lib/demo-data";

export const Route = createFileRoute("/_app/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — CROPNEX" },
      { name: "description", content: "District analytics: case volumes, risk trends, response time and model performance." },
      { property: "og:title", content: "Analytics — CROPNEX" },
      { property: "og:description", content: "Evidence for policy and resource allocation." },
    ],
  }),
  component: Analytics,
});

const READINESS = [
  { metric: "Detection", score: 88 },
  { metric: "Validation", score: 76 },
  { metric: "Response", score: 71 },
  { metric: "Coverage", score: 64 },
  { metric: "Farmer reach", score: 82 },
  { metric: "Data quality", score: 79 },
];

function Analytics() {
  return (
    <>
      <PageHeader
        eyebrow="Insight"
        title="District Analytics"
        description="Six-week view of outbreak pressure, response performance and model reliability."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Cases (6 weeks)" value="243" trend={18} />
        <StatCard label="Avg response time" value="11 h" trend={-21} />
        <StatCard label="Validated cases" value="86%" />
        <StatCard label="Model accuracy" value="93%" trend={2} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Risk pressure over time">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={RISK_TREND} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="a1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-5)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--chart-5)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="disease" name="Disease" stroke="var(--chart-5)" fill="url(#a1)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="pest" name="Pest" stroke="var(--chart-3)" fill="transparent" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="District readiness index">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={READINESS} outerRadius="75%">
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
                <Radar dataKey="score" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.35} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Cases by village">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={VILLAGE_CASES} layout="vertical" margin={{ top: 4, right: 16, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <YAxis type="category" dataKey="village" width={90} tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }} />
                <Bar dataKey="cases" fill="var(--chart-1)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Cases by crop">
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

        <SectionCard title="Response time (hours)">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={RESPONSE_TIME} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }} />
                <Line type="monotone" dataKey="hours" stroke="var(--chart-4)" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Verified samples & accuracy">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ACCURACY_TREND} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }} />
                <Bar dataKey="verified" name="Verified samples" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>
    </>
  );
}
