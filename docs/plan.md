# Eridanus plan

Eridanus is an open-source shadcn registry on GitHub. It distributes the UI vocabulary an operations console settled on: a design-system base, composite components, hooks and agent guidelines, installable into any React project with the shadcn CLI:

```bash
npx shadcn@latest add juchangrong/eridanus/time
```

## Goals

- One command to start a project on the shared look: `npx shadcn@latest init juchangrong/eridanus/base` gives the shadcn `base-rhea` style (preset `beqC918K`: zinc, Phosphor icons, Inter) plus the status colors and contrast fixes the console needed.
- Composite components that encode the console's rules: open layout without card frames, readable times with the exact value on hover, status that never relies on color alone, WCAG AA contrast in both themes.
- Items that agents can find and use: every item has a description written for people and for the shadcn MCP server, and the guidelines ship as an installable Claude Code skill.

## Non-goals

- Domain blocks for one product (trace viewer, run timeline, project directory) and anything that names a particular company's product, domain, endpoint or identifier.
- Radix-based styles. Items use Base UI's `render` prop, which Radix's `asChild` does not accept.
- An npm package or a self-hosted JSON endpoint. The repository is the registry.

## How distribution works

The shadcn CLI treats a GitHub repository with a root `registry.json` as a registry. `npx shadcn add juchangrong/eridanus/<item>` resolves `include`, reads the item, and fetches its files from the repository at the default branch or at `#<ref>`. The repository is public, so the CLI reads it without credentials; nothing needs to be built or hosted.

Two rules of GitHub registries shape the source:

- A bare dependency such as `button` means shadcn's own item. Dependencies on other Eridanus items use the full address, `juchangrong/eridanus/<item>`.
- Refs are not inherited. Installing `…/time#v0.1.0` fetches `time` at the tag but its Eridanus dependencies from the default branch, unless `registry.json` at that tag pins them. The release step pins them (phase 3).

## Repository layout

```text
registry.json                 root: name, homepage, the base items, include
src/components/ui/            shadcn primitives as the CLI writes them, and the forks with their registry.json
src/components/eridanus/      published components, with their registry.json
src/lib/eridanus/             published helpers, with their registry.json
src/hooks/eridanus/           published hooks, with their registry.json
skills/                       published agent guidelines, with their registry.json
src/gallery/                  the docs site: a page per item and per shadcn primitive, with live examples
scripts/                      install smoke test and release helpers
docs/                         this plan
```

Each item is defined in the `registry.json` beside its files, and the root file includes them. The docs site in `src/gallery/` reads the same files, so an item missing from the docs is one missing from the registry. Each page shows the item's description, a live demo with its code, the CLI and manual install steps and further examples; the examples live one per file in `src/gallery/examples/<item>/`, and the file a reader sees in the code tab is the file that renders the preview. The docs switch between Chinese and English, so an example with text has an English twin, `<name>.en.tsx`, beside the Chinese `<name>.tsx`: the same code with its data and text in English. The docs run and show the twin in the docs language.

The repository is itself a shadcn project (Vite, React, Tailwind CSS v4, `components.json` on the `base-rhea` style). Published files live where a consumer's copy will live, and they import through the same aliases a consumer has (`@/components/ui/*`, `@/components/eridanus/*`, `@/lib/*`, `@/hooks/*`), which the CLI rewrites to each consumer's configured aliases. Item files set `target` with the `@components/`, `@lib/` and `@hooks/` placeholders, so every install lands in an `eridanus/` folder beside the consumer's own code. The forks are the exception: they are `registry:ui` items without a target, so they land in the consumer's ui alias in place of shadcn's files.

## Conventions

