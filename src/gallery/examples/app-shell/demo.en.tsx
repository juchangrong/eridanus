import {
  BellIcon,
  ChartLineUpIcon,
  GearIcon,
  LightningIcon,
  PlanetIcon,
  PlayCircleIcon,
  StackIcon,
  UserIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

import { type AppNavGroup, AppShell } from "@/components/eridanus/app-shell";
import { Page, PageHeader, StatStrip } from "@/components/eridanus/page-layout";
import { notify } from "@/components/eridanus/toaster";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const PAGES = [
  { href: "/runs", label: "Runs", icon: <PlayCircleIcon />, badge: 3 },
  { href: "/queues", label: "Queues", icon: <StackIcon /> },
  { href: "/metrics", label: "Metrics", icon: <ChartLineUpIcon /> },
  { href: "/members", label: "Members", icon: <UsersIcon /> },
  { href: "/settings", label: "Settings", icon: <GearIcon /> },
];

export default function AppShellDemo() {
  // In an app the router knows the current page; here a click sets it.
  const [current, setCurrent] = useState("/runs");
  const page = PAGES.find((p) => p.href === current)!;
  const items = PAGES.map((p) => ({ ...p, active: p.href === current }));
  const nav: AppNavGroup[] = [
    { items: items.slice(0, 3) },
    { items: items.slice(3) },
  ];

  return (
    // The shell fills the viewport; the docs frame it in a box, which the
    // transform makes the containing block for the sidebar's fixed panel.
    <div className="h-[34rem] w-full transform-gpu overflow-hidden rounded-lg border [&_[data-slot=sidebar-container]]:h-full">
      <AppShell
        className="h-full"
        brand={{ name: "Ops console", logo: <PlanetIcon weight="fill" /> }}
        nav={nav}
        renderLink={(href) => (
          // eslint-disable-next-line jsx-a11y/anchor-has-content -- the shell renders the label into it
          <a
            href={href}
            onClick={(e) => {
              e.preventDefault();
              if (PAGES.some((p) => p.href === href)) setCurrent(href);
            }}
          />
        )}
        footerActions={
          <>
            <Button
              variant="ghost"
              size="icon"
              aria-label="What's new"
              title="What's new"
            >
              <LightningIcon />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              title="Notifications"
            >
              <BellIcon />
            </Button>
          </>
        }
        account={{
          name: "Avery Lin",
          email: "lin@example.com",
          items: (
            <DropdownMenuItem>
              <UserIcon />
              Account settings
            </DropdownMenuItem>
          ),
          onSignOut: () => notify("Signed out"),
        }}
      >
        <Page>
          <PageHeader title={page.label} />
          <StatStrip
            items={[
              { label: "Runs, 24h", value: "12,840" },
              { label: "Failed", value: "96", tone: "danger" },
              { label: "In flight", value: "37", hint: "Limit 200" },
            ]}
          />
        </Page>
      </AppShell>
    </div>
  );
}
