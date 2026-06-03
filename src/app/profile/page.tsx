import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { SectionLabel } from "@/components/SectionLabel";

export default function ProfilePage() {
  return (
    <AppShell title="Max - Profile">
      <Card>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold leading-7 text-foreground">
              Max
            </h2>
            <p className="mt-2 text-sm leading-6 text-secondary">
              Degenerative Myelopathy
            </p>
            <p className="text-sm leading-6 text-secondary">
              Rear leg weakness
            </p>
          </div>
          <button className="text-sm font-semibold text-foreground">Edit</button>
        </div>
      </Card>

      <Card>
        <SectionLabel>Current Focus</SectionLabel>
        <ul className="mt-3 space-y-3 text-sm leading-6 text-secondary">
          <li>Stay in medication + bathroom rhythm</li>
          <li>Watch for movement fatigue</li>
        </ul>
      </Card>

      <Card>
        <SectionLabel>Adjust care</SectionLabel>
        <div className="mt-3">
          <Button href="/update-condition">Update how Max is doing</Button>
        </div>
        <Link
          className="mt-4 block text-center text-sm font-semibold text-secondary"
          href="/update-condition"
        >
          Update condition details
        </Link>
      </Card>
    </AppShell>
  );
}
