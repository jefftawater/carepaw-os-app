"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { logCareAction } from "@/app/care/actions";
import { Card } from "@/components/Card";
import { SectionLabel } from "@/components/SectionLabel";

type CareLogOption = {
  key: string;
  label: string;
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
          <SubmitCareLogButton key={option.key} option={option} />
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
      className="flex h-12 w-full items-center justify-center rounded-xl border border-secondary-action-border bg-card px-4 text-sm font-semibold text-foreground transition-colors hover:bg-soft disabled:cursor-not-allowed disabled:opacity-50"
      disabled={pending}
      name="actionKey"
      type="submit"
      value={option.key}
    >
      {pending ? "Saving..." : option.label}
    </button>
  );
}
