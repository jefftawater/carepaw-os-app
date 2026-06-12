"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { buildHistoryEntryCopyText, formatHistoryTimestamp } from "@/lib/history";

type HistoryEntryCardProps = {
  additionalConditionLabels: string[];
  category: string;
  createdAt: string;
  dogName: string;
  label: string;
  mobilityNotes: string | null;
  note: string;
  primaryConditionLabel: string;
};

export function HistoryEntryCard({
  additionalConditionLabels,
  category,
  createdAt,
  dogName,
  label,
  mobilityNotes,
  note,
  primaryConditionLabel,
}: HistoryEntryCardProps) {
  const [friendlyDateTime, setFriendlyDateTime] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"copied" | "error" | "idle">(
    "idle",
  );
  const hasNote = note.trim().length > 0;
  const trimmedMobilityNotes = mobilityNotes?.trim();

  useEffect(() => {
    const timeoutId = window.setTimeout(
      () => setFriendlyDateTime(formatHistoryTimestamp(createdAt)),
      0,
    );

    return () => window.clearTimeout(timeoutId);
  }, [createdAt]);

  async function handleCopy() {
    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard API unavailable");
      }

      await navigator.clipboard.writeText(
        buildHistoryEntryCopyText({
          additionalConditionLabels,
          category,
          dogName,
          friendlyDateTime: friendlyDateTime || formatHistoryTimestamp(createdAt),
          label,
          mobilityNotes,
          note,
          primaryConditionLabel,
        }),
      );
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  }

  return (
    <Card>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
        {category}
      </p>
      <h3 className="mt-2 text-base font-semibold leading-6 text-foreground">
        {label}
      </h3>
      <p className="mt-1 text-sm leading-6 text-muted">
        {friendlyDateTime ? `Logged ${friendlyDateTime}` : "Logged"}
      </p>
      {hasNote && !isExpanded ? (
        <p className="mt-3 line-clamp-2 whitespace-pre-wrap break-words text-sm leading-6 text-secondary">
          <span className="font-semibold text-foreground">Note:</span> {note}
        </p>
      ) : null}

      {isExpanded ? (
        <div className="mt-4 rounded-xl border border-soft-border bg-soft p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Entry details
          </p>
          <dl className="mt-3 space-y-3 text-sm leading-6">
            <HistoryDetail label="Dog" value={dogName} />
            <HistoryDetail
              label="Primary condition"
              value={primaryConditionLabel}
            />
            <HistoryDetail
              label="Additional conditions"
              value={
                additionalConditionLabels.length > 0
                  ? additionalConditionLabels.join(", ")
                  : "None added"
              }
            />
            {trimmedMobilityNotes ? (
              <HistoryDetail label="Mobility notes" value={mobilityNotes ?? ""} />
            ) : null}
            <HistoryDetail label="Category" value={category} />
            <HistoryDetail label="Update" value={label} />
            <HistoryDetail
              label="Logged"
              value={friendlyDateTime || formatHistoryTimestamp(createdAt)}
            />
            {hasNote ? <HistoryDetail label="Note" value={note} /> : null}
          </dl>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          className="rounded-lg border border-secondary-action-border bg-card px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-utility-hover"
          onClick={handleCopy}
          type="button"
        >
          Copy entry
        </button>
        <button
          aria-expanded={isExpanded}
          className="rounded-lg border border-secondary-action-border bg-card px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-utility-hover"
          onClick={() => setIsExpanded((expanded) => !expanded)}
          type="button"
        >
          {isExpanded ? "Hide details" : "View details"}
        </button>
        <p
          aria-live="polite"
          className={`w-full text-xs leading-5 ${
            copyStatus === "error" ? "text-warning-text" : "text-muted"
          }`}
        >
          {copyStatus === "copied"
            ? "Copied"
            : copyStatus === "error"
              ? "Couldn't copy. You can still select the text manually."
              : ""}
        </p>
      </div>
    </Card>
  );
}

function HistoryDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-semibold text-foreground">{label}</dt>
      <dd className="whitespace-pre-wrap break-words text-secondary">{value}</dd>
    </div>
  );
}
