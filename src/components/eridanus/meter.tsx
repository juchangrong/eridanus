import { Meter as MeterPrimitive } from "@base-ui/react/meter";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * A value against its ceiling, such as in-flight work against a cap, with the
 * figures beside the label. Screen readers get a meter role with `valueText`
 * as its spoken value. A value above `max` fills the track and still reads as
 * its true figure in `valueText`.
 */
export function Meter({
  label,
  value,
  max,
  valueText,
  className,
}: {
  label: ReactNode;
  value: number;
  max: number;
  /** The figures as shown and spoken, e.g. "37 / 200". */
  valueText: string;
  className?: string;
}) {
  return (
    <MeterPrimitive.Root
      value={Math.min(value, max)}
      max={max}
      aria-valuetext={valueText}
      className={cn("flex flex-col gap-1.5 text-sm", className)}
    >
      <div className="flex items-center justify-between gap-2">
        <MeterPrimitive.Label className="text-muted-foreground">
          {label}
        </MeterPrimitive.Label>
        <span className="font-medium tabular-nums">{valueText}</span>
      </div>
      <MeterPrimitive.Track className="h-1.5 overflow-hidden rounded-full bg-muted">
        <MeterPrimitive.Indicator className="h-full rounded-full bg-primary transition-all" />
      </MeterPrimitive.Track>
    </MeterPrimitive.Root>
  );
}
