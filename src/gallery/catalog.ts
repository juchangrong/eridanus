/**
 * Every page of the docs. Eridanus items are read from the same registry.json
 * files the CLI reads, so the docs list exactly what can be installed; the
 * shadcn primitives are the files in components/ui, the look `base` gives.
 */

import type { Locale } from "@/lib/eridanus/locale";

import root from "../../registry.json";
import skills from "../../skills/registry.json";
import components from "../components/eridanus/registry.json";
import forks from "../components/ui/registry.json";
import hooks from "../hooks/eridanus/registry.json";
import lib from "../lib/eridanus/registry.json";
import type { Localized } from "./i18n";

export const REPOSITORY = "juchangrong/eridanus";

interface RegistryItem {
  name: string;
  type: string;
  title?: string;
  description?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files?: { path: string; target?: string }[];
  cssVars?: Record<string, Record<string, string>>;
}

export interface DocFile {
  /** Where the file lives in this repository. */
  path: string;
  /** Where the CLI writes it in a consumer project. */
  target: string;
  source: string;
}

export interface DocEntry {
  name: string;
  kind: "eridanus" | "primitive";
  title: string;
  /** Registry descriptions are English only and mark code with backticks;
   * the primitives have both languages. */
  description: Partial<Localized> & { "en-US": string };
  /** registry:component and the like, without the prefix. */
  type: string;
  /** The id of the group the entry is listed under. */
  group: string;
  install: string;
  dependencies: string[];
  registryDependencies: string[];
  files: DocFile[];
  cssVars?: Record<string, Record<string, string>>;
  /** Import path for the usage snippet, when the item is imported at all. */
  importPath?: string;
}

const SOURCES = import.meta.glob<string>(
  [
    "/src/components/eridanus/*.tsx",
    "/src/lib/eridanus/*.ts",
    "/src/hooks/eridanus/*.ts",
    "/src/components/ui/*.tsx",
    "/skills/**/*.md",
  ],
  { eager: true, query: "?raw", import: "default" },
);

/** Sidebar and page order. An Eridanus item not listed here shows under Other. */
const GROUPS: { id: string; title: Localized; names: string[] }[] = [
  {
    id: "start",
    title: { "zh-CN": "起步", "en-US": "Get started" },
    names: [
      "base",
      "status-colors",
      "theme-provider",
      "locale-provider",
      "ui-guidelines",
    ],
  },
  {
    id: "display",
    title: { "zh-CN": "展示", "en-US": "Display" },
    names: [
      "time",
      "tone-badge",
      "id-text",
      "person-avatar",
      "meter",
      "copy-button",
    ],
  },
  {
    id: "feedback",
    title: { "zh-CN": "反馈", "en-US": "Feedback" },
    names: ["notice", "empty-state", "toaster", "confirm-dialog"],
  },
  {
    id: "inputs",
    title: { "zh-CN": "基础控件", "en-US": "Controls" },
    names: [
      "input",
      "textarea",
      "select",
      "input-group",
      "combobox",
      "dropdown-menu",
      "command",
      "button",
      "toggle",
      "toggle-group",
      "tabs",
      "badge",
    ],
  },
  {
    id: "forms",
    title: { "zh-CN": "表单与筛选", "en-US": "Forms and filters" },
    names: [
      "field",
      "form-input",
      "search-field",
      "filter-select",
      "multi-filter",
      "time-range-picker",
    ],
  },
  {
    id: "tables",
    title: { "zh-CN": "表格与页面", "en-US": "Tables and pages" },
    names: [
      "app-shell",
      "table-kit",
      "table-sort",
      "table-selection",
      "pager",
      "page-layout",
      "entity-card",
    ],
  },
  {
    id: "functions",
    title: { "zh-CN": "函数与 Hook", "en-US": "Functions and hooks" },
    names: [
      "format-time",
      "time-range",
      "locale",
      "clipboard",
      "use-debounced-value",
      "use-paging",
      "use-url-state",
    ],
  },
];
const OTHER = { id: "other", title: { "zh-CN": "其他", "en-US": "Other" } };
const PRIMITIVES = {
  id: "primitives",
  title: { "zh-CN": "shadcn 原语", "en-US": "shadcn primitives" },
};

/** The shadcn primitives with a page. sidebar is left out: it only makes
 * sense as a whole app frame, which app-shell shows. input, textarea,
 * select, input-group and the other forks are listed with the Eridanus items. */
const PRIMITIVE_PAGES: Record<
  string,
  { title: string; description: Localized }
