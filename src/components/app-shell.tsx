import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  Brain,
  ClipboardList,
  FlaskConical,
  Gauge,
  Home,
  Layers,
  LayoutDashboard,
  Leaf,
  LineChart,
  LogOut,
  Map,
  Menu,
  Radar,
  RefreshCcw,
  Satellite,
  ScanLine,
  Settings,
  ShieldCheck,
  Sparkles,
  Sprout,
  Users,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/session";
import { ROLE_LABEL } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

type NavItem = { to: string; label: string; icon: typeof Home };

const FARM_NAV: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/farm", label: "My Farm", icon: Sprout },
  { to: "/scanner", label: "Crop Scanner", icon: ScanLine },
  { to: "/forecast", label: "Risk Forecast", icon: LineChart },
  { to: "/pests", label: "Pest Monitoring", icon: Radar },
  { to: "/hotspots", label: "Hotspot Map", icon: Map },
  { to: "/simulator", label: "KrishiRisk Simulator", icon: Gauge },
  { to: "/assistant", label: "AI Assistant", icon: Bot },
  { to: "/advisory", label: "Smart Advisory", icon: ClipboardList },
  { to: "/followup", label: "Follow-up Monitoring", icon: RefreshCcw },
];

const OFFICIAL_NAV: NavItem[] = [
  { to: "/official", label: "Official Dashboard", icon: LayoutDashboard },
  { to: "/hotspots", label: "Hotspot Map", icon: Map },
  { to: "/outbreak", label: "Outbreak Intelligence", icon: Activity },
  { to: "/extension", label: "Extension Teams", icon: Users },
  { to: "/expert", label: "Expert Validation", icon: BadgeCheck },
  { to: "/analytics", label: "Analytics", icon: LineChart },
  { to: "/learning", label: "AI Learning Center", icon: Brain },
];

const EXPERT_NAV: NavItem[] = [
  { to: "/expert", label: "Expert Validation", icon: BadgeCheck },
  { to: "/lab", label: "Lab Referral", icon: FlaskConical },
  { to: "/scanner", label: "Crop Scanner", icon: ScanLine },
  { to: "/hotspots", label: "Hotspot Map", icon: Map },
  { to: "/learning", label: "AI Learning Center", icon: Brain },
  { to: "/advisory", label: "Smart Advisory", icon: ClipboardList },
];

const EXTENSION_NAV: NavItem[] = [
  { to: "/extension", label: "My Field Work", icon: Users },
  { to: "/hotspots", label: "Hotspot Map", icon: Map },
  { to: "/outbreak", label: "Outbreak Intelligence", icon: Activity },
  { to: "/scanner", label: "Crop Scanner", icon: ScanLine },
  { to: "/expert", label: "Expert Validation", icon: BadgeCheck },
  { to: "/advisory", label: "Smart Advisory", icon: ClipboardList },
];

const PLATFORM_NAV: NavItem[] = [
  { to: "/risk-engine", label: "AI Risk Engine", icon: Layers },
  { to: "/field-intelligence", label: "Field Intelligence", icon: Satellite },
  { to: "/lab", label: "Lab Referral", icon: FlaskConical },
  { to: "/learning", label: "AI Learning Center", icon: Brain },
  { to: "/architecture", label: "AI Architecture", icon: Sparkles },
];

const ACCOUNT_NAV: NavItem[] = [
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/profile", label: "Profile", icon: ShieldCheck },
  { to: "/settings", label: "Settings", icon: Settings },
];

function dedupe(items: NavItem[], seen: Set<string>) {
  return items.filter((i) => (seen.has(i.to) ? false : (seen.add(i.to), true)));
}

export function AppShell({ children }: { children: ReactNode }) {
  const { user, role, signOut, unread, demoMode, toggleDemoMode } = useSession();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  const primary =
    role === "official" ? OFFICIAL_NAV : role === "expert" ? EXPERT_NAV : role === "extension" ? EXTENSION_NAV : FARM_NAV;
  const seen = new Set<string>();
  const groups = [
    { label: role ? ROLE_LABEL[role] : "Workspace", items: dedupe(primary, seen) },
    { label: "Platform Intelligence", items: dedupe(PLATFORM_NAV, seen) },
    { label: "Account", items: dedupe(ACCOUNT_NAV, seen) },
  ];

  const nav = (
    <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-3 pb-6">
      {groups.map((group) => (
        <div key={group.label}>
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-sidebar-foreground/45">
            {group.label}
          </p>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active = pathname === item.to;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      active
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    )}
                  >
                    <item.icon className="size-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                    {item.to === "/notifications" && unread > 0 ? (
                      <span className="ml-auto rounded-full bg-risk-critical px-1.5 py-0.5 text-[10px] font-bold text-white">
                        {unread}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  const brand = (
    <Link to="/" className="flex items-center gap-2.5 px-5 py-5">
      <span className="grid size-9 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
        <Leaf className="size-5" />
      </span>
      <span>
        <span className="block text-sm font-bold text-sidebar-foreground">KrishiRakshak AI</span>
        <span className="block text-[10px] uppercase tracking-[0.14em] text-sidebar-foreground/50">
          Detect · Predict · Act
        </span>
      </span>
    </Link>
  );

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-sidebar lg:flex">
        {brand}
        {nav}
        <div className="border-t border-sidebar-border p-3">
          <button
            onClick={() => {
              signOut();
              navigate({ to: "/login" });
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <LogOut className="size-4" /> Sign out
          </button>
        </div>
      </aside>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-72 flex-col bg-sidebar">
            <div className="flex items-center justify-between">
              {brand}
              <button className="mr-4 text-sidebar-foreground/70" onClick={() => setOpen(false)}>
                <X className="size-5" />
              </button>
            </div>
            {nav}
          </div>
        </div>
      ) : null}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/85 px-4 py-3 backdrop-blur sm:px-6">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="size-5" />
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{user?.name ?? "Guest"}</p>
            <p className="truncate text-xs text-muted-foreground">{user?.title}</p>
          </div>
          <button
            onClick={toggleDemoMode}
            className={cn(
              "hidden items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors sm:inline-flex",
              demoMode
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-border text-muted-foreground",
            )}
          >
            <span className={cn("size-1.5 rounded-full", demoMode ? "bg-primary" : "bg-muted-foreground")} />
            Demo Mode {demoMode ? "on" : "off"}
          </button>
          <Link to="/notifications" className="relative rounded-lg border border-border p-2 hover:bg-muted">
            <Bell className="size-4" />
            {unread > 0 ? (
              <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-risk-critical text-[10px] font-bold text-white">
                {unread}
              </span>
            ) : null}
          </Link>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/scanner">
              <ScanLine className="size-4" /> Scan Crop
            </Link>
          </Button>
          <Link
            to="/profile"
            className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/12 text-xs font-bold text-primary"
          >
            {user?.avatar ?? "?"}
          </Link>
        </header>
        <main className="mx-auto w-full max-w-[1400px] space-y-6 px-4 py-6 sm:px-6 lg:py-8">{children}</main>
        <footer className="border-t border-border px-4 py-6 text-center text-xs text-muted-foreground sm:px-6">
          <BookOpen className="mr-1.5 inline size-3.5" />
          AI-generated results are preliminary and should not replace expert or laboratory diagnosis.
        </footer>
      </div>
    </div>
  );
}
