import { Card } from "@/components/Card";
import { SectionLabel } from "@/components/SectionLabel";
import { getFocusForSignal } from "@/lib/careFocus";
import { ConditionUpdate } from "@/lib/conditionUpdates";

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

type HistoryListProps = {
  updates: ConditionUpdate[];
};

function formatSavedDateTime(createdAt: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    month: "short",
  }).format(new Date(createdAt));
}

export function HistoryList({ updates }: HistoryListProps) {
  return (
    <>
      <section className="flex flex-col gap-3">
        <h2 className="px-1 text-sm font-semibold uppercase tracking-wide text-muted">
          Today
        </h2>

        {updates.length > 0 ? (
          updates.map((update) => (
            <Card key={update.id}>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                {formatSavedDateTime(update.created_at)}
              </p>
              <h3 className="mt-2 text-base font-semibold leading-6 text-foreground">
                {update.signal}
              </h3>
              {update.note ? (
                <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-secondary">
                  {update.note}
                </p>
              ) : null}
              <div className="mt-4 rounded-xl bg-background p-3">
                <SectionLabel>Insight</SectionLabel>
                <p className="mt-2 text-sm leading-6 text-secondary">
                  {getFocusForSignal(update.signal).label}
                </p>
              </div>
            </Card>
          ))
        ) : (
          <Card>
            <p className="text-sm leading-6 text-secondary">
              No real updates logged yet. Once you save a condition update, it
              will appear here.
            </p>
          </Card>
        )}
      </section>

      <section className="mt-2 flex flex-col gap-3">
        <h2 className="px-1 text-sm font-semibold uppercase tracking-wide text-muted">
          Sample recent days
        </h2>
        {sampleDays.map((day) => (
          <Card key={day.date}>
            <h3 className="text-base font-semibold leading-6 text-foreground">
              {day.date}
            </h3>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-secondary">
              {day.items.map((item) => (
                <li className="break-words" key={item}>
                  {item}
                </li>
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
      </section>
    </>
  );
}
