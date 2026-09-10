import { Link, createFileRoute } from "@tanstack/react-router";
import { Bug, FlaskConical, Leaf, Scissors, Search, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Disclaimer, PageHeader, SectionCard } from "@/components/ui-kit";
import { IPM_STEPS } from "@/lib/demo-data";

export const Route = createFileRoute("/_app/advisory")({
  head: () => ({
    meta: [
      { title: "Smart Advisory — CROPNEX" },
      { name: "description", content: "Integrated Pest Management advisory: monitor, cultural, mechanical, biological and chemical control only when necessary." },
      { property: "og:title", content: "Smart Advisory — CROPNEX" },
      { property: "og:description", content: "IPM-first recommendations with safety-first chemical guidance." },
    ],
  }),
  component: Advisory,
});

const ICONS: Record<string, typeof Leaf> = { search: Search, sprout: Leaf, scissors: Scissors, bug: Bug, flask: FlaskConical };

function Advisory() {
  return (
    <>
      <PageHeader
        eyebrow="Act"
        title="Smart Advisory (IPM)"
        description="Advisory for the current case: Early Blight suspicion on tomato, flowering stage, moderate severity."
        actions={
          <Button asChild variant="outline">
            <Link to="/followup">Track follow-up</Link>
          </Button>
        }
      />

      <div className="rounded-xl border border-primary/20 bg-primary/6 p-5">
        <p className="text-sm font-semibold text-primary">Integrated Pest Management principle</p>
        <p className="mt-1 text-sm text-foreground/85">
          Chemical control is the last step, never the first. Each tier below should be attempted and monitored before
          moving to the next.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {IPM_STEPS.map((step, i) => {
          const Icon = ICONS[step.icon] ?? Leaf;
          const isChemical = i === IPM_STEPS.length - 1;
          return (
            <SectionCard key={step.tier} className={isChemical ? "border-risk-moderate/40" : undefined}>
              <div className="flex items-start gap-4">
                <span
                  className={`grid size-11 shrink-0 place-items-center rounded-xl ${
                    isChemical ? "bg-risk-moderate/15 text-risk-high" : "bg-primary/10 text-primary"
                  }`}
                >
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{step.tier}</p>
                  <h3 className="mt-0.5 text-base font-bold">{step.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{step.detail}</p>
                </div>
              </div>
            </SectionCard>
          );
        })}
      </div>

      <div className="rounded-xl border border-risk-high/30 bg-risk-high/8 p-5">
        <div className="flex items-start gap-3">
          <ShieldAlert className="mt-0.5 size-5 shrink-0 text-risk-high" />
          <div>
            <p className="text-sm font-bold text-risk-high">Chemical safety</p>
            <p className="mt-1 text-sm text-foreground/85">
              This platform does not suggest pesticide names, doses or mixing instructions. Follow locally approved
              agricultural guidance and product labels, and consult your extension officer before any spray decision.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Monitoring schedule">
          <ul className="space-y-3 text-sm">
            {[
              ["Every 2 days", "Scout 10 random plants, record lesion counts"],
              ["Daily", "Check trap captures and canopy moisture"],
              ["Day 3", "Upload a follow-up image for reassessment"],
              ["Day 7", "Full reassessment and advisory review"],
            ].map(([when, what]) => (
              <li key={when} className="flex gap-3 rounded-xl border border-border p-3">
                <span className="w-20 shrink-0 text-xs font-semibold text-primary">{when}</span>
                <span className="text-foreground/85">{what}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Escalation path">
          <ol className="space-y-3 text-sm">
            {[
              "Symptoms spread beyond 30% of plants → contact extension worker",
              "Lesions on fruit or stem → request expert validation",
              "Expert uncertain or AI confidence below 60% → laboratory referral",
              "Confirmed high-risk disease → district advisory and cluster monitoring",
            ].map((t, i) => (
              <li key={t} className="flex gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/12 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <span className="text-foreground/85">{t}</span>
              </li>
            ))}
          </ol>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild>
              <Link to="/expert">Request expert validation</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/lab">Lab referral status</Link>
            </Button>
          </div>
        </SectionCard>
      </div>

      <Disclaimer />
    </>
  );
}
