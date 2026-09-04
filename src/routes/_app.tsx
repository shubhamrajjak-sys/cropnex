import { Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppShell } from "@/components/app-shell";
import { useSession } from "@/lib/session";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  const { role } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!window.localStorage.getItem("krishirakshak.role")) {
        navigate({ to: "/login" });
      }
    }, 60);
    return () => window.clearTimeout(timer);
  }, [role, navigate]);

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
