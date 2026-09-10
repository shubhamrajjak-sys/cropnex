import { createFileRoute } from "@tanstack/react-router";
import { BellRing, CheckCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EmptyState, PageHeader, SectionCard, StatCard } from "@/components/ui-kit";
import { useSession } from "@/lib/session";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/notifications")({
  head: () => ({
    meta: [
      { title: "Notification Center — CROPNEX" },
      { name: "description", content: "Disease, pest, weather, expert, lab and preventive action alerts in one place." },
      { property: "og:title", content: "Notification Center — CROPNEX" },
      { property: "og:description", content: "Critical, warning and update alerts for your farm." },
    ],
  }),
  component: Notifications,
});

const LEVEL_STYLE = {
  critical: { chip: "bg-risk-critical/12 text-risk-critical border-risk-critical/30", dot: "🔴", label: "Critical" },
  warning: { chip: "bg-risk-high/12 text-risk-high border-risk-high/30", dot: "🟠", label: "Warning" },
  update: { chip: "bg-risk-low/12 text-risk-low border-risk-low/30", dot: "🟢", label: "Update" },
} as const;

const FILTERS = ["All", "Disease Risk", "Pest Outbreak", "Weather Risk", "Expert Response", "Lab Result", "Preventive Action"];

function Notifications() {
  const { notifications, markAllRead, toggleRead, unread } = useSession();
  const [filter, setFilter] = useState("All");
  const list = notifications.filter((n) => filter === "All" || n.type === filter);

  return (
    <>
      <PageHeader
        eyebrow="Alerts"
        title="Notification Center"
        description="Alerts are grouped by severity so critical field risks are never buried."
        actions={
          <Button variant="outline" onClick={markAllRead}>
            <CheckCheck className="size-4" /> Mark all read
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Unread" value={unread} icon={<BellRing className="size-4" />} />
        <StatCard label="Critical" value={notifications.filter((n) => n.level === "critical").length} level="critical" />
        <StatCard label="Warnings" value={notifications.filter((n) => n.level === "warning").length} level="high" />
        <StatCard label="Updates" value={notifications.filter((n) => n.level === "update").length} level="low" />
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
              filter === f ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <SectionCard bodyClassName="p-0">
        {list.length === 0 ? (
          <div className="p-5">
            <EmptyState title="No alerts here" description="Nothing matches this filter right now." />
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {list.map((n) => {
              const s = LEVEL_STYLE[n.level];
              return (
                <li key={n.id} className={cn("flex gap-4 px-5 py-4", !n.read && "bg-primary/[0.03]")}>
                  <span className="pt-0.5 text-base">{s.dot}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={cn("rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase", s.chip)}>
                        {s.label}
                      </span>
                      <span className="text-[11px] font-medium text-muted-foreground">{n.type}</span>
                      <span className="text-[11px] text-muted-foreground">· {n.time}</span>
                    </div>
                    <p className="mt-1 text-sm font-semibold">{n.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{n.body}</p>
                  </div>
                  <button
                    onClick={() => toggleRead(n.id)}
                    className="self-start text-xs font-semibold text-primary hover:underline"
                  >
                    {n.read ? "Mark unread" : "Mark read"}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </SectionCard>
    </>
  );
}
