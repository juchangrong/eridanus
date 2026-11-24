/**
 * 品牌横版标志
 * brand.lockup 放一整块标志（图形加文字的一个 SVG），代替图块和名称。收起时只裁掉文字，图形和导航图标在展开、收起两种状态下都停在同一列，不会左右移动。
 */
import { GearIcon, MonitorPlayIcon, StackIcon } from "@phosphor-icons/react";
import { useState } from "react";

import { AppShell } from "@/components/eridanus/app-shell";
import { Page, PageHeader } from "@/components/eridanus/page-layout";
import { ToneBadge } from "@/components/eridanus/tone-badge";

const PAGES = [
  { href: "/runs", label: "运行记录", icon: <MonitorPlayIcon /> },
  { href: "/queues", label: "队列", icon: <StackIcon /> },
  { href: "/settings", label: "设置", icon: <GearIcon /> },
];

/** The mark and the wordmark in one SVG, the mark first in a 28px box. */
function Lockup() {
  return (
    <svg
      role="img"
      aria-label="运营台"
      viewBox="0 0 120 28"
      className="h-7! w-30! shrink-0"
    >
      <circle cx="14" cy="14" r="9" className="fill-primary" />
      <circle cx="14" cy="14" r="4" className="fill-background" />
      <text x="31" y="19" className="fill-foreground text-[15px] font-semibold">
        运营台
      </text>
    </svg>
  );
}

export default function AppShellLockup() {
  const [current, setCurrent] = useState("/runs");
  const page = PAGES.find((p) => p.href === current)!;
  return (
    <div className="h-[24rem] w-full transform-gpu overflow-hidden rounded-lg border in-data-fullscreen:h-full [&_[data-slot=sidebar-container]]:h-full">
      <AppShell
        className="h-full"
        brand={{ name: "运营台", lockup: <Lockup /> }}
        nav={[
          {
            items: PAGES.map((p) => ({ ...p, active: p.href === current })),
          },
        ]}
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
        account={{ name: "Avery Lin", email: "lin@example.com" }}
      >
        <Page>
          <PageHeader
            title={page.label}
            badges={<ToneBadge tone="success">运行正常</ToneBadge>}
          />
        </Page>
      </AppShell>
    </div>
  );
}
