"use client";

import { Card } from "@/components/Card";
import { SectionLabel } from "@/components/SectionLabel";
import { useCareUpdates } from "@/hooks/useLatestCareUpdate";
import { getFocusForSignal } from "@/lib/careUpdates";

const sampleDays = [
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

function formatSavedDate(createdAt: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    month: "short",
  }).format(new Date(createdAt));
}

export function HistoryList() {
  const savedUpdates = useCareUpdates();

  return (
    <>
      {savedUpdates.map((update, index) => (
        <Card key={update.id}>
          <h2 className="text-base font-semibold leading-6 text-foreground">
            {index === 0 ? "Latest" : "Saved"} /{" "}
            {formatSavedDate(update.createdAt)}
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-secondary">
            <li>{update.signal}</li>
            {update.note ? <li>{update.note}</li> : null}
          </ul>
          <div className="mt-4 rounded-xl bg-background p-3">
            <SectionLabel>Insight</SectionLabel>
            <p className="mt-2 text-sm leading-6 text-secondary">
              {getFocusForSignal(update.signal).label}
            </p>
          </div>
        </Card>
      ))}

      {sampleDays.map((day) => (
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
    </>
  );
}
