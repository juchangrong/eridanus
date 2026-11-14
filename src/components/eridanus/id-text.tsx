import { CopyButton } from "@/components/eridanus/copy-button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/**
 * A long identifier shortened in the middle (`run_8f3a2c…c91e`), monospace,
 * keeping the start and end people compare by. The full value is in a
 * tooltip and is what screen readers hear; `copy` adds a copy button for it.
 * Values short enough to show whole are shown whole.
 */
export function IdText({
  value,
  head = 8,
  tail = 4,
  copy,
  copyLabel,
  className,
}: {
  value: string;
  /** The copy button's name; CopyButton's own label when unset. */
  copyLabel?: string;
  /** Characters kept at the start. */
  head?: number;
  /** Characters kept at the end. */
  tail?: number;
  copy?: boolean;
  className?: string;
}) {
  const short =
    value.length > head + tail + 1
      ? `${value.slice(0, head)}…${value.slice(-tail)}`
      : null;
  const text = short ? (
    <Tooltip>
      <TooltipTrigger
        delay={300}
        render={<span className="relative whitespace-nowrap" />}
      >
        <span aria-hidden>{short}</span>
        <span className="sr-only">{value}</span>
      </TooltipTrigger>
      <TooltipContent>
        <span className="font-mono [overflow-wrap:anywhere]">{value}</span>
      </TooltipContent>
    </Tooltip>
  ) : (
    <span className="whitespace-nowrap">{value}</span>
  );
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 font-mono text-[13px]",
        className,
      )}
    >
      {text}
      {copy ? (
        <CopyButton text={value} label={copyLabel} size="icon-xs" />
      ) : null}
    </span>
  );
}
