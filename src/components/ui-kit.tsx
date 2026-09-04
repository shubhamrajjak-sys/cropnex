import { ShieldAlert, TrendingDown, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";
import { AI_DISCLAIMER, RISK_STYLES, riskLevelFromScore, type RiskLevel } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
        ) : null}
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">{title}</h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function SectionCard({
  title,
  subtitle,
  actions,
  children,
  className,
  bodyClassName,
}: {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={cn("surface overflow-hidden", className)}>
      {title ? (
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
          <div>
            <h2 className="text-base font-semibold">{title}</h2>
            {subtitle ? <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p> : null}
          </div>
          {actions}
        </header>
      ) : null}
      <div className={cn("p-5", bodyClassName)}>{children}</div>
    </section>
  );
}

export function RiskChip({ level, label }: { level: RiskLevel; label?: string }) {
  const s = RISK_STYLES[level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
        s.chip,
      )}
    >
      <span className={cn("size-1.5 rounded-full", s.dot)} />
      {label ?? s.label}
    </span>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon,
  trend,
  level,
  onClick,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: ReactNode;
  trend?: number;
  level?: RiskLevel;
  onClick?: () => void;
}) {
  const Comp = onClick ? "button" : "div";
  return (
    <Comp
      onClick={onClick}
      className={cn(
        "surface group w-full p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]",
        onClick && "cursor-pointer",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        {icon ? <span className="text-primary">{icon}</span> : null}
      </div>
      <p className="mt-2 text-2xl font-bold tabular-nums">{value}</p>
      <div className="mt-1 flex items-center gap-2">
        {level ? <RiskChip level={level} /> : null}
        {typeof trend === "number" ? (
          <span
            className={cn(
              "inline-flex items-center gap-1 text-xs font-semibold",
              trend >= 0 ? "text-risk-high" : "text-risk-low",
            )}
          >
            {trend >= 0 ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
            {trend > 0 ? "+" : ""}
            {trend}%
          </span>
        ) : null}
        {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      </div>
    </Comp>
  );
}

export function ScoreBar({ value, label, detail }: { value: number; label?: string; detail?: string }) {
  const level = riskLevelFromScore(value);
  return (
    <div>
      {label ? (
        <div className="mb-1.5 flex items-baseline justify-between gap-3">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-sm font-semibold tabular-nums">{value}%</span>
        </div>
      ) : null}
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-all duration-700", RISK_STYLES[level].bar)}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {detail ? <p className="mt-1 text-xs text-muted-foreground">{detail}</p> : null}
    </div>
  );
}

export function Disclaimer({ text, className }: { text?: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border border-risk-moderate/30 bg-risk-moderate/10 px-4 py-3",
        className,
      )}
    >
      <ShieldAlert className="mt-0.5 size-4 shrink-0 text-risk-high" />
      <p className="text-xs leading-relaxed text-foreground/80">{text ?? AI_DISCLAIMER}</p>
    </div>
  );
}

export function FlowDiagram({ steps, vertical }: { steps: string[]; vertical?: boolean }) {
  return (
    <div
      className={cn(
        "flex gap-2",
        vertical ? "flex-col items-stretch" : "flex-wrap items-center",
      )}
    >
      {steps.map((step, i) => (
        <div key={step} className={cn("flex items-center gap-2", vertical && "flex-col")}>
          <div className="rounded-lg border border-primary/25 bg-primary/8 px-3 py-2 text-center text-xs font-semibold text-primary">
            {step}
          </div>
          {i < steps.length - 1 ? (
            <span className="text-primary/60">{vertical ? "↓" : "→"}</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-12 text-center">
      <p className="text-sm font-semibold">{title}</p>
      {description ? <p className="mt-1 max-w-sm text-xs text-muted-foreground">{description}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
