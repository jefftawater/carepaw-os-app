import { AppShell } from "@/components/AppShell";
import { CareLogActions } from "@/components/CareLogActions";
import { Card } from "@/components/Card";
import { SectionLabel } from "@/components/SectionLabel";
import { requireActiveDog } from "@/lib/auth/requireActiveDog";

export default async function MobilitySupportPage() {
  const dog = await requireActiveDog();

  return (
    <AppShell title="Mobility Support">
      <Card>
        <p className="text-lg font-semibold leading-7 text-foreground">
          Good mobility support is not about doing more. It is about helping
          movement stay safe and predictable.
        </p>
      </Card>

      <Card>
        <SectionLabel>What to watch</SectionLabel>
        <ul className="mt-3 space-y-3 text-sm leading-6 text-secondary">
          <li>Dragging paws</li>
          <li>Slipping</li>
          <li>Trouble turning</li>
          <li>Fatigue after movement</li>
          <li>Difficulty getting up or lying down</li>
        </ul>
      </Card>

      <Card>
        <SectionLabel>What to do today</SectionLabel>
        <ul className="mt-3 space-y-3 text-sm leading-6 text-secondary">
          <li>Use slow, supported transitions</li>
          <li>Keep paths clear</li>
          <li>Add traction where needed</li>
          <li>Pause between movement attempts</li>
          <li>Stop before fatigue builds</li>
        </ul>
      </Card>

      <Card>
        <SectionLabel>What to avoid</SectionLabel>
        <ul className="mt-3 space-y-3 text-sm leading-6 text-secondary">
          <li>Rushing movement</li>
          <li>Asking for too many transitions close together</li>
          <li>Letting slippery surfaces become part of the routine</li>
        </ul>
      </Card>

      <CareLogActions
        dogId={dog.id}
        options={[
          { key: "mobility_supported", label: "Mobility support worked" },
          { key: "mobility_more_difficult", label: "Mobility was harder today" },
        ]}
        title="Log mobility support"
      />
    </AppShell>
  );
}
