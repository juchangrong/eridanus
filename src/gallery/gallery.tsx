import { GithubLogoIcon } from "@phosphor-icons/react";
import { Fragment, type ReactNode, useEffect, useState } from "react";

import { CopyButton } from "@/components/eridanus/copy-button";
import { Button } from "@/components/ui/button";

import {
  type CatalogItem,
  catalog,
  installCommand,
  REPOSITORY,
} from "./catalog";
import { DEMOS } from "./demos";
import { ThemeSwitch } from "./theme-switch";

/** Nav and page order. An item not listed here still shows, under 其他. */
const GROUPS = [
  {
    title: "起步",
    names: ["base", "status-colors", "theme-provider", "ui-guidelines"],
  },
  {
    title: "展示",
    names: ["time", "tone-badge", "person-avatar", "meter", "copy-button"],
  },
  {
    title: "反馈",
    names: ["notice", "empty-state", "toaster", "confirm-dialog"],
  },
  {
    title: "表单与筛选",
    names: ["form-input", "search-field", "filter-select"],
  },
  { title: "表格与页面", names: ["table-kit", "pager", "page-layout"] },
  {
    title: "函数与 Hook",
    names: ["format-time", "clipboard", "use-debounced-value", "use-paging"],
  },
];

function groupCatalog(): { title: string; items: CatalogItem[] }[] {
  const byName = new Map(catalog.map((item) => [item.name, item]));
  const listed = new Set(GROUPS.flatMap((g) => g.names));
  return [
    ...GROUPS.map((g) => ({
      title: g.title,
      items: g.names.flatMap((name) => byName.get(name) ?? []),
    })),
    { title: "其他", items: catalog.filter((item) => !listed.has(item.name)) },
  ].filter((g) => g.items.length > 0);
}

const SECTIONS = groupCatalog();
const IDS = SECTIONS.flatMap((g) => g.items.map((item) => item.name));

/** The last item whose section starts in the top third of the viewport or
 * above it, or the last item once the page cannot scroll further. */
function useCurrentItem(ids: readonly string[]) {
  const [current, setCurrent] = useState<string>();
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const atBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 2;
        const line = window.innerHeight / 3;
        let found: string | undefined;
        for (const id of ids) {
          const top = document.getElementById(id)?.getBoundingClientRect().top;
          if (top === undefined || top > line) break;
          found = id;
        }
        setCurrent(atBottom ? ids.at(-1) : found);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids]);
  return current;
}

function Code({ children }: { children: ReactNode }) {
  return <code className="text-[0.92em] text-foreground">{children}</code>;
}

/** Registry descriptions mark code with backticks. */
function Prose({ text }: { text: string }) {
  // The parts of a fixed string never reorder, so their index is their key.
  return text.split("`").map((part, i) =>
    i % 2 === 1 ? (
      // biome-ignore lint/suspicious/noArrayIndexKey: see above
      <Code key={i}>{part}</Code>
    ) : (
      // biome-ignore lint/suspicious/noArrayIndexKey: see above
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

function InstallCommand({ command }: { command: string }) {
  return (
    <div className="flex max-w-3xl items-center gap-2 rounded-xl bg-muted py-1 ps-3 pe-1">
      <code className="min-w-0 flex-1 truncate text-[13px]" title={command}>
        {command}
      </code>
      <CopyButton
        text={command}
        label="复制安装命令"
        className="hover:bg-background dark:hover:bg-background/60"
      />
    </div>
  );
}

function Intro() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">
        Eridanus
      </h1>
      <p className="max-w-2xl text-pretty text-muted-foreground">
        基于 Base UI 的 shadcn 组件库，托管在 GitHub。在 shadcn
        自带的原语之外，收录后台页面常用的部件：时间、状态、表格、分页、筛选、确认和通知。组件以源码形式装进项目，升级前用{" "}
        <Code>--diff</Code> 对比上游。
      </p>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">新项目从 base 开始</p>
        <InstallCommand command={`npx shadcn@latest init ${REPOSITORY}/base`} />
      </div>
      <p className="max-w-2xl text-sm text-pretty text-muted-foreground">
        仓库是私有的，CLI 用你的 GitHub 凭据读取：先运行{" "}
        <Code>gh auth login</Code>，或者设置 <Code>GH_TOKEN</Code>
        。已有项目用{" "}
        <Code>npx shadcn@latest add {REPOSITORY}/&lt;名称&gt;</Code>{" "}
        单独添加下面的条目。
      </p>
    </div>
  );
}

function ItemSection({ item }: { item: CatalogItem }) {
  const Demo = DEMOS[item.name];
  return (
    <section
      id={item.name}
      aria-labelledby={`${item.name}-title`}
      className="flex scroll-mt-20 flex-col gap-5"
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3
            id={`${item.name}-title`}
            className="font-heading text-lg font-medium tracking-tight"
          >
            {item.title ?? item.name}
          </h3>
          <span className="font-mono text-xs text-muted-foreground">
            {item.type.replace(/^registry:/, "")}
          </span>
        </div>
        {item.description ? (
          <p
            lang="en"
            className="max-w-3xl text-sm text-pretty text-muted-foreground"
          >
            <Prose text={item.description} />
          </p>
        ) : null}
      </div>
      <InstallCommand command={installCommand(item)} />
      {Demo ? (
        <div className="pt-2">
          <Demo />
        </div>
      ) : null}
    </section>
  );
}

export function Gallery() {
  const current = useCurrentItem(IDS);
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:shadow-md"
      >
        跳到正文
      </a>
      <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-3 px-4 sm:px-6">
          <a href="#top" className="font-heading font-semibold tracking-tight">
            Eridanus
          </a>
          <span className="hidden text-sm text-muted-foreground sm:inline">
            Base UI 上的 shadcn 组件库
          </span>
          <div className="ms-auto flex items-center gap-2">
            <ThemeSwitch />
            <Button
              variant="ghost"
              size="icon-sm"
              nativeButton={false}
              render={
                <a
                  href={`https://github.com/${REPOSITORY}`}
                  aria-label="GitHub 仓库"
                  title="GitHub 仓库"
                />
              }
            >
              <GithubLogoIcon />
            </Button>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-6 lg:grid-cols-[11rem_minmax(0,1fr)]">
        <nav
          aria-label="组件目录"
          className="sticky top-14 hidden max-h-[calc(100svh-3.5rem)] flex-col gap-6 self-start overflow-y-auto py-10 lg:flex"
        >
          {SECTIONS.map((group) => (
            <div key={group.title} className="flex flex-col gap-1">
              <p className="px-2 text-xs font-medium text-muted-foreground">
                {group.title}
              </p>
              <ul className="flex flex-col">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <a
                      href={`#${item.name}`}
                      aria-current={
                        current === item.name ? "location" : undefined
                      }
                      className="block truncate rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-muted hover:text-foreground aria-[current]:font-medium aria-[current]:text-foreground"
                    >
                      {item.title ?? item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <main
          id="main"
          tabIndex={-1}
          className="flex w-full max-w-5xl min-w-0 flex-col gap-24 py-10 outline-none"
        >
          <Intro />
          {SECTIONS.map((group, i) => (
            <section
              key={group.title}
              aria-labelledby={`group-${i}`}
              className="flex flex-col gap-8"
            >
              <h2
                id={`group-${i}`}
                className="font-heading text-2xl font-semibold tracking-tight"
              >
                {group.title}
              </h2>
              <div className="flex flex-col gap-16">
                {group.items.map((item) => (
                  <ItemSection key={item.name} item={item} />
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>
    </>
  );
}
