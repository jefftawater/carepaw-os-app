"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { saveConditionUpdate } from "@/app/update-condition/actions";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import {
  ConditionSignal,
  manualConditionSignalGroups,
} from "@/lib/careFocus";

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

      {manualConditionSignalGroups.map((group) => (
        <Card key={group.label}>
          <fieldset>
            <legend className="px-1 text-xs font-semibold uppercase tracking-wide text-muted">
              {group.label}
            </legend>
            <div className="mt-2 flex flex-col gap-2">
              {group.options.map((option) => {
                const isSelected = option.signal === selectedSignal;

                return (
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-3 text-sm font-medium leading-5 transition-colors ${
                      isSelected
                        ? "border-primary bg-soft text-foreground ring-1 ring-primary/10"
                        : "border-border bg-background text-foreground hover:bg-soft"
                    }`}
                    key={option.signal}
                  >
                    <input
                      checked={isSelected}
                      className="h-4 w-4 shrink-0 accent-primary"
                      name="signal"
                      onChange={() => {
                        setSelectedSignal(option.signal);
                        setSavePrompt("");
                      }}
                      type="radio"
                      value={option.signal}
                    />
                    <span>{option.label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        </Card>
      ))}

      <Card>
        <label
          className="text-base font-semibold leading-6 text-foreground"
          htmlFor="condition-note"
        >
          Add anything you remembered or noticed later
        </label>
        <textarea
          className="mt-3 min-h-28 w-full resize-none rounded-xl border border-border bg-background p-3 text-sm leading-6 text-foreground outline-none placeholder:text-muted focus:border-primary"
          id="condition-note"
          name="note"
          onChange={(event) => setNote(event.target.value)}
          placeholder="Add a quick note or detail..."
          value={note}
        />
      </Card>

      {savePrompt || state.error ? (
        <p className="rounded-xl border border-warning-border bg-warning-background p-3 text-sm leading-6 text-warning-text">
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
      {pending ? "Saving..." : "Add update to today's notes"}
    </Button>
  );
}
