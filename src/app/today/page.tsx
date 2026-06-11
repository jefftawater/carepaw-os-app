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
      <Card>
        <p className="text-sm leading-6 text-secondary">
          Today combines your dog&apos;s profile and latest saved update to
          suggest what to pay attention to next.
        </p>
      </Card>

      <TodayFocus
        additionalConditions={dog.additional_conditions ?? []}
        dogCondition={dog.condition}
        dogName={dog.name}
        latestUpdate={latestUpdate}
      />

      <Card>
        <h2 className="text-base font-semibold leading-6 text-foreground">
          Notice something different today?
        </h2>
        <p className="mt-2 text-sm leading-6 text-secondary">
          Use this when something feels different, better, worse, or worth
          remembering. Your update is saved to History and may adjust
          today&apos;s focus.
        </p>
        <div className="mt-4">
          <Button href="/update-condition">Log today&apos;s update</Button>
        </div>
      </Card>
    </AppShell>
  );
}
