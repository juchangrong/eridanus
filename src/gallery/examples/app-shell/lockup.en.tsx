/**
 * Brand lockup
 * brand.lockup draws a whole lockup (one SVG of the mark and the wordmark) in place of the tile and the name. Collapsing clips only the wordmark; the mark and the nav icons stay in one column in both states, so nothing moves sideways.
 */
import { GearIcon, MonitorPlayIcon, StackIcon } from "@phosphor-icons/react";
import { useState } from "react";

import { AppShell } from "@/components/eridanus/app-shell";
import { Page, PageHeader } from "@/components/eridanus/page-layout";
import { ToneBadge } from "@/components/eridanus/tone-badge";

const PAGES = [
  { href: "/runs", label: "Runs", icon: <MonitorPlayIcon /> },
  { href: "/queues", label: "Queues", icon: <StackIcon /> },
  { href: "/settings", label: "Settings", icon: <GearIcon /> },
];

/** The mark and the wordmark in one SVG, the mark first in a 28px box. */
function Lockup() {
  return (
    <svg
      role="img"
      aria-label="Ops console"
      viewBox="0 0 120 28"
      className="h-7! w-30! shrink-0"
    >
      <circle cx="14" cy="14" r="9" className="fill-primary" />
      <circle cx="14" cy="14" r="4" className="fill-background" />
      <text x="31" y="19" className="fill-foreground text-[15px] font-semibold">
        Ops console
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
        brand={{ name: "Ops console", lockup: <Lockup /> }}
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
            badges={<ToneBadge tone="success">Healthy</ToneBadge>}
          />
        </Page>
      </AppShell>
    </div>
  );
}
