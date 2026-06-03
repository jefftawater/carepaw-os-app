import { AppShell } from "@/components/AppShell";
import { CareLogActions } from "@/components/CareLogActions";
import { Card } from "@/components/Card";
import { SectionLabel } from "@/components/SectionLabel";
import { requireActiveDog } from "@/lib/auth/requireActiveDog";

export default async function RoutineRemindersPage() {
  const dog = await requireActiveDog();

  return (
    <AppShell title="Routine Reminders">
      <Card>
        <p className="text-lg font-semibold leading-7 text-foreground">
          Routine care keeps the day from becoming reactive. Small repeated
          tasks reduce surprises.
        </p>
      </Card>

      <Card>
        <SectionLabel>What to watch</SectionLabel>
        <ul className="mt-3 space-y-3 text-sm leading-6 text-secondary">
          <li>Missed meds or delayed care tasks</li>
          <li>Supplies running low</li>
          <li>Nail, ear, coat, or bedding needs</li>
          <li>Changes in bathroom or rest rhythm</li>
        </ul>
      </Card>

      <Card>
        <SectionLabel>What to do today</SectionLabel>
        <ul className="mt-3 space-y-3 text-sm leading-6 text-secondary">
          <li>Check the next medication or care timing</li>
          <li>Review supplies</li>
          <li>Notice one small care task that is easy to miss</li>
          <li>Keep the routine simple</li>
          <li>Do not add unnecessary complexity</li>
        </ul>
      </Card>

      <Card>
        <SectionLabel>What to avoid</SectionLabel>
        <ul className="mt-3 space-y-3 text-sm leading-6 text-secondary">
          <li>Trying to catch up on everything at once</li>
          <li>Ignoring recurring small tasks</li>
          <li>Waiting until supplies are urgent</li>
        </ul>
      </Card>

      <CareLogActions
        dogId={dog.id}
        options={[
          { key: "routine_completed", label: "Routine completed" },
          { key: "routine_missed", label: "Routine got missed" },
        ]}
        title="Log routine care"
      />
    </AppShell>
  );
}
