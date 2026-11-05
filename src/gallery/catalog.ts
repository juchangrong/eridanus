/**
 * Every page of the docs. Eridanus items are read from the same registry.json
 * files the CLI reads, so the docs list exactly what can be installed; the
 * shadcn primitives are the files in components/ui, the look `base` gives.
 */
import root from "../../registry.json";
import skills from "../../skills/registry.json";
import components from "../components/eridanus/registry.json";
import forks from "../components/ui/registry.json";
import hooks from "../hooks/eridanus/registry.json";
import lib from "../lib/eridanus/registry.json";

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
  /** Registry descriptions are English and mark code with backticks. */
  description: string;
  lang: "en" | "zh-CN";
  /** registry:component and the like, without the prefix. */
  type: string;
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

/** Sidebar and page order. An Eridanus item not listed here shows under 其他. */
const GROUPS = [
  {
    title: "起步",
    names: ["base", "status-colors", "theme-provider", "ui-guidelines"],
  },
  {
    title: "展示",
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
    title: "反馈",
    names: ["notice", "empty-state", "toaster", "confirm-dialog"],
  },
  {
    title: "输入控件",
    names: ["input", "textarea", "select", "input-group"],
  },
  {
    title: "表单与筛选",
    names: [
      "form-input",
      "search-field",
      "filter-select",
      "multi-filter",
      "time-range-picker",
    ],
  },
  {
    title: "表格与页面",
    names: [
      "app-shell",
      "table-kit",
      "table-sort",
      "table-selection",
      "pager",
      "page-layout",
    ],
  },
  {
    title: "函数与 Hook",
    names: [
      "format-time",
      "time-range",
      "clipboard",
      "use-debounced-value",
      "use-paging",
      "use-url-state",
    ],
  },
];
const OTHER = "其他";
export const PRIMITIVES_GROUP = "shadcn 原语";

/** The shadcn primitives with a page. sidebar is left out: it only makes
 * sense as a whole app frame, which app-shell shows. input, textarea,
 * select and input-group are Eridanus forks, listed with the Eridanus items. */
const PRIMITIVES: Record<string, { title: string; description: string }> = {
  "alert-dialog": {
    title: "Alert Dialog",
    description: "打断当前操作、要求用户明确确认的模态对话框。",
  },
  alert: {
    title: "Alert",
    description: "页面内的提示条，用于说明状态或需要注意的信息。",
  },
  avatar: { title: "Avatar", description: "头像图片，加载失败时显示缩写。" },
  badge: { title: "Badge", description: "短标签，用于标记状态、类别或数量。" },
  breadcrumb: {
    title: "Breadcrumb",
    description: "显示当前页面在层级中的位置，并提供返回上级的链接。",
  },
  button: {
    title: "Button",
    description: "触发操作的按钮，提供多种强调程度和尺寸。",
  },
  calendar: {
    title: "Calendar",
    description: "选择单个日期或日期范围的日历，基于 react-day-picker。",
  },
  card: { title: "Card", description: "带标题、正文和操作区的内容容器。" },
  checkbox: {
    title: "Checkbox",
    description: "勾选或取消一个选项，也用于表格行的多选。",
  },
  combobox: {
    title: "Combobox",
    description: "可输入搜索的下拉选择，支持单选和多选标签。",
  },
  command: {
    title: "Command",
    description: "可搜索的命令列表，放进对话框即是 ⌘K 命令面板。",
  },
  dialog: {
    title: "Dialog",
    description: "覆盖在页面上的模态窗口，用于不离开当前页的表单或详情。",
  },
  "dropdown-menu": {
    title: "Dropdown Menu",
    description: "点击触发的操作菜单，可包含分组、快捷键和勾选项。",
  },
  empty: {
    title: "Empty",
    description: "没有内容时的占位区域：图标、标题、说明和下一步操作。",
  },
  field: {
    title: "Field",
    description:
      "表单字段的结构：标签、控件、说明和错误信息，并为读屏器关联好。",
  },
  label: { title: "Label", description: "表单控件的可点击标签。" },
  popover: {
    title: "Popover",
    description: "点击触发、锚定在控件旁的浮层，可以放交互内容。",
  },
  "radio-group": {
    title: "Radio Group",
    description: "一组互斥选项，同一时间只能选中一个。",
  },
  separator: {
    title: "Separator",
    description: "在视觉或语义上分隔内容的分割线。",
  },
  sheet: {
    title: "Sheet",
    description: "从屏幕边缘滑出的面板，用于补充内容或次要表单。",
  },
  skeleton: { title: "Skeleton", description: "内容加载时的占位骨架。" },
  spinner: { title: "Spinner", description: "表示正在进行中的加载指示器。" },
  switch: {
    title: "Switch",
    description: "立即生效的开关，用于启用或停用一项设置。",
  },
  table: { title: "Table", description: "展示结构化数据的表格。" },
  tabs: { title: "Tabs", description: "在同一区域内切换多个相关视图。" },
  toast: { title: "Toast", description: "操作完成后短暂出现的通知。" },
  "toggle-group": {
    title: "Toggle Group",
    description: "一组可单选或多选的切换按钮。",
  },
  toggle: { title: "Toggle", description: "有按下和未按下两种状态的按钮。" },
  tooltip: { title: "Tooltip", description: "悬停或聚焦时显示的简短说明。" },
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
    GROUPS.flatMap((g) => g.names.map((name) => [name, g.title])),
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
        description: item.description ?? "",
        lang: "en",
        type: item.type.replace(/^registry:/, ""),
        group: groupOf.get(item.name) ?? OTHER,
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
  return Object.entries(PRIMITIVES)
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
        lang: "zh-CN",
        type: "ui",
        group: PRIMITIVES_GROUP,
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
export const NAV: { title: string; entries: DocEntry[] }[] = [
  ...GROUPS.map((g) => g.title),
  OTHER,
  PRIMITIVES_GROUP,
]
  .map((title) => {
    const inGroup = ENTRIES.filter((e) => e.group === title);
    const order = GROUPS.find((g) => g.title === title)?.names;
    return {
      title,
      entries: order
        ? inGroup.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name))
        : inGroup,
    };
  })
  .filter((g) => g.entries.length > 0);

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
