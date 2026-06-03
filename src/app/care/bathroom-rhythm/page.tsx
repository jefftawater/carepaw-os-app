import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { SectionLabel } from "@/components/SectionLabel";
import { requireUser } from "@/lib/auth/requireUser";

export default async function BathroomRhythmPage() {
  await requireUser();

  return (
    <AppShell title="Bathroom Rhythm">
      <Card>
        <p className="text-lg font-semibold leading-7 text-foreground">
          Bathroom issues usually become easier when the timing gets more
          predictable.
        </p>
      </Card>

      <Card>
        <SectionLabel>What to do today</SectionLabel>
        <ul className="mt-3 space-y-3 text-sm leading-6 text-secondary">
          <li>Watch after meds, meals, water, and rest</li>
          <li>Shorten the next interval if accidents increased</li>
          <li>Give enough time and support positioning</li>
          <li>Look for patterns instead of guessing</li>
        </ul>
      </Card>

      <Card>
        <SectionLabel>What to avoid</SectionLabel>
        <ul className="mt-3 space-y-3 text-sm leading-6 text-secondary">
          <li>Waiting for obvious signals</li>
          <li>Rushing bathroom attempts</li>
          <li>Assuming yesterday&apos;s timing still works</li>
        </ul>
      </Card>
    </AppShell>
  );
}
