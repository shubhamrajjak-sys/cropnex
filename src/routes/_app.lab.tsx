import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, FlaskConical } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Disclaimer, PageHeader, SectionCard, StatCard } from "@/components/ui-kit";
import { LAB_REFERRALS, LAB_STAGES } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/lab")({
  head: () => ({
    meta: [
      { title: "Lab Referral — KrishiRakshak AI" },
      { name: "description", content: "Laboratory referral workflow with sample collection, testing and result tracking." },
      { property: "og:title", content: "Lab Referral — KrishiRakshak AI" },
      { property: "og:description", content: "Low-confidence or high-risk cases go to the laboratory." },
    ],
  }),
  component: LabPage,
});

function LabPage() {
  const [referrals, setReferrals] = useState(LAB_REFERRALS);

  const advance = (id: string) => {
    setReferrals((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              stage: Math.min(5, r.stage + 1),
              result: r.stage + 1 >= 4 ? r.result ?? "Pathogen identification completed · report attached" : r.result,
            }
          : r,
      ),
    );
    toast.success(`${id} moved to the next stage`);
  };

  return (
    <>
      <PageHeader
        eyebrow="Verify"
        title="Laboratory Referral Workflow"
        description="Cases with low AI confidence or high-risk disease suspicion are escalated for laboratory confirmation."
      />

      <div className="rounded-xl border border-info/30 bg-info/8 p-5">
        <p className="text-sm font-semibold text-info">Laboratory confirmation recommended</p>
        <p className="mt-1 text-sm text-foreground/85">
          Two active cases fall below the 60% confidence threshold or involve a high-risk pathogen. Chemical treatment
          should wait for the result.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Open Referrals" value={referrals.filter((r) => r.stage < 5).length} icon={<FlaskConical className="size-4" />} />
        <StatCard label="Under Testing" value={referrals.filter((r) => r.stage === 3).length} />
        <StatCard label="Results Available" value={referrals.filter((r) => r.stage >= 4).length} />
        <StatCard label="Avg Turnaround" value="4.2 days" hint="District lab" />
      </div>

      <div className="space-y-4">
        {referrals.map((r) => (
          <SectionCard key={r.id} title={`${r.id} · ${r.crop}`} subtitle={`${r.lab} · requested ${r.requested}`}>
            <p className="text-sm text-muted-foreground">
              Linked case {r.case} · Reason: <span className="font-medium text-foreground">{r.reason}</span>
            </p>

            <ol className="mt-5 flex flex-wrap gap-2">
              {LAB_STAGES.map((s, i) => {
                const step = i + 1;
                const done = step <= r.stage;
                const current = step === r.stage;
                return (
                  <li key={s} className="flex items-center gap-2">
                    <span
                      className={cn(
                        "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold",
                        done
                          ? "border-primary/30 bg-primary/10 text-primary"
                          : "border-border text-muted-foreground",
                        current && "ring-2 ring-primary/25",
                      )}
                    >
                      {done ? <CheckCircle2 className="size-3.5" /> : <span className="size-3.5 rounded-full border border-current" />}
                      {s}
                    </span>
                    {i < LAB_STAGES.length - 1 ? <span className="text-muted-foreground">→</span> : null}
                  </li>
                );
              })}
            </ol>

            {r.result ? (
              <div className="mt-4 rounded-xl border border-primary/25 bg-primary/6 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">Laboratory result</p>
                <p className="mt-1 text-sm text-foreground/85">{r.result}</p>
              </div>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">Result not yet available.</p>
            )}

            {r.stage < 5 ? (
              <Button variant="outline" className="mt-4" onClick={() => advance(r.id)}>
                Advance status
              </Button>
            ) : null}
          </SectionCard>
        ))}
      </div>

      <Disclaimer text="Laboratory results are the confirmatory source. AI predictions remain preliminary until a lab or expert confirms them." />
    </>
  );
}
