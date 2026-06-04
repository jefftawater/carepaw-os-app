import { AppShell } from "@/components/AppShell";
import { CareLogActions } from "@/components/CareLogActions";
import { Card } from "@/components/Card";
import { SectionLabel } from "@/components/SectionLabel";
import { requireActiveDog } from "@/lib/auth/requireActiveDog";

export default async function HomeSetupPage() {
  const dog = await requireActiveDog();

  return (
    <AppShell title="Home Setup">
      <Card>
        <p className="text-lg font-semibold leading-7 text-foreground">
          A good setup makes daily care safer, calmer, and less reactive. Start
          with the places your dog rests, moves, and gets help most often.
        </p>
      </Card>

      <Card>
        <SectionLabel>Start here</SectionLabel>
        <ul className="mt-3 space-y-3 text-sm leading-6 text-secondary">
          <li>Add traction where your dog stands, turns, or transfers</li>
          <li>Create one predictable rest and care area</li>
          <li>Use bedding that supports without sagging deeply</li>
          <li>Keep cleanup and care supplies within reach</li>
          <li>Check pressure points and moisture daily</li>
        </ul>
      </Card>

      <Card>
        <SectionLabel>Set up your space</SectionLabel>
        <ul className="mt-3 space-y-3 text-sm leading-6 text-secondary">
          <li>Traction path between rest area, door, and bathroom area</li>
          <li>Supportive bed or mat that is easy to clean</li>
          <li>Towels, wipes, gloves, bedding, and laundry supplies nearby</li>
          <li>Harness or support aid stored where transfers happen</li>
          <li>Clear path with fewer slips, corners, and obstacles</li>
        </ul>
      </Card>

      <Card>
        <SectionLabel>Lifting + moving</SectionLabel>
        <ul className="mt-3 space-y-3 text-sm leading-6 text-secondary">
          <li>Move slowly and support before your dog struggles</li>
          <li>Avoid pulling by the collar or front legs</li>
          <li>Use support gear when needed</li>
          <li>Pause between transitions</li>
          <li>Protect your own back and balance too</li>
        </ul>
      </Card>

      <Card>
        <SectionLabel>Pressure + skin</SectionLabel>
        <ul className="mt-3 space-y-3 text-sm leading-6 text-secondary">
          <li>Watch hips, elbows, hocks, paws, and areas that stay damp</li>
          <li>Rotate resting positions when needed</li>
          <li>Keep bedding dry and smooth</li>
          <li>
            Contact your veterinarian if a sore is open, worsening, painful,
            draining, or not improving
          </li>
        </ul>
      </Card>

      <Card>
        <SectionLabel>What to avoid</SectionLabel>
        <ul className="mt-3 space-y-3 text-sm leading-6 text-secondary">
          <li>Slippery floors as part of the daily route</li>
          <li>Beds that collapse or trap the dog</li>
          <li>Waiting until pressure areas become severe</li>
          <li>Keeping supplies scattered around the house</li>
          <li>Rushing transfers</li>
        </ul>
      </Card>

      <CareLogActions
        dogId={dog.id}
        options={[
          { key: "home_setup_helped", label: "Home setup helped" },
          {
            key: "home_setup_needs_attention",
            label: "Setup needs attention",
          },
        ]}
        title="Did the setup help today?"
      />
    </AppShell>
  );
}
