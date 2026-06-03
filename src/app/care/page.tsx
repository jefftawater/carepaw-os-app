import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { CareCard } from "@/components/CareCard";
import { SectionLabel } from "@/components/SectionLabel";
import { requireUser } from "@/lib/auth/requireUser";

const careCategories = [
  {
    title: "Bathroom rhythm",
    description: "Track timing + changes",
    href: "/care/bathroom-rhythm",
  },
  {
    title: "Mental stimulation",
    description: "Calm activity ideas",
    href: "/care/mental-stimulation",
  },
  {
    title: "Comfort + pain cues",
    description: "Watch movement + discomfort",
  },
  {
    title: "Skin + hygiene",
    description:
      "Check pressure spots, paws, bedding, and cleanliness",
  },
  {
    title: "Mobility support",
    description: "Support safe movement, positioning, and rest",
  },
  {
    title: "Routine reminders",
    description: "Nails, ears, meds, supplies, and weekly care tasks",
  },
];

export default async function CarePage() {
  await requireUser();

  return (
    <AppShell title="Max - Care">
      <Card>
        <SectionLabel>Today&apos;s care focus</SectionLabel>
        <p className="mt-3 text-lg font-semibold leading-7 text-foreground">
          Keep Max comfortable, clean, and in rhythm.
        </p>
      </Card>

      <div className="flex flex-col gap-3">
        {careCategories.map((category) => (
          <CareCard
            description={category.description}
            href={category.href}
            key={category.title}
            title={category.title}
          />
        ))}
      </div>
    </AppShell>
  );
}
