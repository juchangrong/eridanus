/**
 * Live examples, one file each under examples/<entry>/. demo.tsx is the
 * preview at the top of the page; every other file opens with a JSDoc block
 * whose first line is its title and the rest its description. The block is
 * stripped from the code shown, so the code reads as a consumer would write it.
 */
import type { ComponentType } from "react";

export interface Example {
  name: string;
  title?: string;
  description?: string;
  Component: ComponentType;
  code: string;
}

const MODULES = import.meta.glob<{ default: ComponentType }>(
  "./examples/*/*.tsx",
  { eager: true },
);
const SOURCES = import.meta.glob<string>("./examples/*/*.tsx", {
  eager: true,
  query: "?raw",
  import: "default",
});

const DOC_BLOCK = /^\/\*\*([\s\S]*?)\*\/\s*/;

function parse(source: string) {
  const block = source.match(DOC_BLOCK);
  if (!block) return { code: source.trim() };
  const lines = block[1]!
    .split("\n")
    .map((line) => line.replace(/^\s*\*\s?/, "").trim())
    .filter(Boolean);
  return {
    title: lines[0],
    description: lines.slice(1).join(" ") || undefined,
    code: source.slice(block[0].length).trim(),
  };
}

const BY_ENTRY = new Map<string, Example[]>();
for (const [path, module] of Object.entries(MODULES)) {
  const [, entry, name] =
    path.match(/^\.\/examples\/([^/]+)\/([^/]+)\.tsx$/) ?? [];
  if (!entry || !name) continue;
  const list = BY_ENTRY.get(entry) ?? [];
  list.push({ name, Component: module.default, ...parse(SOURCES[path] ?? "") });
  BY_ENTRY.set(entry, list);
}

/** Examples that explain the rest come first; others follow by file name. */
const FIRST = ["variants", "tones", "sizes"];
const rank = (name: string) => {
  const i = FIRST.indexOf(name);
  return i === -1 ? FIRST.length : i;
};

/** The demo and the further examples of an entry. */
export function examplesFor(entry: string): {
  demo?: Example;
  more: Example[];
} {
  const list = BY_ENTRY.get(entry) ?? [];
  return {
    demo: list.find((e) => e.name === "demo"),
    more: list
      .filter((e) => e.name !== "demo")
      .sort(
        (a, b) => rank(a.name) - rank(b.name) || a.name.localeCompare(b.name),
      ),
  };
}
