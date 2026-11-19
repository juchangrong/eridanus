/**
 * Search in the top bar
 * With placement: "topbar" the search entry moves to the middle of the top bar and leaves the sidebar; ⌘K still opens it.
 */
import {
  BellIcon,
  CircleIcon,
  ClockCounterClockwiseIcon,
  GearIcon,
  MonitorPlayIcon,
  PlanetIcon,
  PresentationChartIcon,
  QuestionIcon,
  ShieldCheckIcon,
  StackIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

import { type AppNavGroup, AppShell } from "@/components/eridanus/app-shell";
import {
  FactLine,
  Facts,
  Page,
  PageHeader,
  Section,
  StatStrip,
} from "@/components/eridanus/page-layout";
import { Time } from "@/components/eridanus/time";
import { notify } from "@/components/eridanus/toaster";
import { ToneBadge } from "@/components/eridanus/tone-badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
const TENANTS = [
  {
    id: "ops",
    name: "Ops console",
    logo: <PlanetIcon weight="fill" />,
  },
  { id: "growth", name: "Growth" },
  { id: "lab", name: "Research lab" },
];
const CREATED = new Date(Date.now() - 90 * 24 * 60 * 60_000);
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
          items: TENANTS,
          current: tenant,
          onSelect: setTenant,
          actions: [
            {
              label: "Admin Console",
              icon: <ShieldCheckIcon />,
              onSelect: () => notify("Open the admin console"),
            },
          ],
          onCreate: () => notify("New tenant"),
        }}
        search={{ onOpen: () => setSearching(true), placement: "topbar" }}
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                {TENANTS.find((t) => t.id === tenant)?.name}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{page.label}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
        actions={
          <>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Help"
              title="Help"
              className="text-muted-foreground"
            >
              <QuestionIcon />
            </Button>
            <Button size="sm" onClick={() => notify("New run")}>
              New run
            </Button>
          </>
        }
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
        {/* The page is built from PageLayout: a header with status and
            facts, headline figures, then a titled section. */}
        <Page>
          <PageHeader
            title={page.label}
            badges={<ToneBadge tone="success">Healthy</ToneBadge>}
            meta={
              <FactLine>
                <span>{TENANTS.find((t) => t.id === tenant)?.name}</span>
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
