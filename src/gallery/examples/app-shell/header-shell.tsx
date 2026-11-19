/**
 * 无侧栏的首页
 * AppHeaderShell：选择工作区之前的独立页面，顶栏只有方形 logo、文字链接、操作和头像；页面用窄布局。没有权限的行用 LockedRow 置灰，账号菜单里用 toggles 放一个开关。
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
  { id: "tenant_moderation", name: "内容审核平台", runs: "1,843", open: true },
  { id: "tenant_search_rank", name: "搜索排序回灌", runs: "264", open: true },
  { id: "tenant_live_gift", name: "直播礼物结算", runs: "", open: false },
  { id: "tenant_ads_report", name: "广告日报", runs: "", open: false },
];

export default function HeaderShellDemo() {
  const [admin, setAdmin] = useState(true);
  const [page, setPage] = useState(0);

  return (
    <div className="h-[34rem] w-full overflow-hidden rounded-lg border in-data-fullscreen:h-full">
      <AppHeaderShell
        className="h-full"
        brand={{ name: "w0", logo: <span>w0</span> }}
        links={[{ label: "使用文档", href: "/docs", external: true }]}
        actions={
          admin ? (
            <Button size="sm" variant="secondary">
              <GearSixIcon />
              管理控制台
            </Button>
          ) : (
            // Disabled but still focusable, so the tooltip that says why
            // reaches pointer and keyboard users alike.
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled
                    focusableWhenDisabled
                    className="data-disabled:opacity-50"
                  />
                }
              >
                <GearSixIcon />
                管理控制台
              </TooltipTrigger>
              <TooltipContent>需要超级管理员权限</TooltipContent>
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
          onSignOut: () => notify("已退出登录"),
        }}
        renderLink={(href) => (
          // eslint-disable-next-line jsx-a11y/anchor-has-content -- the shell renders the label into it
          <a href={href} onClick={(e) => e.preventDefault()} />
        )}
      >
        <Page narrow className="gap-3">
          <PageHeader
            title="项目"
            actions={<Button size="sm">新建项目</Button>}
          />
          <TableScroll page>
            <Table>
              <TableHeaderRow variant="filled">
                <TableHead>项目</TableHead>
                <TableHead>状态</TableHead>
                <TableHead className="text-right">24 小时运行</TableHead>
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
                        <ToneBadge tone="neutral">启用</ToneBadge>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {p.open ? p.runs : "—"}
                      </TableCell>
                    </>
                  );
                  return p.open ? (
                    <ClickableRow key={p.id}>{cells}</ClickableRow>
                  ) : (
                    <LockedRow key={p.id} reason="无访问权限">
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
