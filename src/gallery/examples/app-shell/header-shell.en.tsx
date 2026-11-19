/**
 * A home page without the sidebar
 * AppHeaderShell: a page that comes before choosing a workspace, its bar holding only the square logo, text links, actions and the avatar; the page is narrow. Rows the person cannot open are faded with LockedRow, and toggles put a switch in the account menu.
 */
import { GearSixIcon, ShieldCheckIcon } from "@phosphor-icons/react";
import { useState } from "react";

import { AppHeaderShell } from "@/components/eridanus/app-shell";
import { Page, PageHeader } from "@/components/eridanus/page-layout";
import { Pager } from "@/components/eridanus/pager";
import {
  ClickableRow,
  LockedRow,
  TableHeaderRow,
  TableScroll,
} from "@/components/eridanus/table-kit";
import { notify } from "@/components/eridanus/toaster";
import { ToneBadge } from "@/components/eridanus/tone-badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PROJECTS = [
  { id: "tenant_moderation", name: "Moderation", runs: "1,843", open: true },
  { id: "tenant_search_rank", name: "Search ranking", runs: "264", open: true },
  { id: "tenant_live_gift", name: "Live gifts", runs: "", open: false },
  { id: "tenant_ads_report", name: "Ads report", runs: "", open: false },
];

export default function HeaderShellDemo() {
  const [admin, setAdmin] = useState(true);
  const [page, setPage] = useState(0);

  return (
    <div className="h-[34rem] w-full overflow-hidden rounded-lg border in-data-fullscreen:h-full">
      <AppHeaderShell
        className="h-full"
        brand={{ name: "w0", logo: <span>w0</span> }}
        links={[{ label: "Docs", href: "/docs", external: true }]}
        actions={
          admin ? (
            <Button size="sm" variant="secondary">
              <GearSixIcon />
              Admin console
            </Button>
          ) : (
            // A disabled button takes no pointer, so the tooltip hangs on a
            // focusable wrapper that says why.
            <Tooltip>
              <TooltipTrigger
                render={
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- keyboard users reach the reason too
                  <span
                    tabIndex={0}
                    className="rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  />
                }
              >
                <Button size="sm" variant="secondary" disabled>
                  <GearSixIcon />
                  Admin console
                </Button>
              </TooltipTrigger>
              <TooltipContent>Needs a super admin</TooltipContent>
            </Tooltip>
          )
        }
        account={{
          name: "Avery Lin",
          email: "lin@example.com",
          toggles: [
            {
              label: "Admin",
              icon: <ShieldCheckIcon />,
              checked: admin,
              onCheckedChange: setAdmin,
            },
          ],
          onSignOut: () => notify("Signed out"),
        }}
        renderLink={(href) => (
          // eslint-disable-next-line jsx-a11y/anchor-has-content -- the shell renders the label into it
          <a href={href} onClick={(e) => e.preventDefault()} />
        )}
      >
        <Page narrow className="gap-3">
          <PageHeader
            title="Projects"
            actions={<Button size="sm">New project</Button>}
          />
          <TableScroll page>
            <Table>
              <TableHeaderRow variant="filled">
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Runs, 24h</TableHead>
              </TableHeaderRow>
              <TableBody>
                {PROJECTS.map((p) => {
                  const cells = (
                    <>
                      <TableCell>
                        <div className="flex flex-col">
                          {p.open ? (
                            <a
                              href={`/projects/${p.id}`}
                              onClick={(e) => e.preventDefault()}
                              className="font-medium"
                            >
                              {p.name}
                            </a>
                          ) : (
                            <span className="font-medium">{p.name}</span>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {p.id}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <ToneBadge tone="neutral">Active</ToneBadge>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {p.open ? p.runs : "—"}
                      </TableCell>
                    </>
                  );
                  return p.open ? (
                    <ClickableRow key={p.id}>{cells}</ClickableRow>
                  ) : (
                    <LockedRow key={p.id} reason="No access">
                      {cells}
                    </LockedRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableScroll>
          {/* Four projects fit on one page, so the pager stays away. */}
          <Pager
            total={PROJECTS.length}
            page={page}
            pageSize={20}
            onPage={setPage}
            hideSinglePage
          />
        </Page>
      </AppHeaderShell>
    </div>
  );
}
