import { NAV, REPOSITORY } from "../catalog";
import { CommandBlock } from "../components/installation";
import { InlineCode } from "../components/prose";
import { docHref } from "../router";

/** The first sentence of a description, without its code marks. */
const summary = (text: string) =>
  text.replace(/`/g, "").split(/(?<=[.。])\s/)[0];

export function Home() {
  return (
    <article className="flex max-w-4xl flex-col gap-12 pb-16">
      <header className="flex flex-col gap-4">
        <h1
          id="page-title"
          tabIndex={-1}
          className="m-0 font-heading text-3xl font-semibold tracking-tight outline-none"
        >
          Eridanus
        </h1>
        <p className="m-0 max-w-2xl text-base text-pretty text-muted-foreground">
          基于 Base UI 的 shadcn 组件库，托管在 GitHub。在 shadcn
          自带的原语之外，收录后台页面常用的部件：时间、状态、表格、分页、筛选、确认和通知。组件以源码形式装进项目，升级前用{" "}
          <InlineCode>--diff</InlineCode> 对比上游。
        </p>
      </header>

      <section aria-labelledby="quick-start" className="flex flex-col gap-4">
        <h2
          id="quick-start"
          className="m-0 border-b pb-2 font-heading text-xl font-semibold tracking-tight"
        >
          开始
        </h2>
        <p className="m-0 text-sm text-muted-foreground">
          新项目从 base 开始，得到 base-rhea 风格、状态色和对比度修正：
        </p>
        <CommandBlock run={`shadcn@latest init ${REPOSITORY}/base`} />
        <p className="m-0 text-sm text-pretty text-muted-foreground">
          已有的 shadcn 项目单独添加条目：
          <InlineCode>
            npx shadcn@latest add {REPOSITORY}/&lt;名称&gt;
          </InlineCode>
          。仓库是私有的，先运行 <InlineCode>gh auth login</InlineCode> 或设置{" "}
          <InlineCode>GH_TOKEN</InlineCode>。
        </p>
      </section>

      {NAV.map((group) => (
        <section
          key={group.title}
          aria-label={group.title}
          className="flex flex-col gap-4"
        >
          <h2 className="m-0 border-b pb-2 font-heading text-xl font-semibold tracking-tight">
            {group.title}
          </h2>
          <ul className="m-0 grid list-none gap-x-8 gap-y-5 ps-0 sm:grid-cols-2">
            {group.entries.map((entry) => (
              <li key={entry.name}>
                <a
                  href={docHref(entry.name)}
                  className="group flex flex-col gap-1 rounded-md outline-offset-4"
                >
                  <span className="text-sm font-medium underline-offset-4 group-hover:underline">
                    {entry.title}
                  </span>
                  <span
                    lang={entry.lang}
                    className="line-clamp-2 text-sm text-muted-foreground"
                  >
                    {summary(entry.description)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  );
}
