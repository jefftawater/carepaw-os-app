"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { saveConditionUpdate } from "@/app/update-condition/actions";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ConditionSignal, manualConditionSignals } from "@/lib/careFocus";

type UpdateConditionFormProps = {
  dogId: string;
  dogName: string;
};

export function UpdateConditionForm({
  dogId,
  dogName,
}: UpdateConditionFormProps) {
  const [state, formAction] = useActionState(saveConditionUpdate, {
    error: "",
  });
  const [selectedSignal, setSelectedSignal] =
    useState<ConditionSignal | null>(null);
  const [note, setNote] = useState("");
  const [savePrompt, setSavePrompt] = useState("");

  function handleSave() {
    if (!selectedSignal) {
      setSavePrompt(`Choose how ${dogName} is doing today first.`);
      return;
    }

    setSavePrompt("");
  }

  return (
    <form action={formAction} className="contents">
      <input name="dogId" type="hidden" value={dogId} />
      <input name="signal" type="hidden" value={selectedSignal ?? ""} />

      <div className="flex flex-col gap-3">
        {manualConditionSignals.map((option) => {
          const isSelected = option === selectedSignal;

          return (
            <button
              aria-pressed={isSelected}
              className={`w-full rounded-xl border p-4 text-left text-base font-medium leading-6 shadow-sm shadow-black/[0.02] transition-colors ${
                isSelected
                  ? "border-foreground bg-gray-100 text-foreground ring-1 ring-foreground/10"
                  : "border-border bg-card text-foreground hover:bg-gray-50"
              }`}
              key={option}
              onClick={() => {
                setSelectedSignal(option);
                setSavePrompt("");
              }}
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
          name="note"
          onChange={(event) => setNote(event.target.value)}
          placeholder="Add a quick note..."
          value={note}
        />
      </Card>

      {savePrompt || state.error ? (
        <p className="px-1 text-sm leading-6 text-secondary">
          {savePrompt || state.error}
        </p>
      ) : null}

      <SaveButton disabled={!selectedSignal} onClick={handleSave} />
    </form>
  );
}

function SaveButton({
  disabled,
  onClick,
}: {
  disabled: boolean;
  onClick: () => void;
}) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={disabled || pending} onClick={onClick} type="submit">
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
