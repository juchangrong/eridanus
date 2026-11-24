import { cloneElement, type ReactElement, type ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/** 16px, the corner of a field that can grow taller, so a list of cards
 * agrees with the search field and filters in the toolbar above it. */
const CORNER = "rounded-[1rem]";

/**
 * One entry of a list of things a person owns or runs (services, projects,
 * agents) when a table would be too wide or too sparse: an 80px row of the
 * icon, the name with its status `badge`, a `subtitle` line of facts, an
 * `aside` (owner, age) and a `menu`, with an optional 40px footer row for
 * `children`. `link` makes the whole card open the entry: pass the router's
 * link element, such as `<Link to="/services/orders-api" />`; it covers the
 * card and is named by the title for screen readers, and every link or
 * button inside the card stays clickable above it. Below 640px the aside
 * folds away, so put what a phone must show in the subtitle.
 */
export function EntityCard({
  icon,
  title,
  badge,
  subtitle,
  aside,
  menu,
  link,
  children,
  className,
}: {
  /** A Phosphor icon element, drawn 16px in the muted color. */
  icon?: ReactNode;
  title: ReactNode;
  /** Beside the title, such as a ToneBadge with the status. */
  badge?: ReactNode;
  /** One line under the title, such as a FactLine; truncates. */
  subtitle?: ReactNode;
  /** On the trailing edge, such as the owner and the age. */
  aside?: ReactNode;
  /** A DropdownMenu trigger, last on the row. */
  menu?: ReactNode;
  /** The element that opens the entry, rendered over the whole card. */
  link?: ReactElement<{ className?: string; children?: ReactNode }>;
  /** A footer row under a rule, for facts or actions that need the room. */
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("relative gap-0 py-0", CORNER, className)}>
      {link
        ? cloneElement(link, {
            className: cn(
              "absolute inset-0 z-0 transition-colors outline-none hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring",
              CORNER,
              link.props.className,
            ),
            children: <span className="sr-only">{title}</span>,
          })
        : null}
      {/* The content lets the pointer through to the link under it; links
          and buttons inside take it back. */}
      <div className="pointer-events-none relative z-10 flex h-20 items-center gap-3.5 ps-4 pe-3 [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
        {icon ? (
          <span
            aria-hidden
            className="flex shrink-0 items-center text-muted-foreground [&_svg]:size-4"
          >
            {icon}
          </span>
        ) : null}
        <div className="grid min-w-0 grow gap-0.5">
          <span className="flex h-6 min-w-0 items-center gap-1.5">
            <span className="truncate text-lg font-medium">{title}</span>
            {badge ? <span className="shrink-0">{badge}</span> : null}
          </span>
          {subtitle ? (
            <span className="flex h-5 min-w-0 items-center text-sm text-muted-foreground">
              {/* One line, whatever it holds: a FactLine stops wrapping, and
                  only its last fact truncates. */}
              <span className="flex min-w-0 overflow-hidden [&>p]:flex-nowrap [&>p]:overflow-hidden [&>p>*]:shrink-0 [&>p>*:last-child]:shrink">
                {subtitle}
              </span>
            </span>
          ) : null}
        </div>
        {aside ? (
          <div className="shrink-0 text-sm whitespace-nowrap text-muted-foreground max-sm:hidden">
            {aside}
          </div>
        ) : null}
        {menu ? (
          <span className="flex shrink-0 items-center">{menu}</span>
        ) : null}
      </div>
      {children ? (
        <div className="pointer-events-none relative z-10 flex h-10 min-w-0 items-center gap-2 border-t px-4 text-sm text-muted-foreground [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
          {children}
        </div>
      ) : null}
    </Card>
  );
}

/** The cards of a list, 12px apart. */
export function EntityCardList({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("flex flex-col gap-3", className)}>{children}</div>;
}

/** Placeholder cards of the same height while the list loads. */
export function EntityCardSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-3" aria-hidden>
      {Array.from({ length: rows }, (_, i) => (
        <Card
          key={i}
          className={cn(
            "flex h-20 flex-row items-center gap-3.5 py-0 ps-4 pe-3",
            CORNER,
          )}
        >
          <Skeleton className="size-4 rounded-full" />
          <div className="grid grow gap-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-64 max-w-full" />
          </div>
        </Card>
      ))}
    </div>
  );
}
