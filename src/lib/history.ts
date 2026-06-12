type HistoryCopyEntry = {
  additionalConditionLabels: string[];
  category: string;
  dogName: string;
  friendlyDateTime: string;
  label: string;
  mobilityNotes: string | null;
  note: string;
  primaryConditionLabel: string;
};

function isSameLocalDay(first: Date, second: Date) {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

export function formatHistoryTimestamp(createdAt: string, now = new Date()) {
  const created = new Date(createdAt);

  if (Number.isNaN(created.getTime())) {
    return "Date unavailable";
  }

  const time = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(created);

  if (isSameLocalDay(created, now)) {
    return `Today at ${time}`;
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (isSameLocalDay(created, yesterday)) {
    return `Yesterday at ${time}`;
  }

  const date = new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
  }).format(created);

  return `${date} at ${time}`;
}

export function buildHistoryEntryCopyText({
  additionalConditionLabels,
  category,
  dogName,
  friendlyDateTime,
  label,
  mobilityNotes,
  note,
  primaryConditionLabel,
}: HistoryCopyEntry) {
  const lines = [
    "CarePaw OS history entry",
    "",
    `Dog: ${dogName}`,
    `Primary condition: ${primaryConditionLabel}`,
    `Additional conditions: ${
      additionalConditionLabels.length > 0
        ? additionalConditionLabels.join(", ")
        : "None added"
    }`,
  ];
  const hasMobilityNotes = Boolean(mobilityNotes?.trim());

  if (hasMobilityNotes) {
    lines.push(`Mobility notes: ${mobilityNotes}`);
  }

  lines.push(
    "",
    `Category: ${category}`,
    `Update: ${label}`,
    `Logged: ${friendlyDateTime}`,
  );
  const hasNote = note.trim().length > 0;

  if (hasNote) {
    lines.push(`Note: ${note}`);
  }

  return lines.join("\n");
}
