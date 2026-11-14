import { useLocale } from "@/components/eridanus/locale-provider";

import { NAV } from "../catalog";
import { useT } from "../i18n";
import { docHref } from "../router";

const LINK =
  "flex h-8 items-center truncate rounded-full px-3 text-sm text-foreground/80 hover:bg-muted hover:text-foreground aria-[current=page]:bg-muted aria-[current=page]:font-medium aria-[current=page]:text-foreground";

/** Every page, grouped. `onNavigate` lets the mobile sheet close itself. */
export function SidebarNav({
  current,
  onNavigate,
}: {
  current?: string;
  onNavigate?: () => void;
}) {
  const locale = useLocale();
  const t = useT();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-0.5">
        <p className="m-0 px-3 pb-1 text-xs font-medium text-muted-foreground">
          {t("开始", "Start")}
        </p>
        <a
          href={docHref()}
          aria-current={current ? undefined : "page"}
          onClick={onNavigate}
          className={LINK}
        >
          {t("介绍", "Introduction")}
        </a>
      </div>
      {NAV.map((group) => (
        <div key={group.id} className="flex flex-col gap-0.5">
          <p className="m-0 px-3 pb-1 text-xs font-medium text-muted-foreground">
            {group.title[locale]}
          </p>
          <ul className="m-0 flex list-none flex-col gap-0.5 ps-0">
            {group.entries.map((entry) => (
              <li key={entry.name}>
                <a
                  href={docHref(entry.name)}
                  aria-current={current === entry.name ? "page" : undefined}
                  onClick={onNavigate}
                  className={LINK}
                >
                  {entry.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
