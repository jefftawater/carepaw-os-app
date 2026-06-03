import { AppShell } from "@/components/AppShell";
import { HistoryList } from "@/components/HistoryList";
import { requireActiveDog } from "@/lib/auth/requireActiveDog";

export default async function HistoryPage() {
  await requireActiveDog();

  return (
    <AppShell title="History">
      <HistoryList />
    </AppShell>
  );
}
