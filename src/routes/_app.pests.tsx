import { createFileRoute } from "@tanstack/react-router";
import { Battery, Bug, Camera, Cpu, Radar, Wifi } from "lucide-react";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { FlowDiagram, PageHeader, RiskChip, ScoreBar, SectionCard, StatCard } from "@/components/ui-kit";
import { PEST_FEED, PEST_WEEK, TRAPS } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/pests")({
  head: () => ({
    meta: [
      { title: "Pest Monitoring — KrishiRakshak AI" },
      { name: "description", content: "Smart IoT pest traps, live species detection feed and pest risk trends." },
      { property: "og:title", content: "Pest Monitoring — KrishiRakshak AI" },
      { property: "og:description", content: "Connected traps stream pest counts into the risk engine." },
    ],
  }),
  component: PestMonitoring,
});

const STATUS_STYLE: Record<string, string> = {
  Normal: "bg-risk-low/12 text-risk-low border-risk-low/25",
  Increasing: "bg-risk-moderate/15 text-risk-moderate border-risk-moderate/30",
  Critical: "bg-risk-critical/12 text-risk-critical border-risk-critical/30",
  Offline: "bg-muted text-muted-foreground border-border",
};

function PestMonitoring() {
  const [active, setActive] = useState(TRAPS[0]);

  return (
    <>
      <PageHeader
        eyebrow="IoT layer"
        title="Smart Pest Trap Monitoring"
        description="Camera-equipped traps count pest species automatically and feed the risk engine in near real time."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Connected Traps" value={8} icon={<Radar className="size-4" />} hint="2 offline" />
        <StatCard label="Active Sensors" value={6} icon={<Cpu className="size-4" />} hint="Humidity + camera" />
        <StatCard label="Pests Detected Today" value={143} icon={<Bug className="size-4" />} />
        <StatCard label="Weekly Change" value="+37%" trend={37} icon={<Wifi className="size-4" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard title="Trap network" subtitle="Tap a trap to inspect" className="lg:col-span-2" bodyClassName="p-4">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {TRAPS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t)}
                className={cn(
                  "rounded-xl border p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]",
                  active.id === t.id ? "border-primary bg-primary/5" : "border-border",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold">{t.id}</p>
                  <span className={cn("rounded-full border px-2 py-0.5 text-[10px] font-semibold", STATUS_STYLE[t.status])}>
                    {t.status}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{t.location}</p>
                <p className="mt-3 text-2xl font-bold tabular-nums">{t.pests}</p>
                <p className="text-xs text-muted-foreground">pests detected</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Battery className="size-3.5" /> {t.battery}%
                </div>
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard title={`${active.id} · ${active.location}`} subtitle="Trap camera & sensor snapshot">
          <div className="relative grid h-44 place-items-center overflow-hidden rounded-xl border border-border bg-[oklch(0.28_0.03_150)]">
            <div className="absolute inset-0 grain-grid opacity-30" />
            <div className="relative text-center text-[oklch(0.9_0.03_145)]">
              <Camera className="mx-auto size-7" />
              <p className="mt-2 text-xs">
                {active.status === "Offline" ? "Camera offline — awaiting reconnection" : "Live trap frame · 1 fps"}
              </p>
            </div>
            {active.status !== "Offline" ? (
              <>
                <span className="absolute left-[22%] top-[38%] size-8 rounded-md border-2 border-risk-moderate" />
                <span className="absolute left-[54%] top-[56%] size-6 rounded-md border-2 border-risk-high" />
                <span className="absolute left-[70%] top-[28%] size-7 rounded-md border-2 border-risk-moderate" />
              </>
            ) : null}
          </div>
          <div className="mt-4 space-y-3">
            <ScoreBar value={Math.min(100, active.pests * 2)} label="Pest pressure index" />
            <ScoreBar value={active.battery} label="Battery" />
          </div>
          <Button variant="outline" className="mt-4 w-full">
            Request manual inspection
          </Button>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Live pest detection feed" bodyClassName="p-0">
          <div className="divide-y divide-border">
            {PEST_FEED.map((p) => (
              <div key={p.species} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{p.species}</p>
                  <p className="text-xs text-muted-foreground">{p.time}</p>
                </div>
                <span className="text-sm font-bold tabular-nums">{p.count}</span>
                <span className="text-xs font-semibold text-risk-high">{p.trend}</span>
                <RiskChip level={p.risk} />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Weekly capture trend">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PEST_WEEK} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }} />
                <Bar dataKey="count" name="Captures" fill="var(--chart-3)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="How trap data becomes an alert">
        <FlowDiagram
          steps={["Pest Trap", "Camera / Sensor", "AI Pest Detection", "Pest Count", "Risk Engine", "Farmer Alert"]}
        />
      </SectionCard>
    </>
  );
}
