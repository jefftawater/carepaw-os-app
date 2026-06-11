import { AppShell } from "@/components/AppShell";
import { CareDisclaimer } from "@/components/CareDisclaimer";
import { Card } from "@/components/Card";
import { CareCard } from "@/components/CareCard";
import { FeedbackLink } from "@/components/FeedbackLink";
import { SectionLabel } from "@/components/SectionLabel";
import { requireActiveDog } from "@/lib/auth/requireActiveDog";

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
    href: "/care/comfort-pain",
  },
  {
    title: "Skin + hygiene",
    description:
      "Check pressure spots, paws, bedding, and cleanliness",
    href: "/care/skin-hygiene",
  },
  {
    title: "Mobility support",
    description: "Support safe movement, positioning, and rest",
    href: "/care/mobility-support",
  },
  {
    title: "Routine reminders",
    description: "Nails, ears, meds, supplies, and weekly care tasks",
    href: "/care/routine-reminders",
  },
  {
    title: "Home setup",
    description: "Beds, lifting, traction, and care supplies",
    href: "/care/home-setup",
  },
];

export default async function CarePage() {
  const dog = await requireActiveDog();

  return (
    <AppShell title={`${dog.name} - Care`}>
      <Card>
        <SectionLabel>Practical care guidance</SectionLabel>
        <p className="mt-3 text-sm leading-6 text-secondary">
          Use Care when you need help with a specific part of daily life:
          mobility, skin, bathroom rhythm, enrichment, comfort, routines, or
          home setup.
        </p>
        <p className="mt-2 text-sm leading-6 text-muted">
          Some care pages let you save a quick action to History.
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

      <CareDisclaimer />

      <Card>
        <SectionLabel>Beta support</SectionLabel>
        <div className="mt-3">
          <FeedbackLink />
        </div>
      </Card>
    </AppShell>
  );
}
