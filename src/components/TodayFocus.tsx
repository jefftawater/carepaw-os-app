"use client";

import { Card } from "@/components/Card";
import { SectionLabel } from "@/components/SectionLabel";
import { useLatestCareUpdate } from "@/hooks/useLatestCareUpdate";
import {
  defaultFocus,
  getFocusForSignal,
} from "@/lib/careUpdates";

export function TodayFocus() {
  const latestUpdate = useLatestCareUpdate();
  const focus = latestUpdate
    ? getFocusForSignal(latestUpdate.signal)
    : defaultFocus;

  return (
    <Card>
      <SectionLabel>{focus.label}</SectionLabel>
      <p className="mt-3 text-lg font-semibold leading-7 text-foreground">
        {focus.title}
      </p>
      {latestUpdate ? (
        <p className="mt-3 text-sm leading-6 text-muted">
          Latest update: {latestUpdate.signal}
        </p>
      ) : null}
      <ul className="mt-4 space-y-3 text-sm leading-6 text-secondary">
        {focus.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <p className="mt-5 rounded-xl bg-background p-3 text-sm leading-6 text-secondary">
        {focus.reassurance}
      </p>
    </Card>
  );
}
