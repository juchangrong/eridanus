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
  { href: "/runs", label: "运行记录", icon: <MonitorPlayIcon /> },
  { href: "/queues", label: "队列", icon: <StackIcon /> },
  { href: "/metrics", label: "监控", icon: <PresentationChartIcon /> },
  { href: "/settings", label: "设置", icon: <GearIcon /> },
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
    name: "运营台",
    logo: <PlanetIcon weight="fill" />,
  },
  { id: "growth", name: "增长团队" },
  { id: "lab", name: "实验室" },
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
    { title: "已固定", hideWhenCollapsed: true, items: mark(PINNED) },
    { title: "最近", hideWhenCollapsed: true, items: mark(RECENT) },
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
          items: TENANTS,
          current: tenant,
          onSelect: setTenant,
          actions: [
            {
              label: "管理控制台",
              icon: <ShieldCheckIcon />,
              onSelect: () => notify("打开管理控制台"),
            },
          ],
          onCreate: () => notify("新建租户"),
        }}
        search={{ onOpen: () => setSearching(true) }}
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
              aria-label="帮助"
              title="帮助"
              className="text-muted-foreground"
            >
              <QuestionIcon />
            </Button>
            <Button size="sm" onClick={() => notify("新建运行")}>
              新建运行
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
        {/* The page is built from PageLayout: a header with status and
            facts, headline figures, then a titled section. */}
        <Page>
          <PageHeader
            title={page.label}
            badges={<ToneBadge tone="success">运行正常</ToneBadge>}
            meta={
              <FactLine>
                <span>{TENANTS.find((t) => t.id === tenant)?.name}</span>
                <span>
                  创建于 <Time value={CREATED} />
                </span>
                <span>3 个管理员</span>
              </FactLine>
            }
          />
          <StatStrip
            items={[
              { label: "24 小时运行", value: "12,840" },
              {
                label: "失败率",
                value: "0.7%",
                tone: "danger",
                hint: "96 次失败",
              },
              { label: "在途", value: "37", hint: "上限 200" },
              { label: "队列积压", value: "12", tone: "warning" },
            ]}
          />
          <Section
            title="配置"
            description="只有项目管理员能修改。"
            actions={
              <Button size="sm" variant="secondary">
                编辑配置
              </Button>
            }
          >
            <Facts
              items={[
                { label: "项目 ID", value: "prj_7f3a9c" },
                { label: "在途上限", value: "200" },
                {
                  label: "回调地址",
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
          <CommandInput placeholder="搜索页面、工作流和运行…" />
          <CommandList>
            <CommandEmpty>没有匹配的结果</CommandEmpty>
            <CommandGroup heading="页面">
              {MAIN.map((p) => (
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