- `src/components/ui/` stays exactly as the shadcn CLI writes it, so the primitives can be regenerated, except the forks: `input`, `textarea`, `select`, `input-group`, `dropdown-menu`, `combobox`, `command`, `button`, `toggle`, `toggle-group`, `tabs`, `badge` and `field`. Other adjustments belong in Eridanus components or their `className` props.
- A fork keeps shadcn's API and formatting and changes only what Eridanus needs; a JSDoc on its main component says what (the CLI drops a file's leading comment, so the note sits there). The fields' changes are the focus and error style: no ring, a `muted-foreground` border on focus and a solid `destructive` border when invalid. Every control is a pill: buttons (icon buttons are circles), toggles, tabs, badges, single-line fields and the Select trigger, as are list highlights in menus, sidebars and the gallery's navigation. Surfaces (cards, dialogs, popovers, alerts, toasts, tooltips) keep their corners. Single-line fields and the Select trigger are pills; a field that can grow taller (`input-group`, the combobox chips) has 16px corners, a pill at the single-line height. The dropdowns' (`select`, `dropdown-menu`, `combobox`) changes are the list: a pill highlight in a popup whose corners stay concentric with it, and for `select` a padded list whose selected option lands on the trigger's value. When updating primitives, leave the forks out of `add --overwrite`, read `add <fork> --diff` against upstream, and merge by hand. Eridanus items depend on the forks by full address, `juchangrong/eridanus/input`, never the bare name.
- Consumers get the forks with `init …/base` (all but `command`, which pulls in shadcn's `dialog` and is added when needed). A later `shadcn add` of an upstream item that depends on a fork, such as `sidebar` on `input` or `dialog` on `button`, asks before overwriting it, and the answer is no; `--overwrite` would replace it without asking. Add the forks by their full address, `juchangrong/eridanus/button`, not the bare name.
- Consumers do not edit installed Eridanus files; they wrap them. Upgrades are `add --diff` then `add --overwrite`.
- User-visible text ships in Chinese (`zh-CN`) and English (`en-US`). Chinese is the default, because the first consumers are Chinese-language tools; `LocaleProvider` switches every component inside it, and the formatting functions take the locale as an argument. Each component keeps its own per-locale table, so an item installs with only its own text. Every visible string can still be replaced through props, which win over the built-in text. A new built-in string needs both languages.
- Every item has a `title`, a `description` that says what it is for and what it needs, and `categories`. An item whose install needs a follow-up step says so in `docs`, which the CLI prints.
- No global CSS from components. Styling that has to reach into primitives uses scoped selectors on the component's own root, such as `[&_[data-slot=table-row]]:…`.

## Items for v0.1

| Item                                                  | Type           | What it carries                                                                                                                                                                                                                                                                          |
| ----------------------------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `base`                                                | base           | `base-rhea` on zinc with Phosphor and Inter, JetBrains Mono for code, the status colors, `color-scheme` per theme, the forked fields, AA values for `muted-foreground` and `destructive`                                                                                                 |
| `input`, `textarea`, `select`, `input-group`          | ui             | forks of shadcn's, installed in their place: no focus ring, a `muted-foreground` focus border and a solid `destructive` border when invalid                                                                                                                                              |
| `dropdown-menu`, `combobox`, `command` (and `select`) | ui             | forks of shadcn's dropdowns: pill highlights in concentric popups                                                                                                                                                                                                                        |
| `button`, `toggle`, `toggle-group`, `tabs`, `badge`   | ui             | forks of shadcn's controls, made pills                                                                                                                                                                                                                                                   |
| `status-colors`                                       | theme          | `success`, `warning` and `info` tokens for projects that keep another base                                                                                                                                                                                                               |
| `locale`, `locale-provider`                           | lib, component | the `zh-CN` and `en-US` locales and the provider that sets the language of every component inside it                                                                                                                                                                                     |
| `format-time`                                         | lib            | readable times in Chinese or English (`刚刚`, `今天 14:05`; `just now`, `Today 14:05`) and the exact local, UTC and relative forms                                                                                                                                                       |
| `clipboard`                                           | lib            | copy text with a fallback for pages without the async clipboard                                                                                                                                                                                                                          |
| `use-debounced-value`, `use-paging`                   | hook           | settled search input; page state that resets when filters change                                                                                                                                                                                                                         |
| `theme-provider`                                      | component      | system, light and dark with a stored choice and no transition smear on switch                                                                                                                                                                                                            |
| `time`                                                | component      | a readable time with the exact value in a tooltip and for screen readers                                                                                                                                                                                                                 |
| `tone-badge`                                          | component      | status badges on AA-checked tints (success, error, info, warning, neutral, outline)                                                                                                                                                                                                      |
| `notice`                                              | component      | error, warning and neutral notices with an optional action                                                                                                                                                                                                                               |
| `empty-state`                                         | component      | nothing-here panels without a frame                                                                                                                                                                                                                                                      |
| `copy-button`                                         | component      | icon-only copy control with a copied state                                                                                                                                                                                                                                               |
| `person-avatar`                                       | component      | picture or initials, decorative beside the name                                                                                                                                                                                                                                          |
| `meter`                                               | component      | a value against its ceiling, such as in-flight work against a cap                                                                                                                                                                                                                        |
| `confirm-dialog`                                      | component      | confirmation for irreversible writes; stays open and shows the error until the write succeeds                                                                                                                                                                                            |
| `form-input`                                          | component      | labelled input with its hint and error wired for screen readers                                                                                                                                                                                                                          |
| `search-field`, `filter-select`                       | component      | 28px toolbar controls                                                                                                                                                                                                                                                                    |
| `pager`                                               | component      | range, page size, first/previous/next/last and a page field                                                                                                                                                                                                                              |
| `table-kit`                                           | component      | open tables: scroll area, pinned header row, loading and empty rows, clickable rows                                                                                                                                                                                                      |
| `page-layout`                                         | component      | page container, header, section, fact lists, stat strip and list toolbar                                                                                                                                                                                                                 |
| `entity-card`                                         | component      | one-row cards for a list of owned or running things: status, facts, owner and age, a menu, a link over the whole card                                                                                                                                                                    |
| `toaster`                                             | component      | toast region with localized labels and a `notify` helper                                                                                                                                                                                                                                 |
| `id-text`                                             | component      | long identifiers shortened in the middle, full value on hover and for screen readers, optional copy                                                                                                                                                                                      |
| `multi-filter`                                        | component      | toolbar filter for several values, with per-value counts                                                                                                                                                                                                                                 |
| `time-range-picker`, `time-range`                     | component, lib | trailing presets and whole-day spans, with a short text form for URLs                                                                                                                                                                                                                    |
| `table-sort`, `table-selection`                       | component      | sortable headers with aria-sort; row selection across pages with a bulk-action bar                                                                                                                                                                                                       |
| `use-url-state`                                       | hook           | filters, sort and paging kept in the address bar's query                                                                                                                                                                                                                                 |
| `app-shell`                                           | block          | inset layout: sidebar on the window background with an optional tenant switcher and ⌘K search entry, the page in a card, the account menu with the theme choice beside footer buttons, an optional top bar for a breadcrumb and page actions; collapsed, it opens over the page on hover |
| `ui-guidelines`                                       | file           | a Claude Code skill with the design rules and the item catalog                                                                                                                                                                                                                           |

## Quality gates

Bun is the only toolchain, on its canary channel until `bun lint` reaches a stable release. It installs (`bun.lock`; the project `.npmrc` pins the public registry over any mirror in a user's own `~/.npmrc`), runs the scripts, runs Vite and the shadcn CLI on its own runtime, and formats (`bun fmt`), lints (`bun lint`) and type-checks (`bun check`) with the settings in `bunfig.toml`. There is no Node, TypeScript, Biome or ESLint install.

Every push runs:

1. `bun check`, `bun lint` (no warnings allowed) and `bun fmt --check` over the whole repository.
2. `shadcn registry validate`: the schemas, the includes and every referenced file.
3. The gallery build, which renders every published component.
4. The install smoke test: `shadcn build` the items, point their Eridanus dependencies at the built files, create a fresh Vite app, `init` it from the built `base`, `add` every item, then type-check and build that app. This catches missing dependencies and import paths that only break after the CLI rewrites them.

Accessibility is checked on the gallery with axe in both themes before a release. Contrast is checked beyond axe's static pass: status text must keep 4.5:1 on the darkest stack the components draw, a badge tint over a tinted table row under the pointer, and on the destructive button's hover.

## Versioning

Releases are git tags `vX.Y.Z` with a `CHANGELOG.md` entry. Consumers pin with `#vX.Y.Z`. The release script rewrites the Eridanus dependencies in `registry.json` to the same tag on the tagged commit, so a pinned install is pinned all the way down. A breaking change to an item ships under a new item name or a new major tag.

## Phases

0. **Foundation** (done). Repository, this plan, the Vite project initialised with `shadcn init --base base --preset beqC918K`, lint and type-check scripts, CI. Done when the gallery builds and CI is green.
1. **Base and first items** (done). `base`, `status-colors`, `format-time`, `clipboard`, `time`, `tone-badge`, `notice`, `empty-state`, `copy-button`, and the smoke test. Done when `init` from `base` in a fresh Vite app matches a `--preset beqC918K` project plus the status colors, and `add time` compiles there.
2. **Remaining components** (done). Hooks, `theme-provider`, `confirm-dialog`, `form-input`, `search-field`, `filter-select`, `pager`, `table-kit`, `page-layout`, `person-avatar`, `meter`, `toaster`, `ui-guidelines`. Done when every item installs and builds in the smoke test and the gallery shows each one.
3. **Shell and release.** `app-shell` (done), Chinese and English text with `locale-provider` and a bilingual gallery (done), the release script that pins dependencies, `v0.1.0`.
4. **Adoption.** First consumers, and a scheduled job that diffs the shadcn primitives against upstream.
