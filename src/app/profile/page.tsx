import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { CareDisclaimer } from "@/components/CareDisclaimer";
import { Card } from "@/components/Card";
import { FeedbackLink } from "@/components/FeedbackLink";
import { LogoutButton } from "@/components/LogoutButton";
import { SectionLabel } from "@/components/SectionLabel";
import { requireActiveDog } from "@/lib/auth/requireActiveDog";
import {
  getDogConditionLabel,
  getDogConditionLabels,
} from "@/lib/dogConditions";

export default async function ProfilePage() {
  const dog = await requireActiveDog();
  const additionalConditionLabels = getDogConditionLabels(
    dog.additional_conditions ?? [],
  );

  return (
    <AppShell title="Dog profile">
      <Card>
        <p className="text-sm leading-6 text-secondary">
          These details help CarePaw personalize Today guidance. Keep them
          updated when your dog&apos;s condition, mobility, or care needs
          change.
        </p>
        <p className="mt-2 text-sm leading-6 text-muted">
          Daily updates are logged from the Today tab. This page is for your
          dog&apos;s longer-term care context.
        </p>
      </Card>

      <Card>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold leading-7 text-foreground">
              {dog.name}
            </h2>
            <div className="mt-2 space-y-2 text-sm leading-6 text-secondary">
              <p>
                <span className="font-semibold text-foreground">
                  Primary condition:
                </span>{" "}
                {getDogConditionLabel(dog.condition)}
              </p>
              <p>
                <span className="font-semibold text-foreground">
                  Additional conditions:
                </span>{" "}
                {additionalConditionLabels.length > 0
                  ? additionalConditionLabels.join(", ")
                  : "None added."}
              </p>
            </div>
            <p className="text-sm leading-6 text-secondary">
              {dog.mobility_notes || "Not added yet"}
            </p>
          </div>
          <Link
            className="text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
            href="/profile/edit"
          >
            Edit profile details
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
