import { Card } from "@/components/Card";
import { HistoryEntryCard } from "@/components/HistoryEntryCard";
import { SectionLabel } from "@/components/SectionLabel";
import {
  getConditionSignalCategory,
  getConditionSignalLabel,
} from "@/lib/careFocus";
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
  additionalConditionLabels: string[];
  dogName: string;
  mobilityNotes: string | null;
  primaryConditionLabel: string;
  updates: ConditionUpdate[];
};

export function HistoryList({
  additionalConditionLabels,
  dogName,
  mobilityNotes,
  primaryConditionLabel,
  updates,
}: HistoryListProps) {
  const hasRealUpdates = updates.length > 0;

  return (
    <>
      <section className="flex flex-col gap-3">
        <h2 className="px-1 text-sm font-semibold uppercase tracking-wide text-muted">
          Saved entries
        </h2>

        {hasRealUpdates ? (
          updates.map((update) => (
            <HistoryEntryCard
              additionalConditionLabels={additionalConditionLabels}
              category={getConditionSignalCategory(update.signal)}
              createdAt={update.created_at}
              dogName={dogName}
              key={update.id}
              label={getConditionSignalLabel(update.signal)}
              mobilityNotes={mobilityNotes}
              note={update.note}
              primaryConditionLabel={primaryConditionLabel}
            />
          ))
        ) : (
          <Card>
            <p className="text-sm leading-6 text-secondary">
              No saved updates yet. Log today&apos;s update or save an action
              from a Care page to start building History.
            </p>
          </Card>
        )}
      </section>

      {!hasRealUpdates ? (
        <section className="mt-2 flex flex-col gap-3">
          <h2 className="px-1 text-sm font-semibold uppercase tracking-wide text-muted">
            Example history entries
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
              <div className="mt-4 rounded-xl border border-soft-border bg-soft p-3">
                <SectionLabel>Example insight</SectionLabel>
                <p className="mt-2 text-sm leading-6 text-secondary">
                  {day.insight}
                </p>
              </div>
            </Card>
          ))}
        </section>
      ) : null}
    </>
  );
}
