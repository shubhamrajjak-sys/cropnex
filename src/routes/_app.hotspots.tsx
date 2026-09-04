import { createFileRoute } from "@tanstack/react-router";
import { Filter, MapPin, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { HotspotMap } from "@/components/hotspot-map";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EmptyState, PageHeader, RiskChip, ScoreBar, SectionCard } from "@/components/ui-kit";
import { HOTSPOTS, riskLevelFromScore, type Hotspot } from "@/lib/demo-data";

export const Route = createFileRoute("/_app/hotspots")({
  head: () => ({
    meta: [
      { title: "GIS Hotspot Map — KrishiRakshak AI" },
      { name: "description", content: "Village-level disease and pest hotspots with risk levels, trends and assigned workers." },
      { property: "og:title", content: "GIS Hotspot Map — KrishiRakshak AI" },
      { property: "og:description", content: "Interactive outbreak map for agriculture officials." },
    ],
  }),
  component: HotspotPage,
});

const ALL = "All";
const uniq = (key: keyof Hotspot) => [ALL, ...Array.from(new Set(HOTSPOTS.map((h) => String(h[key]))))];

function HotspotPage() {
  const [crop, setCrop] = useState(ALL);
  const [disease, setDisease] = useState(ALL);
  const [pest, setPest] = useState(ALL);
  const [district, setDistrict] = useState(ALL);
  const [level, setLevel] = useState(ALL);
  const [selected, setSelected] = useState<Hotspot | null>(HOTSPOTS[0] ?? null);

  const filtered = useMemo(
    () =>
      HOTSPOTS.filter(
        (h) =>
          (crop === ALL || h.crop === crop) &&
          (disease === ALL || h.disease === disease) &&
          (pest === ALL || h.pest === pest) &&
          (district === ALL || h.district === district) &&
          (level === ALL || riskLevelFromScore(h.score) === level),
      ),
    [crop, disease, pest, district, level],
  );

  const reset = () => {
    setCrop(ALL);
    setDisease(ALL);
    setPest(ALL);
    setDistrict(ALL);
    setLevel(ALL);
  };

  const filters: { label: string; value: string; set: (v: string) => void; options: string[] }[] = [
    { label: "Crop", value: crop, set: setCrop, options: uniq("crop") },
    { label: "Disease", value: disease, set: setDisease, options: uniq("disease") },
    { label: "Pest", value: pest, set: setPest, options: uniq("pest") },
    { label: "District", value: district, set: setDistrict, options: uniq("district") },
    { label: "Risk level", value: level, set: setLevel, options: [ALL, "low", "moderate", "high", "critical"] },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Map"
        title="GIS Hotspot Map"
        description="Disease and pest clusters across monitored villages. Click a hotspot for village-level detail."
        actions={
          <Button variant="outline" onClick={reset}>
            <RotateCcw className="size-4" /> Reset filters
          </Button>
        }
      />

      <SectionCard bodyClassName="p-4">
        <div className="flex flex-wrap items-end gap-3">
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Filter className="size-3.5" /> Filters
          </span>
          {filters.map((f) => (
            <div key={f.label} className="min-w-[9rem] flex-1">
              <label className="text-[11px] text-muted-foreground">{f.label}</label>
              <Select value={f.value} onValueChange={f.set}>
                <SelectTrigger className="mt-1 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {f.options.map((o) => (
                    <SelectItem key={o} value={o} className="capitalize">
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <HotspotMap hotspots={filtered} selectedId={selected?.id ?? null} onSelect={setSelected} />

        <div className="space-y-6">
          {selected && filtered.some((h) => h.id === selected.id) ? (
            <SectionCard title={selected.village} subtitle={`${selected.district} district`}>
              <div className="mb-4 flex items-center gap-2">
                <RiskChip level={riskLevelFromScore(selected.score)} />
                <span className="text-xs text-muted-foreground">Trend {selected.trend}</span>
              </div>
              <ScoreBar value={selected.score} label="Cluster risk score" />
              <dl className="mt-4 space-y-2.5 text-sm">
                {[
                  ["Crop", selected.crop],
                  ["Disease", selected.disease],
                  ["Dominant pest", selected.pest],
                  ["Number of reports", String(selected.reports)],
                  ["Last reported", selected.lastReported],
                  ["Extension worker", selected.worker],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3 border-b border-border pb-2 last:border-0">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-right font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              <Button className="mt-4 w-full">
                <MapPin className="size-4" /> Deploy extension team
              </Button>
            </SectionCard>
          ) : (
            <SectionCard>
              <EmptyState title="No hotspot selected" description="Choose a marker on the map or relax the filters." />
            </SectionCard>
          )}

          <SectionCard title={`Hotspots (${filtered.length})`} bodyClassName="p-0">
            {filtered.length === 0 ? (
              <div className="p-5">
                <EmptyState title="No hotspots match these filters" />
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {filtered.map((h) => (
                  <li key={h.id}>
                    <button
                      onClick={() => setSelected(h)}
                      className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-muted/60"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold">{h.village}</span>
                        <span className="block text-xs text-muted-foreground">
                          {h.crop} · {h.disease}
                        </span>
                      </span>
                      <span className="text-sm tabular-nums">{h.reports}</span>
                      <RiskChip level={riskLevelFromScore(h.score)} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>
        </div>
      </div>
    </>
  );
}
