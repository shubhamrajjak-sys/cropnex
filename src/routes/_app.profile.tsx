import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader, SectionCard, StatCard } from "@/components/ui-kit";
import { FARM, ROLE_LABEL } from "@/lib/demo-data";
import { useSession } from "@/lib/session";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({
    meta: [
      { title: "Profile — KrishiRakshak AI" },
      { name: "description", content: "Account, farm registration and role details for the KrishiRakshak AI workspace." },
      { property: "og:title", content: "Profile — KrishiRakshak AI" },
      { property: "og:description", content: "Your account and farm registration details." },
    ],
  }),
  component: Profile,
});

function Profile() {
  const { user, role, signOut } = useSession();
  const navigate = useNavigate();

  return (
    <>
      <PageHeader eyebrow="Account" title="Profile" description={user?.location ?? ""} />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <SectionCard>
          <div className="flex items-center gap-4">
            <span className="grid size-16 place-items-center rounded-2xl bg-primary/12 text-xl font-bold text-primary">
              {user?.avatar}
            </span>
            <div>
              <p className="text-lg font-bold">{user?.name}</p>
              <p className="text-sm text-muted-foreground">{role ? ROLE_LABEL[role] : ""}</p>
              <p className="text-xs text-muted-foreground">{user?.title}</p>
            </div>
          </div>
          <div className="mt-6 grid gap-3">
            <StatCard label="Farmer ID" value="KR-1042" />
            <StatCard label="Registered since" value="Jan 2025" />
            <StatCard label="Scans submitted" value="38" />
          </div>
          <Button
            variant="outline"
            className="mt-6 w-full"
            onClick={() => {
              signOut();
              navigate({ to: "/login" });
            }}
          >
            <LogOut className="size-4" /> Sign out
          </Button>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard title="Personal details">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Full name", user?.name ?? ""],
                ["Mobile", "98•••••432"],
                ["Village", FARM.village],
                ["District", FARM.district],
                ["State", FARM.state],
                ["Preferred language", "हिन्दी"],
              ].map(([k, v]) => (
                <div key={k}>
                  <Label className="text-xs">{k}</Label>
                  <Input className="mt-1" defaultValue={v} />
                </div>
              ))}
            </div>
            <Button className="mt-4">Save changes</Button>
          </SectionCard>

          <SectionCard title="Farm registration">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Farm name", FARM.name],
                ["Total area", FARM.area],
                ["Soil type", FARM.soil],
                ["Irrigation", FARM.irrigation],
                ["Primary crop", FARM.crop],
                ["Coordinates", FARM.coords],
              ].map(([k, v]) => (
                <div key={k}>
                  <Label className="text-xs">{k}</Label>
                  <Input className="mt-1" defaultValue={v} />
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-4">
              Update farm record
            </Button>
          </SectionCard>
        </div>
      </div>
    </>
  );
}
