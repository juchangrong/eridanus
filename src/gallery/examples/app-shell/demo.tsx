import {
  BellIcon,
  CircleIcon,
  ClockCounterClockwiseIcon,
  GearIcon,
  PlanetIcon,
  PlayCircleIcon,
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
  { href: "/runs", label: "运行记录", icon: <PlayCircleIcon /> },
  { href: "/queues", label: "队列", icon: <StackIcon /> },
  { href: "/metrics", label: "监控", icon: <PresentationChartIcon /> },
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
const SETTINGS = [{ href: "/settings", label: "设置", icon: <GearIcon /> }];
const PAGES = [...MAIN, ...PINNED, ...RECENT, ...SETTINGS];

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
    { title: "已固定", items: mark(PINNED) },
    { title: "最近", items: mark(RECENT) },
    { items: mark(SETTINGS) },
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
        brand={{ name: "运营台", logo: <PlanetIcon weight="fill" /> }}
        tenants={{
          items: [
            {
              id: "ops",
              name: "运营台",
              logo: <PlanetIcon weight="fill" />,
            },
            { id: "growth", name: "增长团队" },
            { id: "lab", name: "实验室" },
          ],
          current: tenant,
          onSelect: setTenant,
          onCreate: () => notify("新建租户"),
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
          <Button variant="ghost" size="icon" aria-label="通知" title="通知">
            <BellIcon />
          </Button>
        }
        account={{
          name: "Avery Lin",
          email: "lin@example.com",
          items: (
            <DropdownMenuItem>
              <UserIcon />
              账号设置
            </DropdownMenuItem>
          ),
          onSignOut: () => notify("已退出登录"),
        }}
      >
        <Page>
          <PageHeader title={page.label} />
          <StatStrip
            items={[
              { label: "24 小时运行", value: "12,840" },
              { label: "失败", value: "96", tone: "danger" },
              { label: "在途", value: "37", hint: "上限 200" },
            ]}
          />
        </Page>
      </AppShell>
      {/* CommandDialog is the dialog shell; a Command inside holds the
          search. */}
      <CommandDialog open={searching} onOpenChange={setSearching}>
        <Command>
          <CommandInput placeholder="搜索页面、工作流和运行…" />
          <CommandList>
            <CommandEmpty>没有匹配的结果</CommandEmpty>
            <CommandGroup heading="页面">
              {[...MAIN, ...SETTINGS].map((p) => (
                <CommandItem key={p.href} onSelect={() => go(p.href)}>
                  {p.icon}
                  {p.label}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="已固定">
              {PINNED.map((p) => (
                <CommandItem key={p.href} onSelect={() => go(p.href)}>
                  {p.icon}
                  {p.label}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="最近">
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
