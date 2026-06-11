import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { HistoryList } from "@/components/HistoryList";
import { requireActiveDog } from "@/lib/auth/requireActiveDog";
import { getConditionUpdates } from "@/lib/conditionUpdates";

export default async function HistoryPage() {
  const dog = await requireActiveDog();
  const updates = await getConditionUpdates(dog.id);

  return (
    <AppShell title="History">
      <Card>
        <p className="text-sm leading-6 text-secondary">
          History shows your saved updates and care actions, newest first, so
          you can notice patterns over time.
        </p>
      </Card>
      <HistoryList updates={updates} />
    </AppShell>
  );
}
