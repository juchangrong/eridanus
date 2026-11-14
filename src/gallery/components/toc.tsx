import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { useT } from "../i18n";

export interface TocItem {
  id: string;
  title: string;
  depth: 2 | 3;
}

/** The last heading that starts in the top third of the viewport or above it,
 * or the last heading once the page cannot scroll further. */
function useActiveId(ids: readonly string[]) {
  const [active, setActive] = useState<string>();
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const atBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 2;
        const line = window.innerHeight / 3;
        let found: string | undefined;
        for (const id of ids) {
          const top = document.getElementById(id)?.getBoundingClientRect().top;
          if (top === undefined || top > line) break;
          found = id;
        }
        setActive(atBottom ? ids.at(-1) : found);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids]);
  return active;
}

/** Scrolls to a heading without touching the hash, which holds the route. */
export function scrollToHeading(id: string) {
  const heading = document.getElementById(id);
  if (!heading) return;
  heading.scrollIntoView({
    behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
  });
  heading.focus({ preventScroll: true });
}

export function TableOfContents({ items }: { items: TocItem[] }) {
  const active = useActiveId(items.map((i) => i.id));
  const t = useT();
  if (items.length === 0) return null;
  return (
    <nav
      aria-label={t("本页内容", "On this page")}
      className="flex flex-col gap-2 text-sm"
    >
      <p className="m-0 font-medium">{t("本页内容", "On this page")}</p>
      <ul className="m-0 flex list-none flex-col ps-0">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToHeading(item.id);
              }}
              aria-current={active === item.id ? "location" : undefined}
              className={cn(
                "block truncate py-1 text-muted-foreground transition-colors hover:text-foreground aria-[current]:text-foreground",
                item.depth === 3 && "ps-3",
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
