import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { LogoutButton } from "@/components/LogoutButton";
import { SectionLabel } from "@/components/SectionLabel";
import { requireActiveDog } from "@/lib/auth/requireActiveDog";

export default async function ProfilePage() {
  const dog = await requireActiveDog();

  return (
    <AppShell title={`${dog.name} - Profile`}>
      <Card>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold leading-7 text-foreground">
              {dog.name}
            </h2>
            <p className="mt-2 text-sm leading-6 text-secondary">
              {dog.condition || "Not added yet"}
            </p>
            <p className="text-sm leading-6 text-secondary">
              {dog.mobility_notes || "Not added yet"}
            </p>
          </div>
          <Link
            className="text-sm font-semibold text-foreground"
            href="/profile/edit"
          >
            Edit
          </Link>
        </div>
      </Card>

      <Card>
        <SectionLabel>Current Focus</SectionLabel>
        <ul className="mt-3 space-y-3 text-sm leading-6 text-secondary">
          <li>Stay in medication + bathroom rhythm</li>
          <li>Watch for movement fatigue</li>
        </ul>
      </Card>

      <Card>
        <SectionLabel>Adjust care</SectionLabel>
        <div className="mt-3">
          <Button href="/update-condition">Update how {dog.name} is doing</Button>
        </div>
        <Link
          className="mt-4 block text-center text-sm font-semibold text-secondary"
          href="/update-condition"
        >
          Update condition details
        </Link>
      </Card>

      <Card>
        <SectionLabel>Account</SectionLabel>
        <LogoutButton />
      </Card>
    </AppShell>
  );
}
