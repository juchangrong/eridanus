import type { ReactNode } from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { clock, exactTime, friendly, toDate, type TimeInput } from "@/lib/eridanus/format-time";
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
  const date = toDate(value);
  const exact = exactTime(date);
  if (!date || !exact) return <span className={cn("text-muted-foreground", className)}>{placeholder}</span>;
  return (
    <Tooltip>
      <TooltipTrigger
        delay={delay}
        // relative: the containing block for the visually hidden text, which
        // is absolutely positioned and would otherwise stretch a scroll area.
        render={<time dateTime={date.toISOString()} className={cn("relative whitespace-nowrap tabular-nums", className)} />}
      >
        {bare ? clock(date) : friendly(date, { seconds })}
        <span className="sr-only">（{exact.local}）</span>
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
