"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createDogProfile } from "@/app/onboarding/dog/actions";
import { Button } from "@/components/Button";
import { dogConditionOptions } from "@/lib/dogConditions";

export function DogOnboardingForm() {
  const [state, formAction] = useActionState(createDogProfile, {
    error: "",
  });

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-4">
      <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
        Dog name
        <input
          className="h-12 rounded-xl border border-border bg-background px-3 text-base text-foreground outline-none placeholder:text-muted focus:border-primary"
          name="name"
          placeholder="Max"
          required
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
        Condition
        <select
          className="h-12 rounded-xl border border-border bg-background px-3 text-base text-foreground outline-none placeholder:text-muted focus:border-primary"
          defaultValue="other_not_sure"
          name="condition"
        >
          {dogConditionOptions.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
        Mobility notes
        <textarea
          className="min-h-28 resize-none rounded-xl border border-border bg-background p-3 text-base leading-6 text-foreground outline-none placeholder:text-muted focus:border-primary"
          name="mobilityNotes"
          placeholder="Rear leg weakness, needs support standing..."
        />
      </label>

      {state.error ? (
        <p className="rounded-xl border border-warning-border bg-warning-background p-3 text-sm leading-6 text-warning-text">
          {state.error}
        </p>
      ) : null}

      <SaveButton />
    </form>
  );
}

function SaveButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {pending ? "Saving..." : "Save dog profile"}
    </Button>
  );
}
