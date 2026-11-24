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
    reason: "deploy refused: unsupported binding ai",
    owner: "wangfang",
    created: new Date(Date.now() - 50 * HOUR),
  },
] as const;

const TONES = {
  running: "success",
  stopped: "neutral",
  failed: "error",
} as const;
const LABELS = { running: "Running", stopped: "Stopped", failed: "Failed" };

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
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="mine">Mine</TabsTrigger>
          </TabsList>
        </Tabs>
        <SearchField
          value={query}
          onChange={setQuery}
          label="Search services"
          placeholder="Search services"
        />
        <FilterSelect
          label="Status"
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
                      aria-label="More actions"
                    />
                  }
                >
                  <DotsThreeIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Copy ID</DropdownMenuItem>
                  <DropdownMenuItem variant="destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            }
            link={<a href={`#/services/${e.id}`} />}
          />
        ))}
      </EntityCardList>
    </div>
  );
}
