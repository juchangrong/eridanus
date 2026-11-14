import { CaretDownIcon } from "@phosphor-icons/react";

import { useMessages } from "@/components/eridanus/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Locale } from "@/lib/eridanus/locale";
import { cn } from "@/lib/utils";

export interface MultiFilterOption {
  value: string;
  label: string;
  /** How many rows have this value, shown at the end of the option. */
  count?: number;
}

const MESSAGES: Record<
  Locale,
  { clear: string; count: (count: number) => string }
> = {
  "zh-CN": {
    clear: "清除筛选",
    count: (n) => `已选 ${n.toLocaleString()} 项`,
  },
  "en-US": {
    clear: "Clear filter",
    count: (n) => `${n.toLocaleString()} selected`,
  },
};

/**
 * A filter that takes several values at once ("状态 failed, running"). The
 * trigger names what it filters and shows up to two chosen labels, then a
 * count; the menu stays open while values are toggled (arrow keys and
 * typing a label move through it) and ends with a clear item. An empty
 * array means no filter. Sized to sit beside FilterSelect and small buttons.
 */
export function MultiFilter({
  label,
  value,
  onChange,
  options,
  clearLabel,
  countLabel,
  className,
}: {
  /** What is filtered; shown in the trigger and in its accessible name. */
  label: string;
  value: readonly string[];
  onChange: (value: string[]) => void;
  options: readonly MultiFilterOption[];
  clearLabel?: string;
  /** The trigger's summary once more than two values are chosen. */
  countLabel?: (count: number) => string;
  className?: string;
}) {
  const t = useMessages(MESSAGES);
  const chosen = options.filter((o) => value.includes(o.value));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className={cn("max-w-full justify-start", className)}
          />
        }
      >
        <span className="text-muted-foreground">{label}</span>
        {chosen.length > 2 ? (
          <Badge variant="secondary">
            {(countLabel ?? t.count)(chosen.length)}
          </Badge>
        ) : (
          chosen.map((o) => (
            <Badge key={o.value} variant="secondary" className="max-w-32">
              <span className="truncate">{o.label}</span>
            </Badge>
          ))
        )}
        <CaretDownIcon
          data-icon="inline-end"
          className="text-muted-foreground"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-48">
        {options.map((o) => (
          <DropdownMenuCheckboxItem
            key={o.value}
            checked={value.includes(o.value)}
            onCheckedChange={(on) =>
              onChange(
                on ? [...value, o.value] : value.filter((v) => v !== o.value),
              )
            }
          >
            <span className="min-w-0 flex-1 truncate">{o.label}</span>
            {o.count !== undefined ? (
              <span className="text-xs text-muted-foreground tabular-nums">
                {o.count.toLocaleString()}
              </span>
            ) : null}
          </DropdownMenuCheckboxItem>
        ))}
        {value.length > 0 ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="justify-center text-muted-foreground"
              onClick={() => onChange([])}
            >
              {clearLabel ?? t.clear}
            </DropdownMenuItem>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
