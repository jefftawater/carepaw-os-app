import { Card } from "@/components/Card";
import { SectionLabel } from "@/components/SectionLabel";
import {
  defaultFocus,
  getConditionSignalLabel,
  getFocusForSignal,
} from "@/lib/careFocus";
import { ConditionUpdate } from "@/lib/conditionUpdates";
import { getConditionAttentionNote } from "@/lib/dogConditions";

type TodayFocusProps = {
  additionalConditions: string[];
  dogCondition: string | null;
  dogName: string;
  focusSource: "default" | "recent" | "today";
  focusUpdate: ConditionUpdate | null;
};

export function TodayFocus({
  additionalConditions,
  dogCondition,
  dogName,
  focusSource,
  focusUpdate,
}: TodayFocusProps) {
  const focus = focusUpdate
    ? getFocusForSignal(focusUpdate.signal)
    : defaultFocus;
  const attentionNote = getConditionAttentionNote(
    dogCondition,
    dogName,
    additionalConditions,
  );

  return (
    <Card>
      <SectionLabel>{focus.label}</SectionLabel>
      <p className="mt-2 text-sm leading-6 text-muted">
        A practical caregiving focus, not a diagnosis.
      </p>
      <p className="mt-3 text-lg font-semibold leading-7 text-foreground">
        {focus.title}
      </p>
      {focusUpdate ? (
        <p className="mt-3 text-sm leading-6 text-muted">
          {focusSource === "today"
            ? "Using today's highest-priority update"
            : "Using most recent saved update"}
          : {getConditionSignalLabel(focusUpdate.signal)}
        </p>
      ) : (
        <p className="mt-3 text-sm leading-6 text-muted">
          No condition update logged yet. Starting with a steady routine focus.
        </p>
      )}
      <ul className="mt-4 space-y-3 text-sm leading-6 text-secondary">
        {focus.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <p className="mt-5 rounded-xl border border-soft-border bg-soft p-3 text-sm leading-6 text-secondary">
        {focus.reassurance}
      </p>
      {attentionNote ? (
        <div className="mt-4 rounded-xl border border-border bg-background p-3">
          <SectionLabel>Extra attention today</SectionLabel>
          <p className="mt-2 text-sm leading-6 text-muted">
            Based on your dog&apos;s profile.
          </p>
          <p className="mt-2 text-sm leading-6 text-secondary">
            {attentionNote}
          </p>
        </div>
      ) : null}
    </Card>
  );
}
