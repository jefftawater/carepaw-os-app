import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { UpdateConditionForm } from "@/components/UpdateConditionForm";
import { requireActiveDog } from "@/lib/auth/requireActiveDog";

export default async function UpdateConditionPage() {
  const dog = await requireActiveDog();

  return (
    <AppShell title={`Update ${dog.name}`}>
      <Card>
        <h2 className="text-lg font-semibold leading-7 text-foreground">
          Add today&apos;s update
        </h2>
        <p className="mt-1 text-sm leading-6 text-secondary">
          Add anything you remembered or noticed later. This saves a new note
          for today without replacing earlier updates.
        </p>
      </Card>
      <UpdateConditionForm dogId={dog.id} dogName={dog.name} />
    </AppShell>
  );
}