> = {
  "alert-dialog": {
    title: "Alert Dialog",
    description: {
      "zh-CN": "打断当前操作、要求用户明确确认的模态对话框。",
      "en-US":
        "A modal dialog that interrupts the task and asks for an explicit confirmation.",
    },
  },
  alert: {
    title: "Alert",
    description: {
      "zh-CN": "页面内的提示条，用于说明状态或需要注意的信息。",
      "en-US":
        "An inline banner for a status or something that needs attention.",
    },
  },
  avatar: {
    title: "Avatar",
    description: {
      "zh-CN": "头像图片，加载失败时显示缩写。",
      "en-US":
        "A profile picture that falls back to initials when it fails to load.",
    },
  },
  breadcrumb: {
    title: "Breadcrumb",
    description: {
      "zh-CN": "显示当前页面在层级中的位置，并提供返回上级的链接。",
      "en-US":
        "Shows where the page sits in the hierarchy, with links back up.",
    },
  },
  calendar: {
    title: "Calendar",
    description: {
      "zh-CN": "选择单个日期或日期范围的日历，基于 react-day-picker。",
      "en-US": "Picks one date or a range of dates; built on react-day-picker.",
    },
  },
  card: {
    title: "Card",
    description: {
      "zh-CN": "带标题、正文和操作区的内容容器。",
      "en-US": "A container with a title, body and an action area.",
    },
  },
  checkbox: {
    title: "Checkbox",
    description: {
      "zh-CN": "勾选或取消一个选项，也用于表格行的多选。",
      "en-US": "Turns one option on or off; also selects table rows.",
    },
  },
  dialog: {
    title: "Dialog",
    description: {
      "zh-CN": "覆盖在页面上的模态窗口，用于不离开当前页的表单或详情。",
      "en-US":
        "A modal window over the page, for a form or details without leaving it.",
    },
  },
  empty: {
    title: "Empty",
    description: {
      "zh-CN": "没有内容时的占位区域：图标、标题、说明和下一步操作。",
      "en-US":
        "The placeholder for no content: an icon, a title, a description and a next step.",
    },
  },
  label: {
    title: "Label",
    description: {
      "zh-CN": "表单控件的可点击标签。",
      "en-US": "A clickable label for a form control.",
    },
  },
  popover: {
    title: "Popover",
    description: {
      "zh-CN": "点击触发、锚定在控件旁的浮层，可以放交互内容。",
      "en-US":
        "A floating panel anchored to a control, opened by a click; it can hold interactive content.",
    },
  },
  "radio-group": {
    title: "Radio Group",
    description: {
      "zh-CN": "一组互斥选项，同一时间只能选中一个。",
      "en-US": "A set of mutually exclusive options; only one can be chosen.",
    },
  },
  separator: {
    title: "Separator",
    description: {
      "zh-CN": "在视觉或语义上分隔内容的分割线。",
      "en-US": "A line that separates content visually or semantically.",
    },
  },
  sheet: {
    title: "Sheet",
    description: {
      "zh-CN": "从屏幕边缘滑出的面板，用于补充内容或次要表单。",
      "en-US":
        "A panel that slides in from the edge of the screen, for extra content or a secondary form.",
    },
  },
  skeleton: {
    title: "Skeleton",
    description: {
      "zh-CN": "内容加载时的占位骨架。",
      "en-US": "A placeholder shape while content loads.",
    },
  },
  spinner: {
    title: "Spinner",
    description: {
      "zh-CN": "表示正在进行中的加载指示器。",
      "en-US": "A loading indicator for work in progress.",
    },
  },
  switch: {
    title: "Switch",
    description: {
      "zh-CN": "立即生效的开关，用于启用或停用一项设置。",
      "en-US":
        "A toggle that takes effect at once, for turning a setting on or off.",
    },
  },
  table: {
    title: "Table",
    description: {
      "zh-CN": "展示结构化数据的表格。",
      "en-US": "Displays structured data in rows and columns.",
    },
  },
  toast: {
    title: "Toast",
    description: {
      "zh-CN": "操作完成后短暂出现的通知。",
      "en-US": "A brief notification after an action finishes.",
    },
  },
  tooltip: {
    title: "Tooltip",
    description: {
      "zh-CN": "悬停或聚焦时显示的简短说明。",
      "en-US": "A short hint shown on hover or focus.",
    },
  },
};

