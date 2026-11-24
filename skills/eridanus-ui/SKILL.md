---
name: eridanus-ui
description: Design rules and the component catalog for UI built with the Eridanus shadcn registry (juchangrong/eridanus). Use when building or changing pages, tables, forms, status displays, times or notices in a project that has components under components/eridanus or a components.json on the base-rhea style.
---

# Eridanus UI

Eridanus is a shadcn registry on GitHub. Items install as source into the project:

```bash
npx shadcn@latest add juchangrong/eridanus/<item>
```

Installed files live in `components/eridanus/`, `lib/eridanus/` and `hooks/eridanus/`. Do not edit them; wrap them in the project's own components, so `npx shadcn@latest add juchangrong/eridanus/<item> --diff` and `--overwrite` keep working for upgrades. The shadcn primitives in `components/ui/` stay as the CLI wrote them too.

## Rules

1. **Open layout.** Sections, tables and figures sit on the page ground, separated by space, headings and padding. Do not wrap page content in cards or bordered boxes. Tables keep shadcn's table look, a rule under each row, without a frame around them. Cards are for self-contained panels such as a sidebar status box; a page's headline figures may sit on muted, borderless tiles (`StatStrip variant="cards"`).
2. **Exact on demand.** Show times with `Time` (readable on the surface, exact in the tooltip and for screen readers). A shortened ID, name or value keeps its full form one hover away: `IdText` for identifiers, `title` or a tooltip otherwise.
3. **Status never relies on color alone.** Use `ToneBadge` with the status word. Color marks only what needs action: failures (`error`, `text-destructive`), backlog or stale work (`warning`, `text-warning`). Everything else stays neutral.
4. **Contrast.** Text keeps 4.5:1 in both themes. Use the tokens (`text-muted-foreground`, `text-success`, `bg-warning/10`, …), never raw palette colors, and check any new tint.
5. **One control height.** Buttons use `size="sm"` (28px); `SearchField`, `FilterSelect` and the `Pager` match it, and so does `TabsList` with `size="sm"` when tabs share a toolbar with them. The default (near-black) button variant marks the single main action of a page, form or dialog; other actions use `secondary`, destructive ones `destructive`, inline and icon controls `ghost`.
6. **Writes confirm.** Irreversible or outward-facing writes go through `ConfirmDialog`, which stays open and shows the error until the write succeeds. Report success with `notify()`.
7. **Copy.** Visible text is short and plain, in Chinese by default. Wrap the app in `LocaleProvider locale="en-US"` for English; components switch their built-in labels, times and ranges, and pass the locale to `friendly()`, `relative()` and `describeTimeRange()` yourself. Identifiers and paths take `font-mono`, which the base maps to the system font so all text reads alike; only code blocks (`pre`) use a real monospace (`--font-code`). Keep to the type scale: `text-xs` 12px for meta and table headers, `text-sm` 13px for body (the default), `text-base`/`text-lg` 15px for emphasis such as the product name, `text-xl`/`text-2xl` 20px for page titles and figures. Props replace any built-in string.
8. **Let the layout explain.** Avoid secondary labels and descriptions that repeat what the layout already says. A page with a title shows no breadcrumb; a sub-page without one shows the breadcrumb instead. A short list shows no pager (`hideSinglePage`).

## Catalog

