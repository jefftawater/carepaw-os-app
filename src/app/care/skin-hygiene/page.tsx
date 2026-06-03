import { AppShell } from "@/components/AppShell";
import { CareLogActions } from "@/components/CareLogActions";
import { Card } from "@/components/Card";
import { SectionLabel } from "@/components/SectionLabel";
import { requireActiveDog } from "@/lib/auth/requireActiveDog";

export default async function SkinHygienePage() {
  const dog = await requireActiveDog();

  return (
    <AppShell title="Skin + Hygiene">
      <Card>
        <p className="text-lg font-semibold leading-7 text-foreground">
          Small skin changes can become bigger quickly when mobility is limited.
          A quick check helps prevent problems.
        </p>
      </Card>

      <Card>
        <SectionLabel>What to watch</SectionLabel>
        <ul className="mt-3 space-y-3 text-sm leading-6 text-secondary">
          <li>Redness</li>
          <li>Warm spots</li>
          <li>Moisture</li>
          <li>Pressure areas</li>
          <li>Paw or bedding irritation</li>
        </ul>
      </Card>

      <Card>
        <SectionLabel>What to do today</SectionLabel>
        <ul className="mt-3 space-y-3 text-sm leading-6 text-secondary">
          <li>Check pressure points</li>
          <li>Keep bedding dry and smooth</li>
          <li>Look under collars, wraps, or support areas</li>
          <li>Clean gently if needed</li>
          <li>Track any spot that changes</li>
        </ul>
      </Card>

      <Card>
        <SectionLabel>What to avoid</SectionLabel>
        <ul className="mt-3 space-y-3 text-sm leading-6 text-secondary">
          <li>Leaving damp bedding in place</li>
          <li>Ignoring small red areas</li>
          <li>Scrubbing irritated skin</li>
        </ul>
      </Card>

      <CareLogActions
        dogId={dog.id}
        options={[
          { key: "skin_checked_clear", label: "Skin check looked clear" },
          { key: "skin_concern", label: "Skin concern noticed" },
        ]}
        title="Log skin check"
      />
    </AppShell>
  );
}
