import {
  GearIcon,
  MonitorPlayIcon,
  PlanetIcon,
  PresentationChartIcon,
  StackIcon,
} from "@phosphor-icons/react";

import { AppShell } from "@/components/eridanus/app-shell";
import {
  FactLine,
  Facts,
  Page,
  PageHeader,
  Section,
  StatStrip,
} from "@/components/eridanus/page-layout";
import { Time } from "@/components/eridanus/time";
import { ToneBadge } from "@/components/eridanus/tone-badge";
import { Button } from "@/components/ui/button";

const NAV = [
  {
    items: [
      { href: "/runs", label: "Runs", icon: <MonitorPlayIcon /> },
      { href: "/flows", label: "Workflows", icon: <StackIcon />, active: true },
      { href: "/metrics", label: "Metrics", icon: <PresentationChartIcon /> },
      { href: "/settings", label: "Settings", icon: <GearIcon /> },
    ],
  },
];

const CREATED = new Date(Date.now() - 90 * 24 * 60 * 60_000);

export default function PageLayoutDemo() {
  return (
    // A page as it sits in an app: the docs frame the shell in a box, which
    // the transform makes the containing block for the sidebar's panel.
    <div className="h-[40rem] w-full transform-gpu overflow-hidden rounded-lg border in-data-fullscreen:h-full [&_[data-slot=sidebar-container]]:h-full">
      <AppShell
        className="h-full"
        brand={{ name: "Ops console", logo: <PlanetIcon weight="fill" /> }}
        nav={NAV}
        // eslint-disable-next-line jsx-a11y/anchor-has-content -- the shell renders the label into it
        renderLink={(href) => <a href={href} />}
        account={{ name: "Avery Lin", email: "lin@example.com" }}
      >
        <Page>
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
        </Page>
      </AppShell>
    </div>
  );
}
