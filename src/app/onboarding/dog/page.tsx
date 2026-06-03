import { AuthPageShell } from "@/components/AuthPageShell";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { SectionLabel } from "@/components/SectionLabel";
import { requireUser } from "@/lib/auth/requireUser";
import { createDogProfile } from "./actions";

export default async function DogOnboardingPage() {
  await requireUser();

  return (
    <AuthPageShell>
      <Card>
        <SectionLabel>Dog profile</SectionLabel>
        <div className="mt-3">
          <h1 className="text-2xl font-semibold leading-8 text-foreground">
            Tell us about your dog
          </h1>
          <p className="mt-2 text-sm leading-6 text-secondary">
            This gives CarePaw OS a calm starting point for daily support.
          </p>
        </div>

        <form action={createDogProfile} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
            Dog name
            <input
              className="h-12 rounded-xl border border-border bg-background px-3 text-base text-foreground outline-none placeholder:text-muted focus:border-foreground"
              name="name"
              placeholder="Max"
              required
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
            Condition
            <input
              className="h-12 rounded-xl border border-border bg-background px-3 text-base text-foreground outline-none placeholder:text-muted focus:border-foreground"
              name="condition"
              placeholder="Degenerative Myelopathy"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
            Mobility notes
            <textarea
              className="min-h-28 resize-none rounded-xl border border-border bg-background p-3 text-base leading-6 text-foreground outline-none placeholder:text-muted focus:border-foreground"
              name="mobilityNotes"
              placeholder="Rear leg weakness, needs support standing..."
            />
          </label>

          <Button type="submit">Save dog profile</Button>
        </form>
      </Card>
    </AuthPageShell>
  );
}
