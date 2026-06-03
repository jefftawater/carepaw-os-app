import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/Button";
import { CareDisclaimer } from "@/components/CareDisclaimer";
import { Card } from "@/components/Card";
import { FeedbackLink } from "@/components/FeedbackLink";
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
            className="text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
            href="/profile/edit"
          >
            Edit profile
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
        <p className="mt-3 text-sm leading-6 text-secondary">
          Record today&apos;s condition signal for Today Focus and History.
        </p>
        <div className="mt-3">
          <Button href="/update-condition">{"Log today's update"}</Button>
        </div>
      </Card>

      <Card>
        <SectionLabel>Account</SectionLabel>
        <div className="mt-3">
          <FeedbackLink />
        </div>
        <LogoutButton />
      </Card>

      <CareDisclaimer />
    </AppShell>
  );
}
