import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { SectionLabel } from "@/components/SectionLabel";

const days = [
  {
    date: "Yesterday / Apr 28",
    items: ["More restless", "Slight discomfort", "Bathroom changes"],
    insight: "Likely higher discomfort - focus shifted to calm activity",
  },
  {
    date: "2 days ago / Apr 27",
    items: ["About the same"],
    insight: "Stable day - stayed with routine rhythm",
  },
  {
    date: "3 days ago / Apr 26",
    items: ["Bathroom changes"],
    insight: "Bathroom rhythm became the next focus",
  },
];

export default function HistoryPage() {
  return (
    <AppShell title="History">
      {days.map((day) => (
        <Card key={day.date}>
          <h2 className="text-base font-semibold leading-6 text-foreground">
            {day.date}
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-secondary">
            {day.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="mt-4 rounded-xl bg-background p-3">
            <SectionLabel>Insight</SectionLabel>
            <p className="mt-2 text-sm leading-6 text-secondary">
              {day.insight}
            </p>
          </div>
        </Card>
      ))}
    </AppShell>
  );
}
