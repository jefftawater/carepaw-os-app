import { AppShell } from "@/components/AppShell";
import { HistoryList } from "@/components/HistoryList";
import { requireActiveDog } from "@/lib/auth/requireActiveDog";
import { getConditionUpdates } from "@/lib/conditionUpdates";

export default async function HistoryPage() {
  const dog = await requireActiveDog();
  const updates = await getConditionUpdates(dog.id);

  return (
    <AppShell title="History">
      <HistoryList updates={updates} />
    </AppShell>
  );
}
