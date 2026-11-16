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
  { href: "/runs", label: "运行记录", icon: <PlayCircleIcon />, badge: 3 },
  { href: "/queues", label: "队列", icon: <StackIcon /> },
  { href: "/metrics", label: "监控", icon: <ChartLineUpIcon /> },
  { href: "/members", label: "成员", icon: <UsersIcon /> },
  { href: "/settings", label: "设置", icon: <GearIcon /> },
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
        brand={{ name: "运营台", logo: <PlanetIcon weight="fill" /> }}
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
              aria-label="最新动态"
              title="最新动态"
            >
              <LightningIcon />
            </Button>
            <Button variant="ghost" size="icon" aria-label="通知" title="通知">
              <BellIcon />
            </Button>
          </>
        }
        account={{
          name: "林小雨",
          email: "lin@example.com",
          items: (
            <DropdownMenuItem>
              <UserIcon />
              个人设置
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
    </div>
  );
}
