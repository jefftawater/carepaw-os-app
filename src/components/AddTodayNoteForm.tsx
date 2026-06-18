"use client";

import { FormEvent, useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { addTodayNote } from "@/app/today/actions";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

type AddTodayNoteFormProps = {
  dogId: string;
};

export function AddTodayNoteForm({ dogId }: AddTodayNoteFormProps) {
  const [state, formAction] = useActionState(addTodayNote, {
    error: "",
    success: "",
  });
  const formRef = useRef<HTMLFormElement>(null);
  const [clientMessage, setClientMessage] = useState("");

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const note = String(formData.get("note") ?? "").trim();

    if (!note) {
      event.preventDefault();
      setClientMessage("Add a note before saving.");
      return;
    }

    setClientMessage("");
  }

  const message = clientMessage || state.error || state.success;
  const isError = Boolean(clientMessage || state.error);

  return (
    <Card>
      <form action={formAction} onSubmit={handleSubmit} ref={formRef}>
        <input name="dogId" type="hidden" value={dogId} />
        <label
          className="text-base font-semibold leading-6 text-foreground"
          htmlFor="today-note"
        >
          Add today&apos;s note
        </label>
        <p className="mt-2 text-sm leading-6 text-secondary">
          Add anything you remembered or noticed later. Notes are saved with a
          time.
        </p>
        <textarea
          className="mt-3 min-h-24 w-full resize-none rounded-xl border border-border bg-background p-3 text-sm leading-6 text-foreground outline-none placeholder:text-muted focus:border-primary"
          id="today-note"
          name="note"
          onChange={() => {
            setClientMessage("");
          }}
          placeholder="Add a note about today..."
        />
        {message ? (
          <p
            aria-live="polite"
            className={`mt-3 rounded-xl border p-3 text-sm leading-6 ${
              isError
                ? "border-warning-border bg-warning-background text-warning-text"
                : "border-soft-border bg-soft text-secondary"
            }`}
          >
            {message}
          </p>
        ) : null}
        <div className="mt-4">
          <AddNoteButton />
        </div>
      </form>
    </Card>
  );
}

function AddNoteButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {pending ? "Adding..." : "Add note"}
    </Button>
  );
}
