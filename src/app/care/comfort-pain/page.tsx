import { AppShell } from "@/components/AppShell";
import { CareLogActions } from "@/components/CareLogActions";
import { Card } from "@/components/Card";
import { SectionLabel } from "@/components/SectionLabel";
import { requireActiveDog } from "@/lib/auth/requireActiveDog";

export default async function ComfortPainPage() {
  const dog = await requireActiveDog();

  return (
    <AppShell title="Comfort + Pain Cues">
      <Card>
        <p className="text-lg font-semibold leading-7 text-foreground">
          Comfort changes often show up before pain is obvious. Watch patterns,
          not just single moments.
        </p>
      </Card>

      <Card>
        <SectionLabel>What to watch</SectionLabel>
        <ul className="mt-3 space-y-3 text-sm leading-6 text-secondary">
          <li>Hesitation before moving</li>
          <li>Guarding one area</li>
          <li>Vocalizing during transitions</li>
          <li>Restlessness that does not settle</li>
          <li>Changes in appetite or interest</li>
        </ul>
      </Card>

      <Card>
        <SectionLabel>What to do today</SectionLabel>
        <ul className="mt-3 space-y-3 text-sm leading-6 text-secondary">
          <li>Slow transitions</li>
          <li>Support before struggle starts</li>
          <li>Keep activity short and controlled</li>
          <li>Adjust bedding or positioning</li>
          <li>Note repeated patterns</li>
        </ul>
      </Card>

      <Card>
        <SectionLabel>What to avoid</SectionLabel>
        <ul className="mt-3 space-y-3 text-sm leading-6 text-secondary">
          <li>Pushing through visible discomfort</li>
          <li>Assuming one good moment means the whole day is good</li>
          <li>Waiting until signs are severe</li>
        </ul>
      </Card>

      <CareLogActions
        dogId={dog.id}
        options={[
          { key: "comfort_stable", label: "Comfort looked stable" },
          { key: "more_uncomfortable", label: "More uncomfortable today" },
        ]}
        title="Log comfort cues"
      />
    </AppShell>
  );
}
