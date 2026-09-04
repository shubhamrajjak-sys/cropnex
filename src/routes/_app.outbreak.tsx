import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle, MapPinned, ShieldQuestion, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { HotspotMap } from "@/components/hotspot-map";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Disclaimer, PageHeader, SectionCard, StatCard } from "@/components/ui-kit";
import { CROPS, OUTBREAK_REPORTS } from "@/lib/demo-data";

export const Route = createFileRoute("/_app/outbreak")({
  head: () => ({
    meta: [
      { title: "Community Outbreak Intelligence — KrishiRakshak AI" },
      { name: "description", content: "Anonymously aggregated farmer reports reveal disease clusters before they spread." },
      { property: "og:title", content: "Community Outbreak Intelligence — KrishiRakshak AI" },
      { property: "og:description", content: "Cluster detection from community reports." },
    ],
  }),
  component: Outbreak,
});

function Outbreak() {
  const [crop, setCrop] = useState("Tomato");
  const [reports, setReports] = useState(OUTBREAK_REPORTS);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const suspicion = String(form.get("suspicion") || "Unspecified");
    setReports((prev) => [
      {
        id: `OR-${880 + prev.length}`,
        crop,
        suspicion,
        village: "Rampur",
        distance: "0.2 km",
        when: "just now",
        symptoms: String(form.get("symptoms") || "—"),
      },
      ...prev,
    ]);
    e.currentTarget.reset();
    toast.success("Report submitted anonymously to the cluster engine");
  };

  return (
    <>
      <PageHeader
        eyebrow="Community"
        title="Outbreak Intelligence"
        description="Reports are aggregated anonymously — no personal information is exposed to other farmers."
      />

      <div className="rounded-xl border border-risk-high/30 bg-risk-high/8 p-5">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 size-5 shrink-0 text-risk-high" />
          <div>
            <p className="text-sm font-bold text-risk-high">Possible disease cluster detected</p>
            <p className="mt-1 text-sm text-foreground/85">17 reports · within 4 km · last 72 hours</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Reports (72 h)" value={17} icon={<ShieldQuestion className="size-4" />} trend={24} />
        <StatCard label="Active Clusters" value={3} icon={<MapPinned className="size-4" />} />
        <StatCard label="Affected Villages" value={6} icon={<Users className="size-4" />} />
        <StatCard label="Dominant Trend" value="Early Blight" hint="tomato, flowering stage" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <SectionCard title="Outbreak map" bodyClassName="p-4">
            <HotspotMap className="min-h-[340px]" />
          </SectionCard>

          <SectionCard title="Anonymous community reports" bodyClassName="p-0">
            <ul className="divide-y divide-border">
              {reports.map((r) => (
                <li key={r.id} className="px-5 py-3.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold">{r.suspicion}</span>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium">{r.crop}</span>
                    <span className="text-xs text-muted-foreground">
                      {r.village} · {r.distance} away · {r.when}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{r.symptoms}</p>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>

        <SectionCard title="Report a pest or disease" subtitle="Your identity stays private">
          <form className="space-y-4" onSubmit={submit}>
            <div>
              <Label className="text-xs">Crop</Label>
              <Select value={crop} onValueChange={setCrop}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CROPS.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Disease / pest suspicion</Label>
              <Input name="suspicion" className="mt-1" placeholder="e.g. Early Blight" />
            </div>
            <div>
              <Label className="text-xs">Photo</Label>
              <Input type="file" accept="image/*" className="mt-1" />
            </div>
            <div>
              <Label className="text-xs">Location</Label>
              <Input className="mt-1" defaultValue="Rampur, Nashik" readOnly />
            </div>
            <div>
              <Label className="text-xs">Symptoms observed</Label>
              <Textarea name="symptoms" className="mt-1" rows={3} placeholder="Describe what you see on the plants" />
            </div>
            <div>
              <Label className="text-xs">Date noticed</Label>
              <Input type="date" className="mt-1" defaultValue="2026-09-04" />
            </div>
            <Button type="submit" className="w-full">
              Submit report
            </Button>
          </form>
          <Disclaimer className="mt-4" text="Community reports are unverified farmer observations used only for cluster detection, not diagnosis." />
        </SectionCard>
      </div>
    </>
  );
}
