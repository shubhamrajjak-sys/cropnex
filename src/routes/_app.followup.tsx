import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, CheckCircle2, Upload } from "lucide-react";
import { toast } from "sonner";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { PageHeader, RiskChip, ScoreBar, SectionCard, StatCard } from "@/components/ui-kit";
import { FOLLOWUP, RISK_STYLES, TIMELINE, riskLevelFromScore } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/followup")({
  head: () => ({
    meta: [
      { title: "Follow-up Monitoring — KrishiRakshak AI" },
      { name: "description", content: "Day 0 to Day 14 follow-up workflow showing whether risk actually fell after intervention." },
      { property: "og:title", content: "Follow-up Monitoring — KrishiRakshak AI" },
      { property: "og:description", content: "Continuous monitoring, not one-time diagnosis." },
    ],
  }),
  component: FollowUp,
});

function FollowUp() {
  const drop = FOLLOWUP.riskBefore - FOLLOWUP.riskNow;

  return (
    <>
      <PageHeader
        eyebrow="Monitor"
        title="Follow-up Monitoring"
        description={`Advisory ${FOLLOWUP.advisory} · ${FOLLOWUP.disease}`}
        actions={
          <Button onClick={() => toast.success("Follow-up image queued for analysis")}>
            <Upload className="size-4" /> Upload Follow-up Image
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Risk before intervention" value={`${FOLLOWUP.riskBefore}%`} level={riskLevelFromScore(FOLLOWUP.riskBefore)} />
        <StatCard label="Current risk" value={`${FOLLOWUP.riskNow}%`} level={riskLevelFromScore(FOLLOWUP.riskNow)} />
        <StatCard label="Improvement" value={`-${drop} pts`} trend={-drop} />
        <StatCard label="Next checkpoint" value="Day 7" hint="Due tomorrow" icon={<CalendarClock className="size-4" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <SectionCard title="Risk progression after advisory">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={FOLLOWUP.progression} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", fontSize: 12 }} />
                <Line type="monotone" dataKey="risk" name="Risk %" stroke="var(--chart-1)" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="affected" name="Affected area %" stroke="var(--chart-3)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
            <ScoreBar value={FOLLOWUP.riskBefore} label="Day 0 risk" />
            <ScoreBar value={FOLLOWUP.riskNow} label="Day 7 risk" detail="Intervention is working — keep monitoring" />
          </div>
        </SectionCard>

        <SectionCard title="Follow-up workflow" bodyClassName="p-0">
          <ol className="divide-y divide-border">
            {FOLLOWUP.steps.map((s) => (
              <li key={s.day} className="flex gap-3 px-5 py-4">
                <span
                  className={cn(
                    "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold",
                    s.state === "done"
                      ? "bg-primary text-primary-foreground"
                      : s.state === "current"
                        ? "bg-risk-moderate/20 text-risk-high ring-2 ring-risk-moderate/40"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  {s.state === "done" ? <CheckCircle2 className="size-4" /> : s.day.replace("Day ", "")}
                </span>
                <span>
                  <span className="block text-sm font-semibold">
                    {s.day} — {s.title}
                  </span>
                  <span className="block text-xs text-muted-foreground">{s.detail}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="p-5">
            <Button className="w-full" onClick={() => toast.success("Reassessment scheduled")}>
              Schedule Day 7 reassessment
            </Button>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Farm health timeline" bodyClassName="p-0">
        <ol className="grid gap-0 divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-3">
          {TIMELINE.map((t) => (
            <li key={t.date} className="border-border p-5 sm:border-b lg:border-r">
              <div className="flex items-center gap-2">
                <span className={cn("size-2 rounded-full", RISK_STYLES[t.tone].dot)} />
                <span className="text-xs font-semibold text-muted-foreground">{t.date}</span>
                <RiskChip level={t.tone} />
              </div>
              <p className="mt-2 text-sm font-semibold">{t.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{t.detail}</p>
            </li>
          ))}
        </ol>
      </SectionCard>
    </>
  );
}
