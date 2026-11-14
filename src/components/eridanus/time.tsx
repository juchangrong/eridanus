import { type ReactNode, useSyncExternalStore } from "react";

import { useLocale } from "@/components/eridanus/locale-provider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  clock,
  exactTime,
  friendly,
  isRelative,
  type TimeInput,
  toDate,
} from "@/lib/eridanus/format-time";
import { cn } from "@/lib/utils";

/**
 * An instant that reads easily and stays exact. The surface shows the
 * readable form ("12 分钟前", "今天 14:05"); the tooltip shows local time to
 * the millisecond with its offset, the UTC time and the relative time. Screen
 * readers get the exact local time along with the surface text, since the
 * tooltip is out of their reach.
 *
 * `clock` shows a bare "HH:mm:ss" for instants whose day is already on screen,
 * and `seconds` keeps the seconds on the readable form.
 *
 * The readable and relative forms follow LocaleProvider ("12 minutes ago",
 * "Today 14:05" in English).
 *
 * Within the hour the readable form is relative ("12 分钟前") and keeps
 * itself current: one shared one-second timer runs while any such Time is
 * mounted, and a Time renders again only when its text changes.
 */
export function Time({
  value,
  clock: bare,
  seconds,
  placeholder = "—",
  delay = 300,
  className,
}: {
  value: TimeInput;
  clock?: boolean;
  seconds?: boolean;
  /** Shown for a missing or unparseable value. */
  placeholder?: ReactNode;
  /** How long the pointer rests before the tooltip opens, in milliseconds. */
  delay?: number;
  className?: string;
}) {
  const locale = useLocale();
  const date = toDate(value);
  const label = () =>
    !date ? "" : bare ? clock(date) : friendly(date, { seconds, locale });
  const live = !bare && isRelative(date, { seconds });
  const text = useSyncExternalStore(
    live ? subscribeTick : subscribeNever,
    label,
    label,
  );
  const exact = exactTime(date, locale);
  if (!date || !exact)
    return (
      <span className={cn("text-muted-foreground", className)}>
        {placeholder}
      </span>
    );
  return (
    <Tooltip>
      <TooltipTrigger
        delay={delay}
        // relative: the containing block for the visually hidden text, which
        // is absolutely positioned and would otherwise stretch a scroll area.
        render={
          <time
            dateTime={date.toISOString()}
            className={cn("relative whitespace-nowrap tabular-nums", className)}
          />
        }
      >
        {text}
        <span className="sr-only">
          {locale === "zh-CN" ? `（${exact.local}）` : ` (${exact.local})`}
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <span className="flex flex-col gap-0.5 font-mono tabular-nums">
          <span>{exact.local}</span>
          <span className="opacity-70">{exact.utc}</span>
          <span className="opacity-70">{exact.relative}</span>
        </span>
      </TooltipContent>
    </Tooltip>
  );
}

const ticks = new Set<() => void>();
let timer: number | undefined;

/** One timer for every live Time on the page, running only while one is. */
function subscribeTick(onTick: () => void) {
  ticks.add(onTick);
  timer ??= window.setInterval(() => {
    for (const tick of ticks) tick();
  }, 1000);
  return () => {
    ticks.delete(onTick);
    if (ticks.size === 0) {
      window.clearInterval(timer);
      timer = undefined;
    }
  };
}

const subscribeNever = () => () => {};