function eridanusEntries(): DocEntry[] {
  const registries = [
    { dir: "", items: root.items },
    { dir: "src/components/ui/", items: forks.items },
    { dir: "src/lib/eridanus/", items: lib.items },
    { dir: "src/hooks/eridanus/", items: hooks.items },
    { dir: "src/components/eridanus/", items: components.items },
    { dir: "skills/", items: skills.items },
  ];
  const groupOf = new Map(
    GROUPS.flatMap((g) => g.names.map((name) => [name, g.id])),
  );
  return registries.flatMap(({ dir, items }) =>
    (items as RegistryItem[]).map((item) => {
      const files = (item.files ?? []).map((file) => {
        const path = dir + file.path;
        return {
          path,
          // registry:ui files without a target land in the ui alias.
          target:
            file.target ??
            (item.type === "registry:ui"
              ? `@components/ui/${file.path}`
              : path),
          source: SOURCES[`/${path}`] ?? "",
        };
      });
      const code = files.find((f) => /\.(tsx?)$/.test(f.path));
      return {
        name: item.name,
        kind: "eridanus",
        title: item.title ?? item.name,
        description: { "en-US": item.description ?? "" },
        type: item.type.replace(/^registry:/, ""),
        group: groupOf.get(item.name) ?? OTHER.id,
        install:
          item.type === "registry:base"
            ? `shadcn@latest init ${REPOSITORY}/${item.name}`
            : `shadcn@latest add ${REPOSITORY}/${item.name}`,
        dependencies: item.dependencies ?? [],
        registryDependencies: item.registryDependencies ?? [],
        files,
        cssVars: item.cssVars,
        importPath: code
          ? code.target
              .replace(/^@(components|lib|hooks)\//, "@/$1/")
              .replace(/\.tsx?$/, "")
          : undefined,
      } satisfies DocEntry;
    }),
  );
}

/** Packages and sibling primitives a primitive's source imports. */
function importsOf(source: string) {
  const specifiers = [...source.matchAll(/from "([^"]+)"/g)].map((m) => m[1]!);
  const packages = specifiers
    .filter((s) => !s.startsWith("@/") && !s.startsWith(".") && s !== "react")
    .map((s) =>
      s.startsWith("@") ? s.split("/").slice(0, 2).join("/") : s.split("/")[0]!,
    );
  const primitives = specifiers.flatMap(
    (s) => s.match(/^@\/components\/ui\/(.+)$/)?.[1] ?? [],
  );
  return {
    packages: [...new Set(packages)],
    primitives: [...new Set(primitives)],
  };
}

function primitiveEntries(): DocEntry[] {
  return Object.entries(PRIMITIVE_PAGES)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, { title, description }]) => {
      const path = `src/components/ui/${name}.tsx`;
      const source = SOURCES[`/${path}`] ?? "";
      const { packages, primitives } = importsOf(source);
      return {
        name,
        kind: "primitive",
        title,
        description,
        type: "ui",
        group: PRIMITIVES.id,
        install: `shadcn@latest add ${name}`,
        dependencies: packages,
        registryDependencies: primitives,
        files: [{ path, target: `components/ui/${name}.tsx`, source }],
        importPath: `@/components/ui/${name}`,
      } satisfies DocEntry;
    });
}

export const ENTRIES: DocEntry[] = [
  ...eridanusEntries(),
  ...primitiveEntries(),
];

/** Entries grouped in sidebar order. */
export const NAV: { id: string; title: Localized; entries: DocEntry[] }[] = [
  ...GROUPS,
  OTHER,
  PRIMITIVES,
]
  .map(({ id, title, ...group }) => {
    const inGroup = ENTRIES.filter((e) => e.group === id);
    const order = "names" in group ? (group.names as string[]) : undefined;
    return {
      id,
      title,
      entries: order
        ? inGroup.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name))
        : inGroup,
    };
  })
  .filter((g) => g.entries.length > 0);

export const groupTitle = (id: string, locale: Locale) =>
  NAV.find((g) => g.id === id)?.title[locale] ?? id;

/** An entry's description in the docs language, with its lang: the
 * registry's English when there is no Chinese. */
export function describe(entry: DocEntry, locale: Locale) {
  const text = entry.description[locale];
  return text
    ? { text, lang: locale === "zh-CN" ? "zh-CN" : "en" }
    : { text: entry.description["en-US"], lang: "en" };
}

/** Every entry in reading order, for previous and next links. */
export const ORDER: DocEntry[] = NAV.flatMap((g) => g.entries);

export const entryByName = new Map(ENTRIES.map((e) => [e.name, e]));

/** Names a module exports, for the usage snippet's import line. */
export function exportedNames(source: string): string[] {
  const names = new Set<string>();
  for (const m of source.matchAll(
    /^export (?:async )?(?:function|const|class) (\w+)/gm,
  ))
    names.add(m[1]!);
  for (const m of source.matchAll(/^export \{([^}]+)\}/gm)) {
    for (const part of m[1]!.split(",")) {
      const name = part
        .trim()
        .split(/\s+as\s+/)
        .at(-1);
      if (name) names.add(name);
    }
  }
  return [...names];
}
