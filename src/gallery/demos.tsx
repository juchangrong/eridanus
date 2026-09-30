import { LockSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import { type ReactNode, useMemo, useState } from "react";

import { ConfirmDialog } from "@/components/eridanus/confirm-dialog";
import { CopyButton } from "@/components/eridanus/copy-button";
import { EmptyState } from "@/components/eridanus/empty-state";
import { FilterSelect } from "@/components/eridanus/filter-select";
import { FormInput } from "@/components/eridanus/form-input";
import { Meter } from "@/components/eridanus/meter";
import { Notice } from "@/components/eridanus/notice";
import {
  FactLine,
  Facts,
  PageHeader,
  Section,
  StatStrip,
} from "@/components/eridanus/page-layout";
import { defaultPagerLabels, Pager } from "@/components/eridanus/pager";
import { PersonAvatar } from "@/components/eridanus/person-avatar";
import { SearchField } from "@/components/eridanus/search-field";
import {
  ClickableRow,
  TableHeaderRow,
  TableRows,
  TableScroll,
} from "@/components/eridanus/table-kit";
import { useTheme } from "@/components/eridanus/theme-provider";
import { Time } from "@/components/eridanus/time";
import { notify } from "@/components/eridanus/toaster";
import { type Tone, ToneBadge } from "@/components/eridanus/tone-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead } from "@/components/ui/table";
import { useDebouncedValue } from "@/hooks/eridanus/use-debounced-value";
import { usePaging } from "@/hooks/eridanus/use-paging";
import { copyText } from "@/lib/eridanus/clipboard";
import {
  clock,
  exactTime,
  friendly,
  relative,
  timestamp,
} from "@/lib/eridanus/format-time";

import { ThemeSwitch } from "./theme-switch";

// Sample data is generated relative to page load, so relative times read the
// same whenever the gallery is opened.
const NOW = Date.now();
const MIN = 60_000;
const DAY = 24 * 60 * MIN;
const ago = (ms: number) => new Date(NOW - ms).toISOString();

/** Instants that land in each of friendly()'s calendar forms at any time of
 * day: "today" stays at least six hours from now, out of the relative range,
 * and "this year" moves to December in January. */
function calendarSamples() {
  const now = new Date(NOW);
  const year = now.getFullYear();
  const day = (offset: number, hours: number, minutes = 5, seconds = 9) =>
    new Date(
      year,
      now.getMonth(),
      now.getDate() + offset,
      hours,
      minutes,
      seconds,
    ).toISOString();
  return {
    today: day(0, now.getHours() < 12 ? 18 : 6),
    yesterday: day(-1, 14),
    thisYear: new Date(
      year,
      now.getMonth() === 0 ? 11 : 0,
      15,
      9,
      30,
    ).toISOString(),
    earlier: new Date(year - 1, 11, 3, 9, 30).toISOString(),
  };
}
const CAL = calendarSamples();

const STATUSES = [
  "completed",
  "running",
  "failed",
  "pending",
  "cancelled",
] as const;
type Status = (typeof STATUSES)[number];
const STATUS_TONE: Record<Status, Tone> = {
  completed: "success",
  running: "info",
  failed: "error",
  pending: "neutral",
  cancelled: "outline",
};
const STATUS_OPTIONS = STATUSES.map((s) => ({ value: s, label: s }));
const WORKFLOWS = [
  "syncCatalog",
  "sendDigest",
  "resizeImages",
  "buildWeeklyReport",
];
const RUNS = Array.from({ length: 137 }, (_, i) => ({
  id: `run_${(0x2f5a1c3 + i * 7919).toString(36)}${(0x9b2e + i * 131).toString(36)}`,
  workflow: WORKFLOWS[i % WORKFLOWS.length]!,
  status: STATUSES[(i * 3) % STATUSES.length]!,
  createdAt: ago(i * 37 * MIN + 20_000),
}));

/** A caption on the left, the thing it names on the right. */
function Row({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-1.5 text-sm sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-center">
      <span className="text-muted-foreground">{label}</span>
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        {children}
      </div>
    </div>
  );
}

function Mono({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[13px] text-foreground">{children}</span>
  );
}

function BaseDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Row label="字体">
        <span className="flex flex-col gap-1">
          <span className="font-heading text-lg font-medium tracking-tight">
            Weekly report · 周报生成
          </span>
          <span className="text-muted-foreground">
            拉丁字母用 Inter，代码和标识用 JetBrains Mono，中文跟随系统字体。
          </span>
        </span>
      </Row>
      <Row label="等宽">
        <Mono>run_3k9x2m7qa1b8 · 2026-09-28 14:05:31.207 UTC+8</Mono>
      </Row>
      <Row label="按钮">
        {(
          ["default", "secondary", "outline", "ghost", "destructive"] as const
        ).map((variant) => (
          <Button key={variant} size="sm" variant={variant}>
            {variant}
          </Button>
        ))}
      </Row>
      <Row label="输入">
        <Input
          aria-label="示例输入"
          placeholder="输入框和按钮同一套圆角"
          className="h-7 max-w-72"
        />
      </Row>
      <Row label="文字色">
        <span className="text-foreground">foreground</span>
        <span className="text-muted-foreground">muted-foreground</span>
        <span className="text-destructive">destructive</span>
      </Row>
    </div>
  );
}

