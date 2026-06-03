import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { TodayFocus } from "@/components/TodayFocus";
import { requireActiveDog } from "@/lib/auth/requireActiveDog";
import { getLatestConditionUpdate } from "@/lib/conditionUpdates";

export default async function TodayPage() {
  const dog = await requireActiveDog();
  const latestUpdate = await getLatestConditionUpdate(dog.id);

  return (
    <AppShell title={`${dog.name} - Today`}>
      <TodayFocus
        additionalConditions={dog.additional_conditions ?? []}
        dogCondition={dog.condition}
        dogName={dog.name}
        latestUpdate={latestUpdate}
      />

      <Card>
        <label
          className="text-base font-semibold leading-6 text-foreground"
          htmlFor="today-note"
        >
          What felt different today?
        </label>
        <textarea
          className="mt-3 min-h-28 w-full resize-none rounded-xl border border-border bg-background p-3 text-sm leading-6 text-foreground outline-none placeholder:text-muted focus:border-primary"
          id="today-note"
          placeholder="Add a quick note..."
        />
      </Card>

      <div className="grid grid-cols-1 gap-3">
        <Button>Yes, this helped</Button>
        <Button variant="secondary">Not really</Button>
      </div>
    </AppShell>
  );
}
