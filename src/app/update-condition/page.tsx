import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

const options = [
  "About the same",
  "A little worse",
  "More uncomfortable",
  "More restless",
  "Bathroom changes",
];

export default function UpdateConditionPage() {
  return (
    <AppShell title="Update Max">
      <Card>
        <h2 className="text-lg font-semibold leading-7 text-foreground">
          How is Max today?
        </h2>
        <p className="mt-1 text-sm leading-6 text-secondary">
          What feels different from usual?
        </p>
      </Card>

      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <button
            className="w-full rounded-xl border border-border bg-card p-4 text-left text-base font-medium leading-6 text-foreground shadow-sm shadow-black/[0.02]"
            key={option}
          >
            {option}
          </button>
        ))}
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
          placeholder="Add a quick note..."
        />
      </Card>

      <Button href="/today">Save</Button>
    </AppShell>
  );
}
