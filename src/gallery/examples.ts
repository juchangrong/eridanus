/**
 * Live examples, one file each under examples/<entry>/: <name>.tsx in
 * Chinese and <name>.en.tsx, the same example with its data and text in
 * English. The docs run and show the file in the docs language, and fall
 * back to the Chinese one when there is no English twin. demo.tsx is the
 * preview at the top of the page; every other file opens with a JSDoc block
 * whose first line is its title and the rest its description. The block is
 * stripped from the code shown, so the code reads as a consumer would write it.
 */
import type { ComponentType } from "react";

import type { Locale } from "@/lib/eridanus/locale";

export interface ExampleFile {
  title?: string;
  description?: string;
  Component: ComponentType;
  code: string;
}

export interface Example {
  name: string;
  files: Partial<Record<Locale, ExampleFile>>;
}

/** The example in the docs language, or in Chinese, with the file name for a
 * title and the language its text is in. */
export function exampleIn(example: Example, locale: Locale) {
  const own = example.files[locale];
  const file = (own ?? example.files["zh-CN"] ?? example.files["en-US"])!;
  return {
    ...file,
    title: file.title ?? example.name,
    lang: own ? locale : example.files["zh-CN"] ? "zh-CN" : "en-US",
  };
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

const BY_ENTRY = new Map<string, Map<string, Example>>();
for (const [path, module] of Object.entries(MODULES)) {
  const [, entry, name, en] =
    path.match(/^\.\/examples\/([^/]+)\/([^/.]+)(\.en)?\.tsx$/) ?? [];
  if (!entry || !name) continue;
  const examples = BY_ENTRY.get(entry) ?? new Map<string, Example>();
  const example = examples.get(name) ?? { name, files: {} };
  example.files[en ? "en-US" : "zh-CN"] = {
    Component: module.default,
    ...parse(SOURCES[path] ?? ""),
  };
  examples.set(name, example);
  BY_ENTRY.set(entry, examples);
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
  const list = [...(BY_ENTRY.get(entry)?.values() ?? [])];
  return {
    demo: list.find((e) => e.name === "demo"),
    more: list
      .filter((e) => e.name !== "demo")
      .sort(
        (a, b) => rank(a.name) - rank(b.name) || a.name.localeCompare(b.name),
      ),
  };
}
