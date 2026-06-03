import { AppShell } from "@/components/AppShell";
import { CareLogActions } from "@/components/CareLogActions";
import { Card } from "@/components/Card";
import { SectionLabel } from "@/components/SectionLabel";
import { requireActiveDog } from "@/lib/auth/requireActiveDog";

export default async function MentalStimulationPage() {
  const dog = await requireActiveDog();
  const dogName = dog.name?.trim() || "them";

  return (
    <AppShell title="Mental Stimulation">
      <Card>
        <SectionLabel>Right now</SectionLabel>
        <ul className="mt-3 space-y-3 text-sm leading-6 text-secondary">
          <li>Restless when you&apos;re home</li>
          <li>Seeking attention or proximity</li>
          <li>Barking when separated</li>
        </ul>
      </Card>

      <Card>
        <SectionLabel>Try this</SectionLabel>
        <ul className="mt-3 space-y-3 text-sm leading-6 text-secondary">
          <li>Food scatter on blanket (5-10 min)</li>
          <li>Slow treat search (low movement)</li>
          <li>&quot;Place&quot; with light interaction</li>
          <li>Sit nearby without engaging play</li>
        </ul>
      </Card>

      <Card>
        <SectionLabel>If restlessness increases</SectionLabel>
        <ul className="mt-3 space-y-3 text-sm leading-6 text-secondary">
          <li>Avoid increasing excitement</li>
          <li>Lower stimulation</li>
          <li>Return to simple, calm activity</li>
          <li>Prioritize rhythm over variety</li>
        </ul>
      </Card>

      <Card>
        <p className="text-sm leading-6 text-secondary">
          You&apos;re not doing it wrong. This is energy without an outlet -
          calm structure helps more than stimulation.
        </p>
      </Card>
      <CareLogActions
        dogId={dog.id}
        options={[
          {
            key: "mental_stimulation_helped",
            label: `Helped ${dogName} settle`,
            note: `Mental stimulation helped ${dogName} settle.`,
          },
          { key: "still_restless", label: "Still restless" },
        ]}
        title="Did this help?"
      />
    </AppShell>
  );
}
