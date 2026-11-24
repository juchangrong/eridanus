import {
  CubeIcon,
  DotsThreeIcon,
  GlobeIcon,
  RobotIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

import { EntityCard, EntityCardList } from "@/components/eridanus/entity-card";
import { FilterSelect } from "@/components/eridanus/filter-select";
import { FactLine, Toolbar } from "@/components/eridanus/page-layout";
import { PersonAvatar } from "@/components/eridanus/person-avatar";
import { SearchField } from "@/components/eridanus/search-field";
import { Time } from "@/components/eridanus/time";
import { ToneBadge } from "@/components/eridanus/tone-badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HOUR = 60 * 60_000;
const ENTRIES = [
  {
    id: "orders-api",
    icon: <GlobeIcon />,
    status: "running",
    facts: ["worker", "2 vCPU", "2 GB"],
    url: "orders-api.example.com",
    owner: "liuyang",
    created: new Date(Date.now() - 12 * HOUR),
  },
  {
    id: "support-agent",
    icon: <RobotIcon />,
    status: "stopped",
    facts: ["agent", "1 vCPU", "1 GB"],
    owner: "chenxi",
    created: new Date(Date.now() - 30 * HOUR),
  },
  {
    id: "img-resizer",
    icon: <CubeIcon />,
    status: "failed",
    reason: "部署被拒：不支持的绑定 ai",
    owner: "wangfang",
    created: new Date(Date.now() - 50 * HOUR),
  },
] as const;

const TONES = {
  running: "success",
  stopped: "neutral",
  failed: "error",
} as const;
const LABELS = { running: "运行中", stopped: "已停止", failed: "失败" };

export default function EntityCardDemo() {
  const [scope, setScope] = useState("all");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const shown = ENTRIES.filter(
    (e) =>
      e.id.includes(query) &&
      (!status || e.status === status) &&
      (scope === "all" || e.owner === "liuyang"),
  );
  return (
    <div className="flex w-full flex-col gap-3">
      <Toolbar>
        <Tabs value={scope} onValueChange={(v) => setScope(String(v))}>
          <TabsList>
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="mine">我的</TabsTrigger>
          </TabsList>
        </Tabs>
        <SearchField
          value={query}
          onChange={setQuery}
          label="搜索服务"
          placeholder="搜索服务"
        />
        <FilterSelect
          label="状态"
          value={status}
          onChange={setStatus}
          options={Object.entries(LABELS).map(([value, label]) => ({
            value,
            label,
          }))}
        />
      </Toolbar>
      <EntityCardList>
        {shown.map((e) => (
          <EntityCard
            key={e.id}
            icon={e.icon}
            title={e.id}
            badge={
              <ToneBadge tone={TONES[e.status]}>{LABELS[e.status]}</ToneBadge>
            }
            subtitle={
              "reason" in e ? (
                <span className="truncate text-destructive">{e.reason}</span>
              ) : (
                <FactLine>
                  {e.facts.map((f) => (
                    <span key={f}>{f}</span>
                  ))}
                  {"url" in e ? (
                    <span>
                      <a
                        href={`https://${e.url}`}
                        className="underline underline-offset-2"
                      >
                        {e.url}
                      </a>
                    </span>
                  ) : null}
                </FactLine>
              )
            }
            aside={
              <span className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5">
                  <PersonAvatar name={e.owner} className="size-5" />
                  {e.owner}
                </span>
                <Time value={e.created} />
              </span>
            }
            menu={
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="更多操作"
                    />
                  }
                >
                  <DotsThreeIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>复制 ID</DropdownMenuItem>
                  <DropdownMenuItem variant="destructive">
                    删除
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            }
            // eslint-disable-next-line jsx-a11y/anchor-has-content -- the card puts the title into it
            link={<a href={`#/services/${e.id}`} />}
          />
        ))}
      </EntityCardList>
    </div>
  );
}
