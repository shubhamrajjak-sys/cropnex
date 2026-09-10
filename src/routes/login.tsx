import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { BadgeCheck, Building2, Leaf, Sprout, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEMO_USERS, type Role } from "@/lib/demo-data";
import { useSession } from "@/lib/session";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — CROPNEX" },
      { name: "description", content: "Choose a demo role to explore the CROPNEX crop-health platform." },
      { property: "og:title", content: "Sign in — CROPNEX" },
      { property: "og:description", content: "Farmer, extension worker, expert and official workspaces." },
    ],
  }),
  component: LoginPage,
});

const ROLES: { role: Role; icon: typeof Leaf; blurb: string; landing: string }[] = [
  { role: "farmer", icon: Sprout, blurb: "Scan crops, see risk forecasts and act on advisories.", landing: "/dashboard" },
  { role: "extension", icon: Users, blurb: "Manage village visits, farmer cases and escalations.", landing: "/extension" },
  { role: "expert", icon: BadgeCheck, blurb: "Validate AI predictions and issue lab referrals.", landing: "/expert" },
  { role: "official", icon: Building2, blurb: "Monitor districts, hotspots and response performance.", landing: "/official" },
];

function LoginPage() {
  const { signIn } = useSession();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Role>("farmer");
  const target = ROLES.find((r) => r.role === selected)!;

  const enter = () => {
    signIn(selected);
    navigate({ to: target.landing });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <div className="relative hidden flex-col justify-between bg-sidebar p-10 text-sidebar-foreground lg:flex">
        <div className="absolute inset-0 grain-grid opacity-40" />
        <Link to="/" className="relative flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
            <Leaf className="size-5" />
          </span>
          <span className="text-sm font-bold">CROPNEX</span>
        </Link>
        <div className="relative max-w-md">
          <h1 className="text-4xl font-bold leading-tight">Detect Early. Predict Risk. Act Smart.</h1>
          <p className="mt-4 text-sm text-sidebar-foreground/70">
            One crop-health intelligence workspace connecting farmers, extension workers, plant pathologists and
            agriculture officials — combining imagery, weather, IoT traps, satellite signals and expert validation.
          </p>
          <div className="mt-8 grid grid-cols-5 gap-2 text-center text-[11px] font-semibold uppercase tracking-wider">
            {["See", "Predict", "Map", "Verify", "Learn"].map((s) => (
              <span key={s} className="rounded-lg bg-sidebar-accent px-2 py-2 text-sidebar-accent-foreground">
                {s}
              </span>
            ))}
          </div>
        </div>
        <p className="relative text-xs text-sidebar-foreground/50">
          SIH Problem Statement 26131 · Demo build with simulated data
        </p>
      </div>

      <div className="flex items-center justify-center px-5 py-12 sm:px-10">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold">Sign in to your workspace</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Demo accounts are pre-filled. Real authentication can be added later without changing these screens.
          </p>

          <div className="mt-6 space-y-2.5">
            {ROLES.map(({ role, icon: Icon, blurb }) => {
              const user = DEMO_USERS[role];
              const active = selected === role;
              return (
                <button
                  key={role}
                  onClick={() => setSelected(role)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all",
                    active
                      ? "border-primary bg-primary/6 shadow-[var(--shadow-soft)]"
                      : "border-border hover:border-primary/40 hover:bg-muted/60",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-10 shrink-0 place-items-center rounded-lg",
                      active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                    )}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{user.name}</span>
                    <span className="block text-xs text-muted-foreground">{user.title}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{blurb}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor="mobile" className="text-xs">
                Mobile / ID
              </Label>
              <Input id="mobile" defaultValue="98•••••432" className="mt-1" readOnly />
            </div>
            <div>
              <Label htmlFor="otp" className="text-xs">
                Demo OTP
              </Label>
              <Input id="otp" defaultValue="1234" className="mt-1" readOnly />
            </div>
          </div>

          <Button className="mt-5 w-full" size="lg" onClick={enter}>
            Enter as {DEMO_USERS[selected].name}
          </Button>
          <Button asChild variant="ghost" className="mt-2 w-full">
            <Link to="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
