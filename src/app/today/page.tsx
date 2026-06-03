import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { SectionLabel } from "@/components/SectionLabel";

export default function TodayPage() {
  return (
    <AppShell title="Max - Today">
      <Card>
        <SectionLabel>What matters today</SectionLabel>
        <p className="mt-3 text-lg font-semibold leading-7 text-foreground">
          Anchor your day around the next medication + bathroom cycle.
        </p>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-secondary">
          <li>After meds, plan for the next potty window</li>
          <li>Watch comfort and movement changes</li>
          <li>If today feels like a lot, just focus on the first one</li>
        </ul>
        <p className="mt-5 rounded-xl bg-background p-3 text-sm leading-6 text-secondary">
          You don&apos;t have to manage everything - staying in rhythm is
          enough.
        </p>
      </Card>

      <Card>
        <label
          className="text-base font-semibold leading-6 text-foreground"
          htmlFor="today-note"
        >
          What felt different today?
        </label>
        <textarea
          className="mt-3 min-h-28 w-full resize-none rounded-xl border border-border bg-background p-3 text-sm leading-6 text-foreground outline-none placeholder:text-muted focus:border-foreground"
          id="today-note"
          placeholder="Add a quick note..."
        />
      </Card>

      <div className="grid grid-cols-1 gap-3">
        <Button variant="secondary">Yes, this helped</Button>
        <Button variant="secondary">Not really</Button>
      </div>
    </AppShell>
  );
}
