import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, FlaskConical, Leaf, PencilLine, X } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Disclaimer, EmptyState, PageHeader, RiskChip, ScoreBar, SectionCard, StatCard } from "@/components/ui-kit";
import { EXPERT_CASES, riskLevelFromScore, type ExpertCase } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/expert")({
  head: () => ({
    meta: [
      { title: "Expert Validation — CROPNEX" },
      { name: "description", content: "Plant pathologists confirm, correct, reject or refer AI predictions to laboratories." },
      { property: "og:title", content: "Expert Validation — CROPNEX" },
      { property: "og:description", content: "Human-in-the-loop validation of every AI suspicion." },
    ],
  }),
  component: ExpertReview,
});

const TABS = [
  { key: "pending", label: "Pending Cases" },
  { key: "confirmed", label: "Confirmed" },
  { key: "rejected", label: "Rejected" },
  { key: "lab", label: "Lab Referrals" },
] as const;

function ExpertReview() {
  const [cases, setCases] = useState<ExpertCase[]>(EXPERT_CASES);
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("pending");
  const [selectedId, setSelectedId] = useState<string | null>(EXPERT_CASES[0]!.id);
  const [correction, setCorrection] = useState("");

  const list = useMemo(() => cases.filter((c) => c.state === tab), [cases, tab]);
  const selected = cases.find((c) => c.id === selectedId) ?? list[0] ?? null;

  const act = (state: ExpertCase["state"], diagnosis?: string) => {
    if (!selected) return;
    setCases((prev) =>
      prev.map((c) => (c.id === selected.id ? { ...c, state, expertDiagnosis: diagnosis ?? c.aiPrediction } : c)),
    );
    setCorrection("");
    toast.success(
      state === "confirmed"
        ? `Case ${selected.id} confirmed as ${diagnosis ?? selected.aiPrediction}`
        : state === "rejected"
          ? `Case ${selected.id} rejected — feedback sent to model`
          : `Case ${selected.id} referred to laboratory`,
    );
  };

  const counts = {
    pending: cases.filter((c) => c.state === "pending").length,
    confirmed: cases.filter((c) => c.state === "confirmed").length,
    rejected: cases.filter((c) => c.state === "rejected").length,
    lab: cases.filter((c) => c.state === "lab").length,
  };

  return (
    <>
      <PageHeader
        eyebrow="Verify"
        title="Expert Review Dashboard"
        description="Every expert decision becomes verified training feedback for the model."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pending Cases" value={counts.pending} icon={<Leaf className="size-4" />} />
        <StatCard label="Confirmed Cases" value={counts.confirmed} icon={<BadgeCheck className="size-4" />} />
        <StatCard label="Rejected Cases" value={counts.rejected} icon={<X className="size-4" />} />
        <StatCard label="Lab Referrals" value={counts.lab} icon={<FlaskConical className="size-4" />} />
      </div>

      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              tab === t.key ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted",
            )}
          >
            {t.label} · {counts[t.key]}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <SectionCard title="Case queue" bodyClassName="p-0">
          {list.length === 0 ? (
            <div className="p-5">
              <EmptyState title="No cases in this state" description="Cases move here as experts act on them." />
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {list.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => setSelectedId(c.id)}
                    className={cn(
                      "w-full px-5 py-3.5 text-left transition-colors hover:bg-muted/60",
                      selected?.id === c.id && "bg-primary/5",
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold">
                        {c.id} · {c.crop}
                      </span>
                      <RiskChip level={riskLevelFromScore(c.confidence)} label={`${c.confidence}%`} />
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      AI: {c.aiPrediction} · {c.village} · {c.submitted}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        {selected ? (
          <SectionCard title={`Case ${selected.id}`} subtitle={`${selected.farmerRef} · ${selected.village}`}>
            <div className="grid gap-4 sm:grid-cols-[1fr_1.2fr]">
              <div className="relative grid h-44 place-items-center overflow-hidden rounded-xl border border-border bg-[oklch(0.93_0.05_145)]">
                <Leaf className="size-10 text-primary/60" />
                <span className="absolute bottom-2 left-2 rounded-md bg-card/90 px-2 py-1 text-[10px] font-semibold">
                  Farmer submission · {selected.crop}
                </span>
              </div>
              <dl className="space-y-2 text-sm">
                {[
                  ["AI prediction", selected.aiPrediction],
                  ["Confidence", `${selected.confidence}%`],
                  ["Severity", selected.severity],
                  ["Symptoms", selected.symptoms],
                  ["Submitted", selected.submitted],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3 border-b border-border pb-1.5 last:border-0">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-right font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-4 space-y-3">
              <ScoreBar value={selected.confidence} label="AI confidence" />
              <ScoreBar value={72} label="Contextual risk factors (weather, stage, cluster)" />
            </div>

            {selected.expertDiagnosis && selected.expertDiagnosis !== selected.aiPrediction ? (
              <div className="mt-4 rounded-xl border border-risk-moderate/30 bg-risk-moderate/10 p-4 text-sm">
                <p>
                  <span className="text-muted-foreground">AI Prediction:</span>{" "}
                  <span className="font-semibold">{selected.aiPrediction}</span>
                </p>
                <p className="mt-1">
                  <span className="text-muted-foreground">Expert Confirmation:</span>{" "}
                  <span className="font-semibold text-primary">{selected.expertDiagnosis}</span>
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  This correction is stored as feedback data for the next model training round.
                </p>
              </div>
            ) : null}

            <div className="mt-5 space-y-3">
              <div className="flex gap-2">
                <Input
                  value={correction}
                  onChange={(e) => setCorrection(e.target.value)}
                  placeholder="Corrected diagnosis (optional)"
                />
                <Button variant="outline" onClick={() => act("confirmed", correction || selected.aiPrediction)}>
                  <PencilLine className="size-4" /> Correct
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => act("confirmed")}>
                  <BadgeCheck className="size-4" /> Confirm
                </Button>
                <Button variant="outline" onClick={() => act("rejected", "Not a disease (rejected)")}>
                  <X className="size-4" /> Reject
                </Button>
                <Button variant="outline" onClick={() => act("lab")}>
                  <FlaskConical className="size-4" /> Refer to Laboratory
                </Button>
              </div>
            </div>
          </SectionCard>
        ) : (
          <SectionCard>
            <EmptyState title="Select a case" description="Pick a case from the queue to review it." />
          </SectionCard>
        )}
      </div>

      <Disclaimer />
    </>
  );
}
