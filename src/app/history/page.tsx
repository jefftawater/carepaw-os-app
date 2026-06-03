import { AppShell } from "@/components/AppShell";
import { HistoryList } from "@/components/HistoryList";
import { requireUser } from "@/lib/auth/requireUser";

export default async function HistoryPage() {
  await requireUser();

  return (
    <AppShell title="History">
      <HistoryList />
    </AppShell>
  );
}