function StatusColorsDemo() {
  const tokens = [
    [
      "success",
      "text-success",
      "bg-success/10 dark:bg-success/20",
      "已完成 12,840",
    ],
    [
      "warning",
      "text-warning",
      "bg-warning/10 dark:bg-warning/20",
      "队列积压 168",
    ],
    ["info", "text-info", "bg-info/10 dark:bg-info/20", "运行中 37"],
    [
      "destructive",
      "text-destructive",
      "bg-destructive/10 dark:bg-destructive/20",
      "失败率 2.7%",
    ],
  ] as const;
  return (
    <div className="flex flex-col gap-3">
      {tokens.map(([token, ink, tint, sample]) => (
        <Row key={token} label={<Mono>{token}</Mono>}>
          <span className={`font-medium ${ink}`}>{sample}</span>
          <span
            className={`rounded-md px-2 py-0.5 text-xs font-medium ${ink} ${tint}`}
          >
            {sample}
          </span>
        </Row>
      ))}
    </div>
  );
}

function ThemeDemo() {
  const { preference, resolved } = useTheme();
  return (
    <div className="flex flex-wrap items-center gap-4">
      <ThemeSwitch />
      <FactLine>
        <span>
          选择 <Mono>{preference}</Mono>
        </span>
        <span>
          生效 <Mono>{resolved}</Mono>
        </span>
      </FactLine>
    </div>
  );
}

function RunsTable() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const query = useDebouncedValue(q);
  const paging = usePaging([query, status], 10);
  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return RUNS.filter(
      (r) =>
        (!status || r.status === status) &&
        (!needle || `${r.id} ${r.workflow}`.toLowerCase().includes(needle)),
    );
  }, [query, status]);
  const page = rows.slice(paging.offset, paging.offset + paging.pageSize);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <SearchField
          label="搜索运行"
          placeholder="工作流或 Run ID"
          value={q}
          onChange={setQ}
        />
        <FilterSelect
          label="状态"
          value={status}
          onChange={setStatus}
          options={STATUS_OPTIONS}
        />
      </div>
      <TableScroll className="max-h-[26rem]">
        <Table>
          <TableHeaderRow>
            <TableHead>运行</TableHead>
            <TableHead>工作流</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>创建时间</TableHead>
          </TableHeaderRow>
          <TableBody>
            <TableRows
              colSpan={4}
              rows={page}
              empty={{
                title: "没有匹配的运行",
                description: "换个关键词，或放宽筛选条件。",
              }}
            >
              {(run) => (
                <ClickableRow
                  key={run.id}
                  tone={run.status === "failed" ? "error" : undefined}
                >
                  <TableCell>
                    <button
                      type="button"
                      className="rounded-sm font-mono text-[13px] underline decoration-foreground/30 underline-offset-[3px] outline-offset-2 hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-ring"
                      onClick={() =>
                        notify("打开运行", { description: run.id })
                      }
                    >
                      {run.id}
                    </button>
                  </TableCell>
                  <TableCell className="font-mono text-[13px]">
                    {run.workflow}
                  </TableCell>
                  <TableCell>
                    <ToneBadge tone={STATUS_TONE[run.status]}>
                      {run.status}
                    </ToneBadge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <Time value={run.createdAt} />
                  </TableCell>
                </ClickableRow>
              )}
            </TableRows>
          </TableBody>
        </Table>
      </TableScroll>
      <Pager
        {...paging}
        total={rows.length}
        pageSizes={[10, 20, 50]}
        labels={{ ...defaultPagerLabels, navigation: "运行列表分页" }}
      />
    </div>
  );
}

