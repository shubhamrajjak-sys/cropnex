import { Link, createFileRoute } from "@tanstack/react-router";
import { Camera, CheckCircle2, ImageUp, Loader2, MapPin, RotateCcw, ScanLine, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Disclaimer, PageHeader, RiskChip, ScoreBar, SectionCard } from "@/components/ui-kit";
import { AI_RESULT, CROPS, CROP_STAGES, FARM } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/scanner")({
  head: () => ({
    meta: [
      { title: "Crop Health Scanner — CROPNEX" },
      { name: "description", content: "Upload or capture a crop image and get an explainable preliminary AI analysis." },
      { property: "og:title", content: "Crop Health Scanner — CROPNEX" },
      { property: "og:description", content: "AI symptom analysis with confidence, severity and next steps." },
    ],
  }),
  component: Scanner,
});

type Phase = "idle" | "analysing" | "result";

const STEPS = [
  "Pre-processing image",
  "Detecting leaf regions",
  "Matching symptom patterns",
  "Cross-checking weather & stage",
  "Scoring confidence",
];

/**
 * Mock inference. Swap this single function for a real vision API call
 * (server function -> model endpoint) without touching the UI.
 */
async function runMockInference(onStep: (i: number) => void) {
  for (let i = 0; i < STEPS.length; i++) {
    onStep(i);
    await new Promise((r) => setTimeout(r, 620));
  }
  return AI_RESULT;
}

