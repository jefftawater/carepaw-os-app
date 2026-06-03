import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { UpdateConditionForm } from "@/components/UpdateConditionForm";
import { requireUser } from "@/lib/auth/requireUser";

export default async function UpdateConditionPage() {
  await requireUser();

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
      <UpdateConditionForm />
    </AppShell>
  );
}