| Need               | Item                                                                   | Use                                                                                                                                                            |
| ------------------ | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Start a project    | `base`                                                                 | `npx shadcn@latest init juchangrong/eridanus/base`                                                                                                             |
| Status tokens only | `status-colors`                                                        | `bg-success/10`, `text-warning`, `text-info`                                                                                                                   |
| Time on screen     | `time`                                                                 | `<Time value={iso} />`, `clock` for HH:mm:ss, `seconds`                                                                                                        |
| Time as text       | `format-time`                                                          | `friendly()`, `exactTime()`, `clock()`, `relative()`                                                                                                           |
| Status             | `tone-badge`                                                           | `<ToneBadge tone="error">failed</ToneBadge>`                                                                                                                   |
| App frame          | `app-shell`                                                            | `<AppShell brand nav account breadcrumb renderLink={(href) => <Link to={href} />}>`; inside `ThemeProvider`; `brand.lockup` for a logo drawn with its wordmark |
| Frame, no sidebar  | `app-shell`                                                            | `<AppHeaderShell brand links actions account width="narrow">` for a workspace picker; `account.toggles` for switch rows                                        |
| Page frame         | `page-layout`                                                          | `Page` (`narrow` is 768px, `list` for a table page), `PageHeader`, `Section`, `FactLine`, `Facts`, `StatStrip` (`variant="cards"`)                             |
| Long IDs           | `id-text`                                                              | `<IdText value={id} copy />`, shortened in the middle                                                                                                          |
| Tables             | `table-kit`                                                            | `TableScroll` › `Table` › `TableHeaderRow` (`variant="filled"`) + `TableBody` › `TableRows` / `ClickableRow` / `LockedRow` for no access                       |
| Sorting            | `table-sort`                                                           | `SortableHead` in the header row; `formatSort(sort)` for the API                                                                                               |
| Bulk actions       | `table-selection`                                                      | `useRowSelection(ids, [filters])`, `SelectAllHead`, `SelectCell`, `SelectionBar`                                                                               |
| Paging             | `pager`, `use-paging`                                                  | `usePaging([filters])` feeds `<Pager {...paging} total={n} />`; `hideSinglePage`, `bar` to pin it to the bottom, `fade` with it                                |
| Filters            | `search-field`, `filter-select`, `multi-filter`, `use-debounced-value` | debounce the search value before querying                                                                                                                      |
| Time filter        | `time-range-picker`, `time-range`                                      | `resolveTimeRange(range)` for the query's from/to                                                                                                              |
| Filters in the URL | `use-url-state`                                                        | `useUrlState("q")`, `useUrlListState("status")`, so views reload and share                                                                                     |
| Nothing to show    | `empty-state`                                                          | also for no-access and failed pages                                                                                                                            |
| Notices            | `notice`                                                               | `tone="error"` for failed reads with a retry `action`                                                                                                          |
| Forms              | `form-input`                                                           | label, hint and error wired for screen readers                                                                                                                 |
| Fields             | `input`, `textarea`, `select`, `input-group`                           | Eridanus forks in `components/ui`, same API as shadcn's; keep them when adding upstream items (answer no to overwriting, never `--overwrite`)                  |
| Confirmation       | `confirm-dialog`                                                       | `onConfirm` returns a promise; reject to show the error                                                                                                        |
| Feedback           | `toaster`                                                              | wrap the app in `AppToaster`, call `notify()`                                                                                                                  |
| Copy values        | `copy-button`, `clipboard`                                             | icon button next to an ID or URL                                                                                                                               |
| Capacity           | `meter`                                                                | in-flight work against a cap                                                                                                                                   |
| People             | `person-avatar`                                                        | decorative; show the name beside it; `tint="name"` in long lists                                                                                               |
| Theme              | `theme-provider`                                                       | `ThemeProvider`, `useTheme()`; the `dark` class on `<html>`                                                                                                    |
| Language           | `locale-provider`                                                      | `<LocaleProvider locale="zh-CN" \| "en-US">`, `useLocale()`; the app owns the choice and sets `<html lang>`                                                    |

## Patterns

The app frame, once at the root; each route renders its `Page` as the children:

```tsx
<ThemeProvider>
  <LocaleProvider locale={locale}>
    <AppToaster>
      <AppShell
        brand={{ name: "运营台", logo: <PlanetIcon weight="fill" /> }}
        nav={[
          {
            items: [
              {
                label: "运行记录",
                href: "/runs",
                icon: <PlayCircleIcon />,
                active: path.startsWith("/runs"),
              },
            ],
          },
        ]}
        account={{ name: user.name, email: user.email, onSignOut: signOut }}
        footerActions={
          <Button variant="ghost" size="icon" aria-label="通知">
            <BellIcon />
          </Button>
        }
        breadcrumb={<Breadcrumb>…</Breadcrumb>}
        renderLink={(href) => <Link to={href} />}
      >
        <Outlet />
      </AppShell>
    </AppToaster>
  </LocaleProvider>
</ThemeProvider>
```

A list page:

```tsx
<Page fill>
  <PageHeader title="运行记录" hideTitle />
  <div className="flex flex-wrap items-center gap-2">
    <SearchField label="搜索运行" value={q} onChange={setQ} />
    <FilterSelect
      label="状态"
      value={status}
      onChange={setStatus}
      options={statuses}
    />
  </div>
  <TableScroll fill>
    <Table>
      <TableHeaderRow>
        <TableHead>运行</TableHead>
        <TableHead>状态</TableHead>
        <TableHead>创建时间</TableHead>
      </TableHeaderRow>
      <TableBody>
        <TableRows
          colSpan={3}
          pending={isPending}
          rows={rows}
          empty={{ title: "还没有运行" }}
        >
          {(row) => (
            <ClickableRow key={row.id}>
              <TableCell>
                <a href={`/runs/${row.id}`}>{row.id}</a>
              </TableCell>
              <TableCell>
                <ToneBadge tone={toneOf(row.status)}>{row.status}</ToneBadge>
              </TableCell>
              <TableCell>
                <Time value={row.createdAt} />
              </TableCell>
            </ClickableRow>
          )}
        </TableRows>
      </TableBody>
    </Table>
  </TableScroll>
  <Pager {...paging} total={total} />
</Page>
```

A read that fails before any data arrives shows only the `Notice` with a retry action; a refresh that fails later keeps the last data on screen under the notice.
