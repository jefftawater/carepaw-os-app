import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { HistoryList } from "@/components/HistoryList";
import { requireActiveDog } from "@/lib/auth/requireActiveDog";
import { getConditionUpdates } from "@/lib/conditionUpdates";
import {
  getDogConditionLabel,
  getDogConditionLabels,
} from "@/lib/dogConditions";

export default async function HistoryPage() {
  const dog = await requireActiveDog();
  const updates = await getConditionUpdates(dog.id);

  return (
    <AppShell title="History">
      <Card>
        <p className="text-sm leading-6 text-secondary">
          History shows saved updates and care actions, newest first. This page
          is read-only.
        </p>
      </Card>
      <HistoryList
        additionalConditionLabels={getDogConditionLabels(
          dog.additional_conditions ?? [],
        )}
        dogName={dog.name}
        mobilityNotes={dog.mobility_notes}
        primaryConditionLabel={getDogConditionLabel(dog.condition)}
        updates={updates}
      />
    </AppShell>
  );
}
