"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { logCareAction } from "@/app/care/actions";
import { Card } from "@/components/Card";
import { SectionLabel } from "@/components/SectionLabel";

type CareLogOption = {
  key: string;
  label: string;
  note?: string;
};

type CareLogActionsProps = {
  dogId: string;
  options: CareLogOption[];
  title: string;
};

export function CareLogActions({ dogId, options, title }: CareLogActionsProps) {
  const [state, formAction] = useActionState(logCareAction, {
    error: "",
    success: "",
  });

  return (
    <Card>
      <SectionLabel>{title}</SectionLabel>
      <form action={formAction} className="mt-4 grid grid-cols-1 gap-3">
        <input name="dogId" type="hidden" value={dogId} />
        {options.map((option) => (
          <div key={option.key}>
            {option.note ? (
              <input
                name={`${option.key}Note`}
                type="hidden"
                value={option.note}
              />
            ) : null}
            <SubmitCareLogButton option={option} />
          </div>
        ))}
      </form>
      {state.success || state.error ? (
        <p
          className={`mt-4 rounded-xl border p-3 text-sm leading-6 ${
            state.success
              ? "border-success-border bg-success-background text-success-text"
              : "border-warning-border bg-warning-background text-warning-text"
          }`}
        >
          {state.success || state.error}
        </p>
      ) : null}
    </Card>
  );
}

function SubmitCareLogButton({ option }: { option: CareLogOption }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="flex h-12 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-card transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
      disabled={pending}
      name="actionKey"
      type="submit"
      value={option.key}
    >
      {pending ? "Saving..." : option.label}
    </button>
  );
}
