import {
  FactLine,
  Facts,
  PageHeader,
  Section,
  StatStrip,
} from "@/components/eridanus/page-layout";
import { Time } from "@/components/eridanus/time";
import { ToneBadge } from "@/components/eridanus/tone-badge";
import { Button } from "@/components/ui/button";

const CREATED = new Date(Date.now() - 90 * 24 * 60 * 60_000);

export default function PageLayoutDemo() {
  return (
    <div className="flex w-full flex-col gap-10">
      <PageHeader
        title="Order sync"
        badges={
          <>
            <ToneBadge tone="success">Enabled</ToneBadge>
            <ToneBadge tone="outline">Production</ToneBadge>
          </>
        }
        actions={<Button size="sm">Sync now</Button>}
        meta={
          <FactLine>
            <span className="font-mono">order_sync</span>
            <span>
              Created <Time value={CREATED} />
            </span>
            <span>3 admins</span>
          </FactLine>
        }
      />
      <StatStrip
        items={[
          { label: "Runs in 24h", value: "12,840" },
          {
            label: "Failure rate",
            value: "0.7%",
            tone: "danger",
            hint: "96 failures",
          },
          { label: "In flight", value: "37", hint: "Limit 200" },
          { label: "Queue backlog", value: "12", tone: "warning" },
        ]}
      />
      <Section
        title="Configuration"
        description="Only project admins can change this."
        actions={
          <Button size="sm" variant="secondary">
            Edit configuration
          </Button>
        }
      >
        <Facts
          items={[
            { label: "Project ID", value: "prj_7f3a9c" },
            { label: "In-flight limit", value: "200" },
            {
              label: "Callback URL",
              value: "https://orders.example.com/api/workflow",
              wide: true,
            },
          ]}
        />
      </Section>
    </div>
  );
}
