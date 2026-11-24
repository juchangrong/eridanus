import { type ReactNode, useMemo } from "react";

import { useMessages } from "@/components/eridanus/locale-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Locale } from "@/lib/eridanus/locale";
import { cn } from "@/lib/utils";

const ALL = "__all__";

const MESSAGES: Record<Locale, { all: string }> = {
  "zh-CN": { all: "全部" },
  "en-US": { all: "All" },
};

/**
 * A select that filters a list, whose trigger names what it filters
 * ("Status All"). The empty string means no filter and is offered as the first
 * item, `allLabel`. `size="sm"` (28px) matches small buttons.
 */
export function FilterSelect({
  label,
  value,
  onChange,
  options,
  allLabel: allProp,
  size = "sm",
  className,
}: {
  /** What is filtered; shown in the trigger and used as its accessible name. */
  label: string;
  /** The selected option's value, or "" for no filter. */
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: ReactNode }[];
  allLabel?: ReactNode;
  size?: "sm" | "default";
  className?: string;
}) {
  const t = useMessages(MESSAGES);
  const allLabel = allProp ?? t.all;
  const items = useMemo(
    () => [{ value: ALL, label: allLabel }, ...options],
    [options, allLabel],
  );
  return (
    <Select
      value={value || ALL}
      items={items}
      onValueChange={(next) =>
        onChange(next === ALL || next == null ? "" : String(next))
      }
    >
      <SelectTrigger
        size={size}
        aria-label={label}
        className={cn("min-w-32", className)}
      >
        <SelectValue>
          {(current: string) => (
            <span className="flex min-w-0 items-center gap-1.5">
              <span className="text-muted-foreground">{label}</span>
              <span className="truncate">
                {items.find((i) => i.value === current)?.label ?? current}
              </span>
            </span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false} align="start">
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