/** `navigation` names the pager's landmark, which must differ between the
 * pagers on one page. */
function PagingDemo({ navigation }: { navigation: string }) {
  const [status, setStatus] = useState("");
  const paging = usePaging([status], 20);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <FilterSelect
          label="状态"
          value={status}
          onChange={setStatus}
          options={STATUS_OPTIONS}
        />
        <span className="text-sm text-muted-foreground">
          翻到后面几页再换筛选值，页码回到第 1 页。
        </span>
      </div>
      <Pager
        {...paging}
        total={173}
        labels={{ ...defaultPagerLabels, navigation }}
      />
      <FactLine>
        <span>
          page <Mono>{paging.page}</Mono>
        </span>
        <span>
          offset <Mono>{paging.offset}</Mono>
        </span>
        <span>
          query <Mono>{paging.query}</Mono>
        </span>
      </FactLine>
    </div>
  );
}

function FilterSelectDemo() {
  const [status, setStatus] = useState("failed");
  const [workflow, setWorkflow] = useState("");
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <FilterSelect
          label="状态"
          value={status}
          onChange={setStatus}
          options={STATUS_OPTIONS}
        />
        <FilterSelect
          label="工作流"
          value={workflow}
          onChange={setWorkflow}
          options={WORKFLOWS.map((w) => ({ value: w, label: w }))}
        />
      </div>
      <FactLine>
        <span>
          status <Mono>{JSON.stringify(status)}</Mono>
        </span>
        <span>
          workflow <Mono>{JSON.stringify(workflow)}</Mono>
        </span>
      </FactLine>
    </div>
  );
}

function SearchFieldDemo() {
  const [small, setSmall] = useState("");
  const [regular, setRegular] = useState("syncCatalog");
  return (
    <div className="flex flex-col gap-3">
      <Row label={<Mono>size="sm"</Mono>}>
        <SearchField
          label="搜索运行"
          placeholder="工作流或 Run ID"
          value={small}
          onChange={setSmall}
        />
      </Row>
      <Row label={<Mono>size="default"</Mono>}>
        <SearchField
          label="搜索工作流"
          size="default"
          placeholder="工作流名称"
          value={regular}
          onChange={setRegular}
        />
      </Row>
    </div>
  );
}

function DebounceDemo() {
  const [value, setValue] = useState("");
  const settled = useDebouncedValue(value);
  return (
    <div className="flex flex-col gap-3">
      <SearchField
        label="输入试试"
        placeholder="输入试试，Esc 清空"
        value={value}
        onChange={setValue}
      />
      <FactLine>
        <span>
          输入 <Mono>{value || "—"}</Mono>
        </span>
        <span>
          停顿 250ms 后 <Mono>{settled || "—"}</Mono>
        </span>
      </FactLine>
    </div>
  );
}

const SLUG = /^[a-z0-9_]+$/;

