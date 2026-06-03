"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { saveDogProfile } from "@/app/profile/edit/actions";
import { Button } from "@/components/Button";
import {
  dogConditionOptions,
  getDogConditionSelectValue,
} from "@/lib/dogConditions";
import { Dog } from "@/lib/dogs";

type EditDogProfileFormProps = {
  dog: Dog;
};

export function EditDogProfileForm({ dog }: EditDogProfileFormProps) {
  const [state, formAction] = useActionState(saveDogProfile, {
    error: "",
  });
  const initialPrimaryCondition = getDogConditionSelectValue(dog.condition);
  const [primaryCondition, setPrimaryCondition] = useState<string>(
    initialPrimaryCondition,
  );
  const additionalConditions = dog.additional_conditions ?? [];
  const additionalConditionOptions = dogConditionOptions.filter(
    (option) =>
      option.key !== primaryCondition && option.key !== "other_not_sure",
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input name="dogId" type="hidden" value={dog.id} />

      <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
        Dog name
        <input
          className="h-12 rounded-xl border border-border bg-background px-3 text-base text-foreground outline-none placeholder:text-muted focus:border-primary"
          defaultValue={dog.name}
          name="name"
          required
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
        Condition
        <select
          className="h-12 rounded-xl border border-border bg-background px-3 text-base text-foreground outline-none placeholder:text-muted focus:border-primary"
          defaultValue={initialPrimaryCondition}
          name="condition"
          onChange={(event) => setPrimaryCondition(event.target.value)}
        >
          {dogConditionOptions.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <fieldset className="flex flex-col gap-3">
        <legend className="text-sm font-medium text-foreground">
          Additional conditions
        </legend>
        <div className="rounded-xl border border-border bg-background p-3">
          <div className="grid grid-cols-1 gap-3">
            {additionalConditionOptions.map((option) => (
              <label
                className="flex items-start gap-3 text-sm leading-6 text-secondary"
                key={option.key}
              >
                <input
                  className="mt-1 size-4 accent-primary"
                  defaultChecked={additionalConditions.includes(option.key)}
                  name="additionalConditions"
                  type="checkbox"
                  value={option.key}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
        Mobility notes
        <textarea
          className="min-h-28 resize-none rounded-xl border border-border bg-background p-3 text-base leading-6 text-foreground outline-none placeholder:text-muted focus:border-primary"
          defaultValue={dog.mobility_notes ?? ""}
          name="mobilityNotes"
        />
      </label>

      {state.error ? (
        <p className="rounded-xl border border-warning-border bg-warning-background p-3 text-sm leading-6 text-warning-text">
          {state.error}
        </p>
      ) : null}

      <SaveButton />

      <Link
        className="block text-center text-sm font-semibold text-secondary"
        href="/profile"
      >
        Cancel
      </Link>
    </form>
  );
}

function SaveButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {pending ? "Saving..." : "Save profile"}
    </Button>
  );
}
