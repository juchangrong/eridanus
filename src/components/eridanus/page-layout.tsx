import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The page container. On desktop a full-width page sits 44px in from its
 * sides and 32px under the top bar, so its edge lines up with the rule
 * beside the app shell's sidebar toggle; a `narrow` page is a 768px column,
 * centred, for forms, settings and short lists, where full-width lines stop
 * being readable. Phones keep 16px all round. Document pages grow and let
 * their parent scroll, with 32px between blocks, twice the 16px inside a
 * section, so each block reads as one group. `fill` pages take exactly the
 * height they are given, so a table or workbench can scroll inside itself
 * with its header and pager in view; a list page that scrolls with the page
 * instead uses `list`, which keeps the pager at the foot of a short list.
 */
export function Page({
  children,
  fill,
  list,
  narrow,
  className,
}: {
  children: ReactNode;
  fill?: boolean;
  /** A table page that scrolls as a whole: 12px between blocks, at least
   * the viewport's height, and no bottom padding, so a `<Pager bar>` sits
   * on the card's bottom edge. */
  list?: boolean;
  narrow?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-col px-4 md:pt-8",
        fill
          ? "h-full min-h-[36rem] gap-3 py-4"
          : list
            ? "min-h-full gap-3 pt-6 pb-0"
            : "gap-8 py-6",
        narrow ? "max-w-3xl" : "max-w-[1600px] md:px-11",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * One heading block per page: the h1 with the page's actions on the trailing
 * edge, `badges` beside the title and `meta` as a quiet line of facts under
 * it. `hideTitle` is for a page whose title only repeats the breadcrumb: the
 * h1 stays for screen readers and only `meta` shows, so such a page puts its
 * actions beside the content they act on.
 */
export function PageHeader({
  title,
  badges,
  actions,
  meta,
  hideTitle,
}: {
  title: ReactNode;
  meta?: ReactNode;
} & (
  | { hideTitle?: false; badges?: ReactNode; actions?: ReactNode }
  | { hideTitle: true; badges?: never; actions?: never }
)) {
  if (hideTitle) {
    return (
      <>
        <h1 className="sr-only">{title}</h1>
        {meta ? <div className="shrink-0">{meta}</div> : null}
      </>
    );
  }
  return (
    <header className="flex shrink-0 flex-wrap items-start justify-between gap-x-6 gap-y-3">
      {/* Keeps a readable width; narrower than that, the actions wrap under it. */}
      <div className="flex min-w-[min(100%,18rem)] flex-1 flex-col gap-1.5">
        <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5">
          <h1 className="min-w-0 font-heading text-xl font-medium tracking-tight text-balance [overflow-wrap:anywhere]">
            {title}
          </h1>
          {badges}
        </div>
        {meta}
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {actions}
        </div>
      ) : null}
    </header>
  );
}

/**
 * A titled section, open on the page: the heading and the space around it
 * group the content, with no frame. The heading sits closer to its own content
 * than to the section before it, so a form's section title never reads as one
 * more field label.
 */
export function Section({
  title,
  description,
  actions,
  children,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("flex min-w-0 flex-col gap-4", className)}>
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <div className="flex min-w-0 flex-col gap-1">
          <h2 className="font-heading text-base font-medium">{title}</h2>
          {description ? (
            <p className="text-sm text-pretty text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? (
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        ) : null}
      </div>
      {children}
    </section>
  );
}

/**
 * A line of facts separated by middle dots. Each dot belongs to the fact after
 * it, so a wrapped line starts on a fact. A fact too long for the line
 * truncates; give it a `title` so the full value stays one hover away.
 */
export function FactLine({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm text-muted-foreground",
        "[&>*]:max-w-full [&>*]:min-w-0 [&>*]:truncate",
        "[&>*+*]:before:me-2 [&>*+*]:before:text-muted-foreground/60 [&>*+*]:before:content-['·']",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** Label over value for configuration facts, in two columns once there is
 * room. Values default to monospace, since they are usually machine text. */
export function Facts({
  items,
}: {
  items: {
    label: ReactNode;
    value: ReactNode;
    wide?: boolean;
    mono?: boolean;
  }[];
}) {
  return (
    // Two columns once the list itself has 16rem, measured on its own box, so
    // a side column on a desktop behaves like a phone.
    <div className="@container">
      <dl className="grid grid-cols-1 gap-x-6 gap-y-4 @3xs:grid-cols-2">
        {items.map((item, i) => (
          <div
            // eslint-disable-next-line react/no-array-index-key -- items have no id and keep the caller's order
            key={i}
            className={cn(
              "flex min-w-0 flex-col gap-1",
              item.wide && "col-span-full",
            )}
          >
            <dt className="text-sm text-muted-foreground">{item.label}</dt>
            <dd
              className={cn(
                "m-0 min-w-0 [overflow-wrap:anywhere]",
                item.mono !== false && "font-mono text-[13px]",
              )}
            >
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Headline figures in a row, label above figure. They pack from the
 * leading edge, each as wide as it needs (at least 7rem) with 48px between,
 * so a wide page does not pull them apart; `cards` puts each on a quiet
 * tile instead, the row split into equal columns (two on phones) for an
 * overview's headline numbers. Only a figure that needs action takes a
 * color. */
export function StatStrip({
  items,
  variant = "open",
}: {
  items: {
    label: ReactNode;
    value: ReactNode;
    hint?: ReactNode;
    tone?: "danger" | "warning";
  }[];
  variant?: "open" | "cards";
}) {
  const cards = variant === "cards";
  return (
    <dl
      className={cn(
        "m-0 shrink-0",
        cards
          ? "grid grid-cols-2 gap-3 md:grid-cols-[repeat(var(--stats),minmax(0,1fr))]"
          : "flex flex-wrap gap-x-12 gap-y-4",
      )}
      style={cards ? ({ "--stats": items.length } as CSSProperties) : undefined}
    >
      {items.map((item, i) => (
        <div
          // eslint-disable-next-line react/no-array-index-key -- items have no id and keep the caller's order
          key={i}
          className={cn(
            "flex flex-col gap-1",
            cards ? "min-w-0 rounded-lg bg-muted p-4" : "min-w-28",
          )}
        >
          <dt className="truncate text-sm text-muted-foreground">
            {item.label}
          </dt>
          <dd
            className={cn(
              "m-0 truncate font-heading text-2xl font-medium tracking-tight tabular-nums",
              item.tone === "danger"
                ? "text-destructive"
                : item.tone === "warning" && "text-warning",
            )}
          >
            {item.value}
          </dd>
          {item.hint || cards ? (
            // A card without a hint keeps the line, so the row's cards
            // stay one height.
            <dd className="m-0 truncate text-xs text-muted-foreground">
              {item.hint ?? "\u00a0"}
            </dd>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
