"use client";

import { useEffect, useState } from "react";

export function TodayTimestamp() {
  const [timestamp, setTimestamp] = useState<Date | null>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setTimestamp(new Date()), 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!timestamp) {
    return <p className="text-sm font-semibold text-foreground">Today</p>;
  }

  const date = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(timestamp);
  const time = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(timestamp);

  return (
    <div>
      <p className="text-sm font-semibold leading-6 text-foreground">{date}</p>
      <p className="text-xs leading-5 text-muted">Updated {time}</p>
    </div>
  );
}
