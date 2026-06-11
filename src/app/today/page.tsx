import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { TodayFocus } from "@/components/TodayFocus";
import { requireActiveDog } from "@/lib/auth/requireActiveDog";
import { selectTodayFocusUpdate } from "@/lib/careFocus";
import {
  getLatestConditionUpdate,
  getTodayConditionUpdates,
} from "@/lib/conditionUpdates";

export default async function TodayPage() {
  const dog = await requireActiveDog();
  const todayUpdates = await getTodayConditionUpdates(dog.id);
  const selectedTodayUpdate = selectTodayFocusUpdate(todayUpdates);
  const focusUpdate =
    selectedTodayUpdate ?? (await getLatestConditionUpdate(dog.id));
  const focusSource = selectedTodayUpdate
    ? "today"
    : focusUpdate
      ? "recent"
      : "default";

  return (
    <AppShell title={`${dog.name} - Today`}>
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

      <TodayFocus
        additionalConditions={dog.additional_conditions ?? []}
        dogCondition={dog.condition}
        dogName={dog.name}
        focusSource={focusSource}
        focusUpdate={focusUpdate}
      />

      <Card>
        <h2 className="text-base font-semibold leading-6 text-foreground">
          Notice something different today?
        </h2>
        <p className="mt-2 text-sm leading-6 text-secondary">
          Use this when something feels different, better, worse, or worth
          remembering today. Your update is saved to History and may adjust
          today&apos;s focus.
        </p>
        <div className="mt-4">
          <Button href="/update-condition">Log today&apos;s update</Button>
        </div>
      </Card>
    </AppShell>
  );
}
