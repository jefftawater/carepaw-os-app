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
        <h2 className="text-base font-semibold leading-6 text-foreground">
          Notice something different today?
        </h2>
        <p className="mt-2 text-sm leading-6 text-secondary">
          Log a quick update so CarePaw can adjust today&apos;s focus and keep
          the change in History.
        </p>
        <div className="mt-4">
          <Button href="/update-condition">Log today&apos;s update</Button>
        </div>
      </Card>
    </AppShell>
  );
}
