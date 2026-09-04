import { useState } from "react";
import { HOTSPOTS, RISK_STYLES, riskLevelFromScore, type Hotspot } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const RISK_FILL: Record<string, string> = {
  low: "oklch(0.62 0.15 150)",
  moderate: "oklch(0.78 0.15 85)",
  high: "oklch(0.68 0.17 50)",
  critical: "oklch(0.57 0.21 25)",
};

export function HotspotMap({
  hotspots = HOTSPOTS,
  selectedId,
  onSelect,
  className,
}: {
  hotspots?: Hotspot[];
  selectedId?: string | null;
  onSelect?: (h: Hotspot) => void;
  className?: string;
}) {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-[oklch(0.96_0.03_150)] grain-grid",
        className,
      )}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
        <path d="M0 62 C 18 54, 32 70, 48 62 S 78 46, 100 56 L100 100 L0 100 Z" fill="oklch(0.9 0.05 148)" opacity="0.6" />
        <path d="M-2 30 C 20 34, 30 20, 52 26 S 80 38, 102 28" stroke="oklch(0.62 0.09 235)" strokeWidth="1.1" fill="none" opacity="0.65" />
        <path d="M8 100 C 22 70, 30 50, 44 0" stroke="oklch(0.75 0.03 150)" strokeWidth="0.6" fill="none" strokeDasharray="2 2" />
        <path d="M100 78 C 74 72, 60 60, 30 8" stroke="oklch(0.75 0.03 150)" strokeWidth="0.6" fill="none" strokeDasharray="2 2" />
      </svg>

      <div className="relative aspect-[16/10] w-full min-h-[320px]">
        {hotspots.map((h) => {
          const level = riskLevelFromScore(h.score);
          const active = selectedId === h.id || hover === h.id;
          const size = 14 + Math.round(h.reports / 3);
          return (
            <button
              key={h.id}
              onClick={() => onSelect?.(h)}
              onMouseEnter={() => setHover(h.id)}
              onMouseLeave={() => setHover(null)}
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
              aria-label={`${h.village} hotspot`}
            >
              <span className="relative grid place-items-center">
                <span
                  className="absolute animate-pulse-ring rounded-full"
                  style={{ width: size, height: size, backgroundColor: RISK_FILL[level] }}
                />
                <span
                  className={cn(
                    "relative rounded-full border-2 border-white shadow-md transition-transform duration-200",
                    active && "scale-125",
                  )}
                  style={{ width: size, height: size, backgroundColor: RISK_FILL[level] }}
                />
              </span>
              <span
                className={cn(
                  "pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground/90 px-2 py-1 text-[10px] font-semibold text-background transition-opacity",
                  active ? "opacity-100" : "opacity-0",
                )}
              >
                {h.village} · {h.reports} reports
              </span>
            </button>
          );
        })}
      </div>

      <div className="pointer-events-none absolute bottom-3 left-3 flex flex-wrap gap-2 rounded-lg bg-card/90 px-3 py-2 text-[11px] font-medium shadow-sm">
        {(["low", "moderate", "high", "critical"] as const).map((l) => (
          <span key={l} className="flex items-center gap-1.5">
            <span className={cn("size-2 rounded-full", RISK_STYLES[l].dot)} />
            {RISK_STYLES[l].label}
          </span>
        ))}
      </div>
    </div>
  );
}
