"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { notifyCareUpdateChanged } from "@/hooks/useLatestCareUpdate";
import {
  ConditionSignal,
  conditionSignals,
  createCareUpdate,
  saveCareUpdate,
} from "@/lib/careUpdates";

export function UpdateConditionForm() {
  const router = useRouter();
  const [selectedSignal, setSelectedSignal] =
    useState<ConditionSignal>("About the same");
  const [note, setNote] = useState("");

  function handleSave() {
    saveCareUpdate(createCareUpdate(selectedSignal, note.trim()));
    notifyCareUpdateChanged();
    router.push("/today");
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        {conditionSignals.map((option) => {
          const isSelected = option === selectedSignal;

          return (
            <button
              aria-pressed={isSelected}
              className={`w-full rounded-xl border p-4 text-left text-base font-medium leading-6 shadow-sm shadow-black/[0.02] transition-colors ${
                isSelected
                  ? "border-foreground bg-foreground text-white"
                  : "border-border bg-card text-foreground"
              }`}
              key={option}
              onClick={() => setSelectedSignal(option)}
              type="button"
            >
              {option}
            </button>
          );
        })}
      </div>

      <Card>
        <label
          className="text-base font-semibold leading-6 text-foreground"
          htmlFor="condition-note"
        >
          Anything else you noticed?
        </label>
        <textarea
          className="mt-3 min-h-28 w-full resize-none rounded-xl border border-border bg-background p-3 text-sm leading-6 text-foreground outline-none placeholder:text-muted focus:border-foreground"
          id="condition-note"
          onChange={(event) => setNote(event.target.value)}
          placeholder="Add a quick note..."
          value={note}
        />
      </Card>

      <Button onClick={handleSave}>Save</Button>
    </>
  );
}
