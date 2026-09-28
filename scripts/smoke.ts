/**
 * Install smoke test: proves every item installs into a fresh project and
 * compiles there, with the imports the CLI rewrote.
 *
 * 1. `shadcn build` the registry into .smoke/r.
 * 2. Point each built item's Eridanus dependencies at the built files, so the
 *    test installs this checkout rather than the default branch on GitHub.
 * 3. Create a Vite + React + TypeScript + Tailwind app in .smoke/app,
 *    `shadcn init` it from the built `base`, and `shadcn add` every other item.
 * 4. Check the tokens the base promises, then type-check and build the app
 *    with every installed Eridanus module imported.
 *
 * Needs network access for npm packages and shadcn's own primitives.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = "juchangrong/eridanus";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, ".smoke", "r");
const app = join(root, ".smoke", "app");
const shadcn = join(root, "node_modules", ".bin", "shadcn");

function run(cmd: string, args: string[], cwd: string) {
  console.log(`\n$ ${cmd === shadcn ? "shadcn" : cmd} ${args.map((a) => (a.startsWith(root) ? relative(cwd, a) || "." : a)).join(" ")}`);
  execFileSync(cmd, args, { cwd, stdio: ["ignore", "inherit", "inherit"] });
}

function write(path: string, content: string) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}

// 1. Build.
rmSync(join(root, ".smoke"), { recursive: true, force: true });
run(shadcn, ["build", "-o", out], root);

// 2. Local dependencies.
const catalog = JSON.parse(readFileSync(join(out, "registry.json"), "utf8")) as { items: { name: string; type: string }[] };
for (const { name } of catalog.items) {
  const file = join(out, `${name}.json`);
  const item = JSON.parse(readFileSync(file, "utf8")) as { registryDependencies?: string[] };
  item.registryDependencies = item.registryDependencies?.map((dep) =>
    dep.startsWith(`${REPO}/`) ? join(out, `${dep.slice(REPO.length + 1)}.json`) : dep,
  );
  writeFileSync(file, JSON.stringify(item, null, 2));
}

// 3. A fresh consumer app, on the same toolchain versions as this repository.
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8")) as {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
};
const pick = (from: Record<string, string>, names: string[]) => Object.fromEntries(names.map((n) => [n, from[n]!]));
write(join(app, ".npmrc"), "registry=https://registry.npmjs.org/\n");
write(join(app, "package.json"), JSON.stringify({
  name: "eridanus-smoke",
  private: true,
  type: "module",
  dependencies: pick(pkg.dependencies, ["react", "react-dom"]),
  devDependencies: pick(pkg.devDependencies, [
    "@tailwindcss/vite", "@types/node", "@types/react", "@types/react-dom", "@vitejs/plugin-react",
    "tailwindcss", "typescript", "vite",
  ]),
}, null, 2));
write(join(app, "tsconfig.json"), JSON.stringify({
  compilerOptions: {
    target: "ES2022",
    lib: ["ES2023", "DOM", "DOM.Iterable"],
    module: "ESNext",
    moduleResolution: "bundler",
    jsx: "react-jsx",
    strict: true,
    noEmit: true,
    skipLibCheck: true,
    verbatimModuleSyntax: true,
    types: ["vite/client", "node"],
    paths: { "@/*": ["./src/*"] },
  },
  include: ["src", "vite.config.ts"],
}, null, 2));
write(join(app, "vite.config.ts"), `import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
});
`);
write(join(app, "index.html"), `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8" /><title>smoke</title></head>
<body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>
`);
write(join(app, "src", "index.css"), `@import "tailwindcss";\n`);
write(join(app, "src", "main.tsx"), `import { createRoot } from "react-dom/client";

import "./index.css";
import { modules } from "./all";

createRoot(document.getElementById("root")!).render(<pre>{Object.keys(modules).join("\\n")}</pre>);
`);
write(join(app, "src", "all.ts"), "export const modules = {};\n");
run("pnpm", ["install"], app);

run(shadcn, ["init", join(out, "base.json"), "--yes"], app);
const rest = catalog.items.filter((i) => i.type !== "registry:base").map((i) => join(out, `${i.name}.json`));
run(shadcn, ["add", ...rest, "--yes"], app);

// 4. The promises the base makes, then a full type-check and build.
const failures: string[] = [];
const config = JSON.parse(readFileSync(join(app, "components.json"), "utf8")) as {
  style: string;
  iconLibrary: string;
  tailwind: { baseColor: string };
};
if (config.style !== "base-rhea") failures.push(`components.json style is ${config.style}, expected base-rhea`);
if (config.iconLibrary !== "phosphor") failures.push(`components.json iconLibrary is ${config.iconLibrary}, expected phosphor`);
if (config.tailwind.baseColor !== "zinc") failures.push(`components.json baseColor is ${config.tailwind.baseColor}, expected zinc`);
const css = readFileSync(join(app, "src", "index.css"), "utf8");
for (const needle of ["--success:", "--color-success: var(--success)", "--muted-foreground: oklch(0.52 0.016 285.938)", "Inter Variable", "JetBrains Mono Variable"]) {
  if (!css.includes(needle)) failures.push(`src/index.css lacks ${needle}`);
}

// Every code file an item targets, as the import specifier the app uses.
const PLACEHOLDER: Record<string, string> = { "@components/": "@/components/", "@lib/": "@/lib/", "@hooks/": "@/hooks/" };
const expected: string[] = [];
for (const { name } of catalog.items) {
  const item = JSON.parse(readFileSync(join(out, `${name}.json`), "utf8")) as { files?: { target?: string }[] };
  for (const { target = "" } of item.files ?? []) {
    const prefix = Object.keys(PLACEHOLDER).find((p) => target.startsWith(p));
    if (prefix && /\.tsx?$/.test(target)) expected.push(PLACEHOLDER[prefix] + target.slice(prefix.length).replace(/\.tsx?$/, ""));
  }
}
for (const spec of expected) {
  const base = join(app, "src", spec.slice(2));
  if (!existsSync(`${base}.ts`) && !existsSync(`${base}.tsx`)) failures.push(`${spec} was not installed`);
}
if (!existsSync(join(app, ".claude", "skills", "eridanus-ui", "SKILL.md"))) failures.push(".claude/skills/eridanus-ui/SKILL.md was not installed");
write(join(app, "src", "all.ts"), [
  ...expected.map((spec, i) => `import * as m${i} from "${spec}";`),
  `export const modules = { ${expected.map((spec, i) => `"${spec}": m${i}`).join(", ")} };`,
  "",
].join("\n"));

if (failures.length) {
  console.error(`\nsmoke: ${failures.length} problem(s)\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
run("pnpm", ["exec", "tsc", "--noEmit"], app);
run("pnpm", ["exec", "vite", "build"], app);
console.log(`\nsmoke: ${catalog.items.length} items, ${expected.length} modules installed and built`);
