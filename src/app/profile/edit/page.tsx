import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { EditDogProfileForm } from "@/components/EditDogProfileForm";
import { SectionLabel } from "@/components/SectionLabel";
import { requireActiveDog } from "@/lib/auth/requireActiveDog";

export default async function EditProfilePage() {
  const dog = await requireActiveDog();

  return (
    <AppShell title={`Edit ${dog.name}`}>
      <Card>
        <SectionLabel>Dog profile</SectionLabel>
        <div className="mt-3">
          <h2 className="text-xl font-semibold leading-7 text-foreground">
            Edit profile
          </h2>
          <p className="mt-2 text-sm leading-6 text-secondary">
            Keep the basics current so CarePaw can stay centered on today.
          </p>
        </div>
        <div className="mt-6">
          <EditDogProfileForm dog={dog} />
        </div>
      </Card>
    </AppShell>
  );
}
