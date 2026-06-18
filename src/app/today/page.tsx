import { AppShell } from "@/components/AppShell";
import { AddTodayNoteForm } from "@/components/AddTodayNoteForm";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { TodayFocus } from "@/components/TodayFocus";
import { TodayNotesTimeline } from "@/components/TodayNotesTimeline";
import { TodayTimestamp } from "@/components/TodayTimestamp";
import { requireActiveDog } from "@/lib/auth/requireActiveDog";
import { selectTodayFocusUpdate } from "@/lib/careFocus";
import {
  getLatestFocusConditionUpdate,
  getTodayConditionUpdates,
} from "@/lib/conditionUpdates";

export default async function TodayPage() {
  const dog = await requireActiveDog();
  const todayUpdates = await getTodayConditionUpdates(dog.id);
  const selectedTodayUpdate = selectTodayFocusUpdate(todayUpdates);
  const focusUpdate =
    selectedTodayUpdate ?? (await getLatestFocusConditionUpdate(dog.id));
  const focusSource = selectedTodayUpdate
    ? "today"
    : focusUpdate
      ? "recent"
      : "default";

  return (
    <AppShell title={`${dog.name} - Today`}>
      <TodayTimestamp />

      <Card>
        <p className="text-sm leading-6 text-secondary">
          Today combines your dog&apos;s profile and saved updates to suggest
          what to pay attention to next.
        </p>
        <p className="mt-2 text-sm leading-6 text-muted">
          Based on today&apos;s saved updates. If nothing has been logged
          today, CarePaw uses the most recent saved update.
        </p>
      </Card>

      <AddTodayNoteForm dogId={dog.id} />

      <TodayNotesTimeline updates={todayUpdates} />

      <TodayFocus
        additionalConditions={dog.additional_conditions ?? []}
        dogCondition={dog.condition}
        dogName={dog.name}
        focusSource={focusSource}
        focusUpdate={focusUpdate}
      />

      <Card>
        <h2 className="text-base font-semibold leading-6 text-foreground">
          Add an update
        </h2>
        <p className="mt-2 text-sm leading-6 text-secondary">
          Use this anytime something feels different, better, worse, or worth
          remembering today. New updates are added to today&apos;s notes without
          replacing earlier ones.
        </p>
        <div className="mt-4">
          <Button href="/update-condition">Add today&apos;s update</Button>
        </div>
      </Card>
    </AppShell>
  );
}
