import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { SectionLabel } from "@/components/SectionLabel";
import { requireUser } from "@/lib/auth/requireUser";

export default async function MentalStimulationPage() {
  await requireUser();

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

      <div className="grid grid-cols-1 gap-3">
        <Button variant="secondary">Yes, this helped</Button>
        <Button variant="secondary">Not really</Button>
      </div>
    </AppShell>
  );
}
