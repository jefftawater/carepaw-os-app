import { AuthPageShell } from "@/components/AuthPageShell";
import { BrandMark } from "@/components/BrandMark";
import { Card } from "@/components/Card";
import { DogOnboardingForm } from "@/components/DogOnboardingForm";
import { SectionLabel } from "@/components/SectionLabel";
import { requireUser } from "@/lib/auth/requireUser";

export default async function DogOnboardingPage() {
  await requireUser();

  return (
    <AuthPageShell>
      <Card>
        <BrandMark className="mb-3" />
        <SectionLabel>Dog profile</SectionLabel>
        <div className="mt-3">
          <h1 className="text-2xl font-semibold leading-8 text-foreground">
            Tell us about your dog
          </h1>
          <p className="mt-2 text-sm leading-6 text-secondary">
            This gives CarePaw OS a calm starting point for daily support.
          </p>
        </div>
        <DogOnboardingForm />
      </Card>
    </AuthPageShell>
  );
}