function Scanner() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [step, setStep] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const [crop, setCrop] = useState("Tomato");
  const [stage, setStage] = useState("Flowering");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  const handleFile = (file?: File) => {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    toast.success("Image ready for analysis");
  };

  const analyse = async () => {
    setPhase("analysing");
    setStep(0);
    await runMockInference(setStep);
    setPhase("result");
    toast.success("Preliminary AI analysis complete");
  };

  const reset = () => {
    setPhase("idle");
    setPreview(null);
    setStep(0);
  };

  return (
    <>
      <PageHeader
        eyebrow="See"
        title="Crop Health Scanner"
        description="Upload a clear photo of the affected leaf or fruit. The AI returns a preliminary suspicion — not a confirmed diagnosis."
        actions={
          phase === "result" ? (
            <Button variant="outline" onClick={reset}>
              <RotateCcw className="size-4" /> New scan
            </Button>
          ) : null
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <SectionCard title="Capture or upload" subtitle="JPG / PNG · clear, well-lit, close-up">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              handleFile(e.dataTransfer.files?.[0]);
            }}
            className={cn(
              "relative grid min-h-[260px] place-items-center overflow-hidden rounded-xl border-2 border-dashed p-6 text-center transition-colors",
              dragging ? "border-primary bg-primary/6" : "border-border bg-muted/40",
            )}
          >
            {preview ? (
              <>
                <img src={preview} alt="Uploaded crop leaf" className="absolute inset-0 size-full object-cover" />
                {phase === "analysing" ? (
                  <div className="absolute inset-0 bg-foreground/45">
                    <div className="absolute inset-x-0 top-0 h-1 animate-scanline bg-primary shadow-[0_0_24px_var(--primary)]" />
                  </div>
                ) : null}
              </>
            ) : (
              <div>
                <ImageUp className="mx-auto size-9 text-primary" />
                <p className="mt-3 text-sm font-semibold">Drag & drop an image here</p>
                <p className="mt-1 text-xs text-muted-foreground">or use the buttons below</p>
              </div>
            )}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0] ?? undefined)}
          />

          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => inputRef.current?.click()}>
              <Upload className="size-4" /> Upload image
            </Button>
            <Button variant="outline" onClick={() => inputRef.current?.click()}>
              <Camera className="size-4" /> Camera capture
            </Button>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
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
              <Label className="text-xs">Crop stage</Label>
              <Select value={stage} onValueChange={setStage}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CROP_STAGES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-2">
              <Label className="text-xs">Location</Label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary" />
                <Input defaultValue={`${FARM.village}, ${FARM.district} · ${FARM.coords}`} className="pl-9" readOnly />
              </div>
            </div>
          </div>

          <Button className="mt-5 w-full" size="lg" disabled={phase === "analysing"} onClick={analyse}>
            {phase === "analysing" ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Analysing…
              </>
            ) : (
              <>
                <ScanLine className="size-4" /> Analyse with CROPNEX
              </>
            )}
          </Button>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            No image? Analysis runs on demo data so you can preview the full workflow.
          </p>
        </SectionCard>

        <div className="space-y-6">
          {phase === "analysing" ? (
            <SectionCard title="AI analysis in progress">
              <ul className="space-y-3">
                {STEPS.map((s, i) => (
                  <li key={s} className="flex items-center gap-3 text-sm">
                    {i < step ? (
                      <CheckCircle2 className="size-4 text-primary" />
                    ) : i === step ? (
                      <Loader2 className="size-4 animate-spin text-primary" />
                    ) : (
                      <span className="size-4 rounded-full border border-border" />
                    )}
                    <span className={cn(i <= step ? "text-foreground" : "text-muted-foreground")}>{s}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>
          ) : null}

          {phase === "result" ? (
            <>
              <SectionCard title="Preliminary AI result" subtitle={`${crop} · ${stage}`}>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Suspected disease</p>
                    <p className="text-xl font-bold">{AI_RESULT.suspected}</p>
                    <p className="text-xs text-muted-foreground">{AI_RESULT.pathogen}</p>
                  </div>
                  <RiskChip level="high" label={`${AI_RESULT.confidence}% confidence`} />
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {[
                    ["AI Confidence", `${AI_RESULT.confidence}%`],
                    ["Severity", AI_RESULT.severity],
                    ["Affected Area", `~${AI_RESULT.affected}%`],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-xl border border-border p-3">
                      <p className="text-xs text-muted-foreground">{k}</p>
                      <p className="text-lg font-bold">{v}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-4">
                  <ScoreBar value={AI_RESULT.confidence} label="Confidence score" />
                  <div>
                    <p className="text-sm font-semibold">Symptoms detected</p>
                    <ul className="mt-2 space-y-1.5">
                      {AI_RESULT.symptoms.map((s) => (
                        <li key={s} className="flex gap-2 text-sm text-foreground/80">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Possible causes</p>
                    <ul className="mt-2 space-y-1.5">
                      {AI_RESULT.causes.map((s) => (
                        <li key={s} className="flex gap-2 text-sm text-foreground/80">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-risk-moderate" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Other possibilities considered</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {AI_RESULT.alternatives.map((a) => (
                        <span key={a.name} className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                          {a.name} · {a.probability}%
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Disclaimer
                  className="mt-5"
                  text="AI suspects Early Blight. Expert/laboratory confirmation is recommended before chemical treatment."
                />

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button onClick={() => toast.success("Case CS-4411 sent for expert validation")}>
                    Request Expert Validation
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/advisory">View IPM advisory</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/forecast">Recommended next step</Link>
                  </Button>
                </div>
              </SectionCard>
            </>
          ) : null}

          {phase === "idle" ? (
            <SectionCard title="How the scanner works">
              <ol className="space-y-3 text-sm">
                {[
                  "Image quality and leaf regions are checked first.",
                  "Symptom patterns are matched against a crop-specific disease library.",
                  "Weather, crop stage and nearby reports adjust the confidence.",
                  "Low-confidence or high-risk cases are routed to experts and labs.",
                ].map((t, i) => (
                  <li key={t} className="flex gap-3">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/12 text-xs font-bold text-primary">
                      {i + 1}
                    </span>
                    {t}
                  </li>
                ))}
              </ol>
              <Disclaimer className="mt-4" />
            </SectionCard>
          ) : null}
        </div>
      </div>
    </>
  );
}
