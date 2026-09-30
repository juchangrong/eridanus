import type { ReactNode } from "react";
import { useSyncExternalStore } from "react";

import { CopyButton } from "@/components/eridanus/copy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { DocEntry } from "../catalog";
import { CodeBlock, Highlighted } from "./code-block";

const MANAGERS = ["pnpm", "npm", "yarn", "bun"] as const;
type Manager = (typeof MANAGERS)[number];

const RUN: Record<Manager, string> = {
  pnpm: "pnpm dlx",
  npm: "npx",
  yarn: "yarn",
  bun: "bunx --bun",
};
const ADD: Record<Manager, string> = {
  pnpm: "pnpm add",
  npm: "npm install",
  yarn: "yarn add",
  bun: "bun add",
};

// One choice for every command on every page, remembered across visits.
const STORAGE_KEY = "eridanus-docs-package-manager";
const listeners = new Set<() => void>();
let manager: Manager = (() => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return MANAGERS.find((m) => m === stored) ?? "pnpm";
  } catch {
    return "pnpm";
  }
})();

function useManager() {
  const value = useSyncExternalStore(
    (onChange) => {
      listeners.add(onChange);
      return () => listeners.delete(onChange);
    },
    () => manager,
  );
  const set = (next: Manager) => {
    manager = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    for (const l of listeners) l();
  };
  return [value, set] as const;
}

const isManager = (value: unknown): value is Manager =>
  MANAGERS.some((m) => m === value);

/** A shell command in each package manager's form, with tabs to pick one. */
export function CommandBlock({ run, add }: { run?: string; add?: string[] }) {
  const [current, setCurrent] = useManager();
  const command = (m: Manager) =>
    run ? `${RUN[m]} ${run}` : `${ADD[m]} ${add?.join(" ")}`;
  return (
    <Tabs
      value={current}
      onValueChange={(next) => {
        if (isManager(next)) setCurrent(next);
      }}
      className="gap-0 overflow-hidden rounded-xl bg-(--code)"
    >
      <div className="flex h-10 items-center gap-2 border-b border-border/60 ps-2 pe-1.5">
        <TabsList variant="line" aria-label="包管理器" className="h-8">
          {MANAGERS.map((m) => (
            <TabsTrigger key={m} value={m} className="px-2 font-mono text-xs">
              {m}
            </TabsTrigger>
          ))}
        </TabsList>
        <CopyButton
          text={command(current)}
          label="复制命令"
          className="ms-auto hover:bg-background dark:hover:bg-background/60"
        />
      </div>
      {MANAGERS.map((m) => (
        <TabsContent key={m} value={m}>
          <Highlighted code={command(m)} lang="bash" />
        </TabsContent>
      ))}
    </Tabs>
  );
}

function Steps({ children }: { children: ReactNode }) {
  return (
    <ol className="m-0 flex list-none flex-col gap-8 ps-0 [counter-reset:step]">
      {children}
    </ol>
  );
}

function Step({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <li className="relative flex flex-col gap-3 border-s ps-8 [counter-increment:step] before:absolute before:-start-3.5 before:top-0 before:flex before:size-7 before:items-center before:justify-center before:rounded-full before:border-4 before:border-background before:bg-muted before:font-mono before:text-xs before:font-medium before:content-[counter(step)]">
      <h4 className="m-0 pt-0.5 text-sm font-medium">{title}</h4>
      {children}
    </li>
  );
}

function cssOf(cssVars: NonNullable<DocEntry["cssVars"]>) {
  const block = (selector: string, vars: Record<string, string> = {}) =>
    Object.keys(vars).length
      ? `${selector} {\n${Object.entries(vars)
          .map(([k, v]) => `  --${k}: ${v};`)
          .join("\n")}\n}`
      : "";
  return [
    block("@theme inline", cssVars.theme),
    block(":root", cssVars.light),
    block(".dark", cssVars.dark),
  ]
    .filter(Boolean)
    .join("\n\n");
}

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.85em]">
      {children}
    </code>
  );
}

/** 命令行 and 手动 install instructions, shadcn-docs style. */
export function Installation({ entry }: { entry: DocEntry }) {
  const hasCode = entry.files.some((f) => /\.tsx?$/.test(f.path));
  return (
    <Tabs defaultValue="cli" className="gap-4">
      <TabsList variant="line" aria-label="安装方式">
        <TabsTrigger value="cli">命令行</TabsTrigger>
        <TabsTrigger value="manual">手动</TabsTrigger>
      </TabsList>
      <TabsContent value="cli" className="flex flex-col gap-3">
        <CommandBlock run={entry.install} />
        {entry.kind === "eridanus" ? (
          <p className="m-0 text-sm text-muted-foreground">
            仓库是私有的，CLI 用你的 GitHub 凭据读取：先运行{" "}
            <Code>gh auth login</Code>，或者设置 <Code>GH_TOKEN</Code>。
          </p>
        ) : null}
      </TabsContent>
      <TabsContent value="manual">
        <Steps>
          {entry.dependencies.length ? (
            <Step title="安装依赖包">
              <CommandBlock add={entry.dependencies} />
            </Step>
          ) : null}
          {entry.registryDependencies.length ? (
            <Step title="添加它用到的条目">
              <CommandBlock
                run={`shadcn@latest add ${entry.registryDependencies.join(" ")}`}
              />
            </Step>
          ) : null}
          {entry.cssVars ? (
            <Step title="把这些变量加进全局 CSS">
              <CodeBlock code={cssOf(entry.cssVars)} lang="css" collapsible />
            </Step>
          ) : null}
          {entry.files.map((file) => (
            <Step
              key={file.path}
              title={
                <>
                  把下面的代码复制到 <Code>{file.target}</Code>
                </>
              }
            >
              <CodeBlock
                code={file.source.trim()}
                lang={file.path.endsWith(".md") ? "markdown" : "tsx"}
                title={file.target}
                collapsible
              />
            </Step>
          ))}
          {hasCode ? (
            <Step title="按项目的路径别名调整 import">
              <p className="m-0 text-sm text-muted-foreground">
                代码按 <Code>@/components</Code>、<Code>@/lib</Code>、
                <Code>@/hooks</Code> 的别名写成，和 shadcn 默认的{" "}
                <Code>components.json</Code> 一致。
              </p>
            </Step>
          ) : null}
        </Steps>
      </TabsContent>
    </Tabs>
  );
}
