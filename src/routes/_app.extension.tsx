import { createFileRoute } from "@tanstack/react-router";
import { Camera, CheckCircle2, MessageSquarePlus, UserCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader, RiskChip, SectionCard, StatCard } from "@/components/ui-kit";
import { EXTENSION_STATS, EXPERT_CASES, PRIORITY_VISITS } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/extension")({
  head: () => ({
    meta: [
      { title: "Extension Worker — CROPNEX" },
      { name: "description", content: "Assigned villages, today's priority visits, farmer cases and expert escalation." },
      { property: "og:title", content: "Extension Worker — CROPNEX" },
      { property: "og:description", content: "Field work planning driven by risk, not routine." },
    ],
  }),
  component: ExtensionWorker,
});

function ExtensionWorker() {
  const [done, setDone] = useState<number[]>([]);
  const [note, setNote] = useState("");

  return (
    <>
      <PageHeader
        eyebrow="Field operations"
        title="Extension Worker Workspace"
        description="Nashik Block 4 · 6 assigned villages · 23 open farmer cases"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {EXTENSION_STATS.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <SectionCard title="Today's priority visits" subtitle="Ordered by cluster risk" bodyClassName="p-0">
          <ul className="divide-y divide-border">
            {PRIORITY_VISITS.map((v) => {
              const complete = done.includes(v.rank);
              return (
                <li key={v.rank} className={cn("px-5 py-4", complete && "bg-primary/[0.04]")}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="grid size-7 place-items-center rounded-full bg-primary/12 text-xs font-bold text-primary">
                      {v.rank}
                    </span>
                    <span className="text-sm font-bold">{v.village}</span>
                    <RiskChip level={v.risk} />
                    <span className="text-xs text-muted-foreground">
                      {v.time} · {v.farms} farms
                    </span>
                  </div>
                  <p className="mt-1.5 pl-9 text-xs text-muted-foreground">{v.note}</p>
                  <div className="mt-3 flex flex-wrap gap-2 pl-9">
                    <Button
                      size="sm"
                      variant={complete ? "secondary" : "default"}
                      onClick={() => {
                        setDone((d) => (d.includes(v.rank) ? d.filter((x) => x !== v.rank) : [...d, v.rank]));
                        toast.success(complete ? "Visit reopened" : `${v.village} visit marked completed`);
                      }}
                    >
                      <CheckCircle2 className="size-4" /> {complete ? "Completed" : "Mark visit completed"}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => toast.success("Field image uploaded")}>
                      <Camera className="size-4" /> Upload field image
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => toast.success("Expert request sent")}>
                      <UserCheck className="size-4" /> Request expert
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard title="Add field observation">
            <Textarea
              rows={5}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What did you observe in the field today?"
            />
            <Button
              className="mt-3 w-full"
              onClick={() => {
                if (!note.trim()) {
                  toast.error("Write an observation first");
                  return;
                }
                setNote("");
                toast.success("Observation saved to the case file");
              }}
            >
              <MessageSquarePlus className="size-4" /> Save observation
            </Button>
          </SectionCard>

          <SectionCard title="Pending farmer cases" bodyClassName="p-0">
            <ul className="divide-y divide-border">
              {EXPERT_CASES.slice(0, 5).map((c) => (
                <li key={c.id} className="flex items-center gap-3 px-5 py-3">
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">
                      {c.village} · {c.crop}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      AI: {c.aiPrediction} · {c.submitted}
                    </span>
                  </span>
                  <span className="text-sm tabular-nums">{c.confidence}%</span>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>
      </div>
    </>
  );
}