function FormDemo() {
  const [slug, setSlug] = useState("Order-Sync");
  const error = !slug
    ? "填写项目标识"
    : SLUG.test(slug)
      ? undefined
      : "只能用小写字母、数字和下划线";
  return (
    <div className="grid max-w-xl gap-4 sm:grid-cols-2">
      <FormInput label="显示名称" placeholder="例如：订单同步" />
      <FormInput
        label="项目标识"
        required
        className="font-mono"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        description="创建后不可修改"
        error={error}
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
}

function ConfirmDemo() {
  const [attempts, setAttempts] = useState(0);
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <ConfirmDialog
        trigger={
          <Button size="sm" variant="destructive">
            <TrashIcon data-icon="inline-start" />
            清理失败任务
          </Button>
        }
        title="清理失败任务？"
        description="删除 12 个重试次数已用完的任务，删除后无法恢复。"
        confirmLabel="清理失败任务"
        destructive
        onConfirm={async () => {
          await new Promise((resolve) => setTimeout(resolve, 800));
          setAttempts((n) => n + 1);
          if (attempts === 0) throw new Error("服务返回 503，可以稍后重试");
          notify("已清理 12 个任务");
        }}
      />
      <span className="text-sm text-muted-foreground">
        第一次确认会模拟失败，展示对话框里的错误状态。
      </span>
    </div>
  );
}

const SAMPLE = ago(3 * DAY + 5 * 60 * MIN);

