import { AppShell } from "@/components/AppShell";
import { HistoryList } from "@/components/HistoryList";

export default function HistoryPage() {
  return (
    <AppShell title="History">
      <HistoryList />
    </AppShell>
  );
}
