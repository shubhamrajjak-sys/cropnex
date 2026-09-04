import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, Phone, Smartphone, WifiOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Disclaimer, PageHeader, SectionCard } from "@/components/ui-kit";
import { LANGUAGES } from "@/lib/demo-data";
import { useSession } from "@/lib/session";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — KrishiRakshak AI" },
      { name: "description", content: "Notification channels, SMS and voice fallback, language and offline advisory preferences." },
      { property: "og:title", content: "Settings — KrishiRakshak AI" },
      { property: "og:description", content: "Alerts that still reach farmers with poor connectivity." },
    ],
  }),
  component: Settings,
});

const CHANNELS = [
  { key: "app", label: "App notification", icon: Smartphone, detail: "Instant in-app alerts with full detail" },
  { key: "sms", label: "SMS", icon: MessageSquare, detail: "Short text alert for low-bandwidth areas" },
  { key: "whatsapp", label: "WhatsApp", icon: MessageSquare, detail: "Image-rich advisory with follow-up reminders" },
  { key: "voice", label: "Voice alert", icon: Phone, detail: "Automated call in your chosen language" },
];

function Settings() {
  const { demoMode, toggleDemoMode } = useSession();
  const [channels, setChannels] = useState<Record<string, boolean>>({ app: true, sms: true, whatsapp: false, voice: true });
  const [lang, setLang] = useState("hi");

  return (
    <>
      <PageHeader
        eyebrow="Preferences"
        title="Settings"
        description="Choose how advisories reach you — including channels that work without a data connection."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Notification channels">
          <ul className="space-y-3">
            {CHANNELS.map(({ key, label, icon: Icon, detail }) => (
              <li key={key} className="flex items-center gap-3 rounded-xl border border-border p-4">
                <Icon className="size-4 shrink-0 text-primary" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{label}</p>
                  <p className="text-xs text-muted-foreground">{detail}</p>
                </div>
                <Switch
                  checked={channels[key] ?? false}
                  onCheckedChange={(v) => {
                    setChannels((c) => ({ ...c, [key]: v }));
                    toast.success(`${label} ${v ? "enabled" : "disabled"}`);
                  }}
                />
              </li>
            ))}
          </ul>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard title="Language">
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors",
                    lang === l.code ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted",
                  )}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Offline mode">
            <div className="flex items-start gap-3 rounded-xl border border-info/30 bg-info/8 p-4">
              <WifiOff className="mt-0.5 size-4 shrink-0 text-info" />
              <div>
                <p className="text-sm font-semibold">Last known advisory available offline</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Advisory ADV-7741 (Early Blight, 2 Sep) is cached on this device with the full IPM step list and
                  monitoring schedule.
                </p>
              </div>
            </div>
            <Button variant="outline" className="mt-4 w-full" onClick={() => toast.success("Advisory saved for offline use")}>
              Save current advisory offline
            </Button>
          </SectionCard>

          <SectionCard title="Demo mode">
            <div className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">Use simulated data</p>
                <p className="text-xs text-muted-foreground">
                  Runs the whole platform without external APIs — sample data for tomato, wheat, rice, cotton, weather,
                  satellite, soil, IoT traps and expert confirmations.
                </p>
              </div>
              <Switch checked={demoMode} onCheckedChange={toggleDemoMode} />
            </div>
          </SectionCard>
        </div>
      </div>

      <Disclaimer />
    </>
  );
}
