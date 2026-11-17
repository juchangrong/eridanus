import {
  BellIcon,
  CircleIcon,
  ClockCounterClockwiseIcon,
  GearIcon,
  MonitorPlayIcon,
  PlanetIcon,
  PresentationChartIcon,
  StackIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

import { type AppNavGroup, AppShell } from "@/components/eridanus/app-shell";
import { Page, PageHeader, StatStrip } from "@/components/eridanus/page-layout";
import { notify } from "@/components/eridanus/toaster";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const MAIN = [
  { href: "/runs", label: "Runs", icon: <MonitorPlayIcon /> },
  { href: "/queues", label: "Queues", icon: <StackIcon /> },
  { href: "/metrics", label: "Metrics", icon: <PresentationChartIcon /> },
  { href: "/settings", label: "Settings", icon: <GearIcon /> },
];
// Pinned workflows, each marked by a colored dot.
const PINNED = [
  {
    href: "/workflows/sync-catalog",
    label: "syncCatalog",
    icon: <CircleIcon weight="fill" className="scale-50 text-success" />,
  },
  {
    href: "/workflows/send-digest",
    label: "sendDigest",
    icon: <CircleIcon weight="fill" className="scale-50 text-warning" />,
  },
];
const RECENT = [
  {
    href: "/runs/run_tk7uruni",
    label: "run_tk7uruni",
    icon: <ClockCounterClockwiseIcon />,
  },
  {
    href: "/runs/run_tkwanv22",
    label: "run_tkwanv22",
    icon: <ClockCounterClockwiseIcon />,
  },
];
const PAGES = [...MAIN, ...PINNED, ...RECENT];

export default function AppShellDemo() {
  // In an app the router knows the current page; here a click sets it.
  const [current, setCurrent] = useState("/runs");
  const [tenant, setTenant] = useState("ops");
  const [searching, setSearching] = useState(false);
  const page = PAGES.find((p) => p.href === current)!;
  const mark = (items: typeof PAGES) =>
    items.map((p) => ({ ...p, active: p.href === current }));
  const nav: AppNavGroup[] = [
    { items: mark(MAIN) },
    { title: "Pinned", hideWhenCollapsed: true, items: mark(PINNED) },
    { title: "Recent", hideWhenCollapsed: true, items: mark(RECENT) },
  ];
  const go = (href: string) => {
    setCurrent(href);
    setSearching(false);
  };

  return (
    // The shell fills the viewport; the docs frame it in a box, which the
    // transform makes the containing block for the sidebar's fixed panel.
    <div className="h-[34rem] w-full transform-gpu overflow-hidden rounded-lg border in-data-fullscreen:h-full [&_[data-slot=sidebar-container]]:h-full">
      <AppShell
        className="h-full"
        brand={{ name: "Ops console", logo: <PlanetIcon weight="fill" /> }}
        tenants={{
          items: [
            {
              id: "ops",
              name: "Ops console",
              logo: <PlanetIcon weight="fill" />,
            },
            { id: "growth", name: "Growth" },
            { id: "lab", name: "Research lab" },
          ],
          current: tenant,
          onSelect: setTenant,
          onCreate: () => notify("New tenant"),
        }}
        search={{ onOpen: () => setSearching(true) }}
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
          <Button
            variant="ghost"
            size="icon"
            aria-label="Notifications"
            title="Notifications"
          >
            <BellIcon />
          </Button>
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
      {/* CommandDialog is the dialog shell; a Command inside holds the
          search. */}
      <CommandDialog open={searching} onOpenChange={setSearching}>
        <Command>
          <CommandInput placeholder="Search pages, workflows and runs…" />
          <CommandList>
            <CommandEmpty>No results</CommandEmpty>
            <CommandGroup heading="Pages">
              {MAIN.map((p) => (
                <CommandItem key={p.href} onSelect={() => go(p.href)}>
                  {p.icon}
                  {p.label}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Pinned">
              {PINNED.map((p) => (
                <CommandItem key={p.href} onSelect={() => go(p.href)}>
                  {p.icon}
                  {p.label}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Recent">
              {RECENT.map((p) => (
                <CommandItem key={p.href} onSelect={() => go(p.href)}>
                  {p.icon}
                  {p.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}
