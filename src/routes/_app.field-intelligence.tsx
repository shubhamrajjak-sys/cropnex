import { createFileRoute } from "@tanstack/react-router";
import { CloudOff, Satellite } from "lucide-react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Disclaimer, PageHeader, ScoreBar, SectionCard, StatCard } from "@/components/ui-kit";
import { FIELD_LAYERS, NDVI_HISTORY } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/field-intelligence")({
  head: () => ({
    meta: [
      { title: "Field Intelligence — KrishiRakshak AI" },
      { name: "description", content: "Satellite and ground data fusion that keeps working when cloud cover blocks satellite imagery." },
      { property: "og:title", content: "Field Intelligence — KrishiRakshak AI" },
      { property: "og:description", content: "No single-source dependency: ground, weather and IoT keep the score alive." },
    ],
  }),
  component: FieldIntelligence,
});

function FieldIntelligence() {
  const available = FIELD_LAYERS.filter((l) => l.available);
  const fusion = Math.round(available.reduce((s, l) => s + l.value, 0) / available.length);

  return (
    <>
      <PageHeader
        eyebrow="Fusion"
        title="Field Intelligence"
        description="Satellite vegetation health combined with ground imagery, weather, soil moisture and pest activity."
      />

      <div className="rounded-xl border border-risk-moderate/35 bg-risk-moderate/10 p-5">
        <div className="flex items-start gap-3">
          <CloudOff className="mt-0.5 size-5 shrink-0 text-risk-high" />
          <div>
            <p className="text-sm font-bold text-risk-high">Satellite data unavailable due to cloud cover.</p>
            <p className="mt-1 text-sm text-foreground/85">
              Ground + Weather + IoT intelligence active. The platform does not depend entirely on satellite imagery —
              weights redistribute to the available layers so the risk score stays reliable.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Satellite / Ground Fusion Score" value={`${fusion}/100`} hint="4 of 5 layers active" />
        <StatCard label="Cloud cover" value="84%" icon={<Satellite className="size-4" />} hint="Last clear pass: 5 days ago" />
        <StatCard label="Ground scans (7 d)" value="14" />
        <StatCard label="Confidence penalty" value="-6 pts" hint="Applied for missing NDVI" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <SectionCard title="Intelligence layers">
          <ul className="space-y-4">
            {FIELD_LAYERS.map((l) => (
              <li key={l.key} className={cn("rounded-xl border p-4", l.available ? "border-border" : "border-dashed border-risk-moderate/40 bg-risk-moderate/5")}>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold">{l.label}</p>
                  <span className={cn("text-xs font-semibold", l.available ? "text-risk-low" : "text-risk-high")}>
                    {l.available ? "Active" : "Unavailable"}
                  </span>
                </div>
                {l.available ? (
                  <div className="mt-2">
                    <ScoreBar value={l.value} detail={l.note} />
                  </div>
                ) : (
                  <p className="mt-1 text-xs text-muted-foreground">{l.note}</p>
                )}
              </li>
            ))}
          </ul>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard title="Vegetation vs ground health" subtitle="NDVI drops to zero when the pass is cloud-blocked">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={NDVI_HISTORY} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                  <YAxis yAxisId="l" domain={[0, 1]} tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                  <YAxis yAxisId="r" orientation="right" domain={[0, 100]} tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line yAxisId="l" type="monotone" dataKey="ndvi" name="NDVI" stroke="var(--chart-2)" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line yAxisId="r" type="monotone" dataKey="ground" name="Ground health" stroke="var(--chart-1)" strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard title="Field view" bodyClassName="p-4">
            <div className="relative grid h-56 place-items-center overflow-hidden rounded-xl border border-border bg-[oklch(0.9_0.06_146)] grain-grid">
              <div className="absolute inset-x-6 top-6 h-16 rounded-lg bg-[oklch(0.72_0.13_148)]/70" />
              <div className="absolute inset-x-6 bottom-6 h-16 rounded-lg bg-[oklch(0.78_0.14_95)]/70" />
              <div className="relative rounded-lg bg-card/90 px-4 py-2 text-center text-xs font-semibold">
                Composite field map · ground + weather layers
              </div>
            </div>
          </SectionCard>
        </div>
      </div>

      <Disclaimer />
    </>
  );
}