/** A live demo for each registry item, keyed by item name. */
export const DEMOS: Record<string, () => ReactNode> = {
  base: BaseDemo,
  "status-colors": StatusColorsDemo,
  "theme-provider": ThemeDemo,
  "ui-guidelines": () => (
    <p className="max-w-3xl text-sm text-pretty text-muted-foreground">
      安装后写入{" "}
      <code className="text-foreground">
        .claude/skills/eridanus-ui/SKILL.md
      </code>
      ：设计规则、组件目录和列表页写法。Claude Code
      在这个项目里写界面时会按需加载。
    </p>
  ),
  time: () => (
    <div className="flex flex-col gap-3">
      <Row label="十秒内">
        <Time value={ago(5_000)} />
      </Row>
      <Row label="一小时内">
        <Time value={ago(12 * MIN)} />
      </Row>
      <Row label="今天">
        <Time value={CAL.today} />
      </Row>
      <Row label="昨天">
        <Time value={CAL.yesterday} />
      </Row>
      <Row label="今年">
        <Time value={CAL.thisYear} />
      </Row>
      <Row label="往年">
        <Time value={CAL.earlier} />
      </Row>
      <Row label="将来">
        <Time value={new Date(NOW + 20 * MIN).toISOString()} />
      </Row>
      <Row label={<Mono>clock</Mono>}>
        <Time value={CAL.yesterday} clock />
      </Row>
      <Row label={<Mono>seconds</Mono>}>
        <Time value={CAL.yesterday} seconds />
      </Row>
      <Row label="缺失">
        <Time value={null} />
      </Row>
    </div>
  ),
  "format-time": () => (
    <Facts
      items={(
        [
          ["friendly(t)", friendly(SAMPLE)],
          [
            "friendly(t, { seconds: true })",
            friendly(SAMPLE, { seconds: true }),
          ],
          ["relative(t)", relative(SAMPLE)],
          ["clock(t)", clock(SAMPLE)],
          ["timestamp(t)", timestamp(SAMPLE)],
          ["exactTime(t).local", exactTime(SAMPLE)?.local],
          ["exactTime(t).utc", exactTime(SAMPLE)?.utc],
        ] as const
      ).map(([call, value]) => ({
        label: <code className="text-[13px]">{call}</code>,
        value,
      }))}
    />
  ),
  "tone-badge": () => (
    <div className="flex flex-wrap items-center gap-2">
      {(
        ["success", "error", "info", "warning", "neutral", "outline"] as const
      ).map((tone) => (
        <ToneBadge key={tone} tone={tone}>
          {tone}
        </ToneBadge>
      ))}
    </div>
  ),
  notice: () => (
    <div className="flex max-w-3xl flex-col gap-3">
      <Notice
        tone="error"
        title="运行记录加载失败"
        description="服务返回 500，可以稍后重试。"
        action={
          <Button
            size="sm"
            variant="secondary"
            onClick={() => notify("已重新加载")}
          >
            重试
          </Button>
        }
      />
      <Notice
        tone="warning"
        title="一个项目只对应一个环境"
        description="预发、灰度和生产各建一个项目。"
      />
      <Notice description="你可以查看这个项目，但只有管理员能修改设置。" />
    </div>
  ),
  "empty-state": () => (
    <EmptyState
      icon={<LockSimpleIcon />}
      title="没有这个项目的访问权限"
      description="请联系项目管理员，把你加为成员。"
      contents={
        <Button size="sm" variant="secondary">
          返回项目列表
        </Button>
      }
    />
  ),
  "copy-button": () => (
    <div className="flex items-center gap-1">
      <Mono>run_3k9x2m7qa1b8</Mono>
      <CopyButton text="run_3k9x2m7qa1b8" label="复制 Run ID" />
    </div>
  ),
  clipboard: () => (
    <Button
      size="sm"
      variant="secondary"
      onClick={() =>
        void copyText("npx shadcn@latest add juchangrong/eridanus/time").then(
          () => notify("已复制安装命令"),
          () =>
            notify("复制失败", {
              type: "error",
              description: "浏览器拒绝了剪贴板访问。",
            }),
        )
      }
    >
      复制 time 的安装命令
    </Button>
  ),
  "person-avatar": () => (
    <div className="flex flex-wrap items-center gap-5 text-sm">
      {["liuyang", "chenxi@example.com", "wangfang"].map((name) => (
        <span key={name} className="inline-flex items-center gap-2">
          <PersonAvatar name={name} />
          {name.replace(/@.*$/, "")}
        </span>
      ))}
    </div>
  ),
  meter: () => (
    <div className="grid max-w-md gap-5">
      <Meter label="在途运行" value={37} max={200} valueText="37 / 200" />
      <Meter label="在途运行" value={196} max={200} valueText="196 / 200" />
    </div>
  ),
  toaster: () => (
    <div className="flex flex-wrap gap-2">
      <Button
        size="sm"
        variant="secondary"
        onClick={() => notify("设置已保存")}
      >
        成功提示
      </Button>
      <Button
        size="sm"
        variant="secondary"
        onClick={() =>
          notify("保存失败", {
            type: "error",
            description: "服务返回 409：配置已被其他人修改。",
          })
        }
      >
        错误提示
      </Button>
    </div>
  ),
  "confirm-dialog": ConfirmDemo,
  "form-input": FormDemo,
  "search-field": SearchFieldDemo,
  "filter-select": FilterSelectDemo,
  "page-layout": () => (
    <div className="flex flex-col gap-10">
      <PageHeader
        title="订单同步"
        badges={
          <>
            <ToneBadge tone="success">启用</ToneBadge>
            <ToneBadge tone="outline">生产</ToneBadge>
          </>
        }
        actions={<Button size="sm">立即同步</Button>}
        meta={
          <FactLine>
            <span className="font-mono">order_sync</span>
            <span>
              创建于 <Time value={ago(90 * DAY)} />
            </span>
            <span>3 个管理员</span>
          </FactLine>
        }
      />
      <StatStrip
        items={[
          { label: "24 小时运行", value: "12,840" },
          { label: "失败率", value: "0.7%", tone: "danger", hint: "96 次失败" },
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
    </div>
  ),
  "table-kit": RunsTable,
  pager: () => <PagingDemo navigation="Pager 示例分页" />,
  "use-paging": () => <PagingDemo navigation="usePaging 示例分页" />,
  "use-debounced-value": DebounceDemo,
};
