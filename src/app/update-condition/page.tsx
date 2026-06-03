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
          How is {dog.name} today?
        </h2>
        <p className="mt-1 text-sm leading-6 text-secondary">
          What feels different from usual?
        </p>
      </Card>
      <UpdateConditionForm />
    </AppShell>
  );
}
