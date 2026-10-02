import { ClockIcon } from "@phosphor-icons/react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { zhCN } from "react-day-picker/locale";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { localDay } from "@/lib/eridanus/format-time";
import {
  describeTimeRange,
  parseDay,
  TIME_RANGE_PRESETS,
  type TimeRange,
} from "@/lib/eridanus/time-range";
import { cn } from "@/lib/utils";

/**
 * The time filter of a log, run or metrics page: trailing presets ("最近
 * 1 小时") that pick and close on one click, and a calendar for a span of
 * whole days, applied with a button (one chosen day is a one-day span). Days after
 * today cannot be picked. The trigger names what it filters, like
 * FilterSelect, and is sized to sit beside it.
 */
export function TimeRangePicker({
  value,
  onChange,
  presets = TIME_RANGE_PRESETS,
  label = "时间",
  customLabel = "按日期",
  applyLabel = "应用",
  className,
}: {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
  /** Trailing ranges such as "15m", "1h", "7d". */
  presets?: readonly string[];
  label?: string;
  customLabel?: string;
  applyLabel?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<DateRange | undefined>();
  const pick = (next: TimeRange) => {
    onChange(next);
    setOpen(false);
  };

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        if (next)
          setDraft(
            "from" in value
              ? {
                  from: parseDay(value.from) ?? undefined,
                  to: parseDay(value.to) ?? undefined,
                }
              : undefined,
          );
        setOpen(next);
      }}
    >
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className={cn("justify-start", className)}
          />
        }
      >
        <ClockIcon data-icon="inline-start" className="text-muted-foreground" />
        <span className="text-muted-foreground">{label}</span>
        <span className="tabular-nums">{describeTimeRange(value)}</span>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-auto flex-col gap-0 p-0 sm:flex-row"
      >
        <div className="flex flex-col gap-0.5 border-b p-2 sm:w-36 sm:border-e sm:border-b-0">
          {presets.map((p) => {
            const active = "last" in value && value.last === p;
            return (
              <Button
                key={p}
                variant="ghost"
                size="sm"
                aria-pressed={active}
                className={cn(
                  "justify-start font-normal",
                  active && "bg-muted font-medium",
                )}
                onClick={() => pick({ last: p })}
              >
                {describeTimeRange({ last: p })}
              </Button>
            );
          })}
        </div>
        <div className="flex flex-col gap-2 p-2">
          <span className="px-2 pt-1 text-xs text-muted-foreground">
            {customLabel}
          </span>
          <Calendar
            mode="range"
            selected={draft}
            onSelect={setDraft}
            defaultMonth={draft?.from}
            disabled={{ after: new Date() }}
            locale={zhCN}
            className="p-1"
          />
          <Button
            size="sm"
            className="self-end"
            disabled={!draft?.from}
            onClick={() => {
              if (draft?.from)
                pick({
                  from: localDay(draft.from),
                  to: localDay(draft.to ?? draft.from),
                });
            }}
          >
            {applyLabel}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
