import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

import { type DocEntry, exportedNames, ORDER } from "../catalog";
import { CodeBlock } from "../components/code-block";
import { ComponentPreview } from "../components/component-preview";
import { Installation } from "../components/installation";
import { Prose } from "../components/prose";
import { TableOfContents, type TocItem } from "../components/toc";
import { examplesFor } from "../examples";
import { docHref } from "../router";

const HEADING =
  "m-0 scroll-mt-20 font-heading font-semibold tracking-tight outline-none";

function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} tabIndex={-1} className={`${HEADING} border-b pb-2 text-xl`}>
      {children}
    </h2>
  );
}

function usageOf(entry: DocEntry) {
  if (!entry.importPath) return undefined;
  const source = entry.files.find((f) => /\.tsx?$/.test(f.path))?.source ?? "";
  const names = exportedNames(source);
  if (names.length === 0) return undefined;
  const oneLine = `import { ${names.join(", ")} } from "${entry.importPath}";`;
  return oneLine.length <= 80
    ? oneLine
    : `import {\n${names.map((n) => `  ${n},`).join("\n")}\n} from "${entry.importPath}";`;
}

function Pager({ entry }: { entry: DocEntry }) {
  const index = ORDER.indexOf(entry);
  const previous = ORDER[index - 1];
  const next = ORDER[index + 1];
  return (
    <nav
      aria-label="上一页和下一页"
      className="flex items-center justify-between gap-4 pt-6"
    >
      {previous ? (
        <Button
          variant="secondary"
          size="sm"
          nativeButton={false}
          render={<a href={docHref(previous.name)} />}
        >
          <CaretLeftIcon data-icon="inline-start" />
          <span className="sr-only">上一页：</span>
          {previous.title}
        </Button>
      ) : (
        <span />
      )}
      {next ? (
        <Button
          variant="secondary"
          size="sm"
          nativeButton={false}
          render={<a href={docHref(next.name)} />}
        >
          <span className="sr-only">下一页：</span>
          {next.title}
          <CaretRightIcon data-icon="inline-end" />
        </Button>
      ) : null}
    </nav>
  );
}

export function DocPage({ entry }: { entry: DocEntry }) {
  const { demo, more } = examplesFor(entry.name);
  const usage = usageOf(entry);
  const toc: TocItem[] = [
    { id: "installation", title: "安装", depth: 2 },
    ...(usage ? [{ id: "usage", title: "用法", depth: 2 } as const] : []),
    ...(more.length
      ? [
          { id: "examples", title: "示例", depth: 2 } as const,
          ...more.map(
            (e) =>
              ({
                id: `example-${e.name}`,
                title: e.title ?? e.name,
                depth: 3,
              }) as const,
          ),
        ]
      : []),
  ];

  return (
    <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_13rem]">
      <article className="flex min-w-0 flex-col gap-10 pb-16">
        <header className="flex flex-col gap-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={docHref()}>文档</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>{entry.group}</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{entry.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex flex-wrap items-center gap-3">
            <h1 id="page-title" tabIndex={-1} className={`${HEADING} text-3xl`}>
              {entry.title}
            </h1>
            <Badge variant="outline" className="font-mono">
              {entry.type}
            </Badge>
          </div>
          <p
            lang={entry.lang}
            className="m-0 max-w-2xl text-base text-pretty text-muted-foreground"
          >
            <Prose text={entry.description} />
          </p>
        </header>

        {demo ? <ComponentPreview example={demo} /> : null}

        <section aria-labelledby="installation" className="flex flex-col gap-5">
          <H2 id="installation">安装</H2>
          <Installation entry={entry} />
        </section>

        {usage ? (
          <section aria-labelledby="usage" className="flex flex-col gap-5">
            <H2 id="usage">用法</H2>
            <CodeBlock code={usage} />
          </section>
        ) : null}

        {more.length ? (
          <section aria-labelledby="examples" className="flex flex-col gap-10">
            <H2 id="examples">示例</H2>
            {more.map((example) => (
              <section
                key={example.name}
                aria-labelledby={`example-${example.name}`}
                className="flex flex-col gap-3"
              >
                <h3
                  id={`example-${example.name}`}
                  tabIndex={-1}
                  className={`${HEADING} text-lg`}
                >
                  {example.title ?? example.name}
                </h3>
                {example.description ? (
                  <p className="m-0 max-w-2xl text-sm text-pretty text-muted-foreground">
                    {example.description}
                  </p>
                ) : null}
                <ComponentPreview example={example} />
              </section>
            ))}
          </section>
        ) : null}

        <Pager entry={entry} />
      </article>
      <aside className="sticky top-24 hidden max-h-[calc(100svh-7rem)] self-start overflow-y-auto xl:block">
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
