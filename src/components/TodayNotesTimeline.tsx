"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/Card";
import {
  getConditionSignalCategory,
  getConditionSignalLabel,
} from "@/lib/careFocus";
import { ConditionUpdate } from "@/lib/conditionUpdates";

type TodayNotesTimelineProps = {
  updates: ConditionUpdate[];
};

export function TodayNotesTimeline({ updates }: TodayNotesTimelineProps) {
  const noteUpdates = useMemo(
    () =>
      [...updates]
        .filter((update) => update.note.trim().length > 0)
        .sort(
          (first, second) =>
            new Date(first.created_at).getTime() -
            new Date(second.created_at).getTime(),
        ),
    [updates],
  );

  return (
    <Card>
      <h2 className="text-base font-semibold leading-6 text-foreground">
        Today&apos;s notes
      </h2>
      <p className="mt-2 text-sm leading-6 text-secondary">
        Add anything you remembered or noticed later. Each saved update stays in
        today&apos;s list.
      </p>

      {noteUpdates.length > 0 ? (
        <ol className="mt-4 space-y-3">
          {noteUpdates.map((update) => (
            <TodayNotesTimelineItem key={update.id} update={update} />
          ))}
        </ol>
      ) : (
        <p className="mt-4 rounded-xl border border-soft-border bg-soft p-3 text-sm leading-6 text-muted">
          No notes saved yet today.
        </p>
      )}
    </Card>
  );
}

function TodayNotesTimelineItem({ update }: { update: ConditionUpdate }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setTime(
        new Intl.DateTimeFormat(undefined, {
          hour: "numeric",
          minute: "2-digit",
        }).format(new Date(update.created_at)),
      );
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [update.created_at]);

  return (
    <li className="rounded-xl border border-soft-border bg-soft p-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="text-sm font-semibold leading-5 text-foreground">
            {getConditionSignalLabel(update.signal)}
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted">
            {getConditionSignalCategory(update.signal)}
          </p>
        </div>
        <time className="text-xs font-medium text-muted">
          {time || "Saved today"}
        </time>
      </div>
      <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-secondary">
        {update.note}
      </p>
    </li>
  );
}
