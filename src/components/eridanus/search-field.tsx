import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";

import { useMessages } from "@/components/eridanus/locale-provider";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import type { Locale } from "@/lib/eridanus/locale";
import { cn } from "@/lib/utils";

const MESSAGES: Record<Locale, { clear: string }> = {
  "zh-CN": { clear: "清除搜索" },
  "en-US": { clear: "Clear search" },
};

/**
 * A search input for a toolbar: a magnifier, the field, and a clear button
 * while there is text. Escape clears a non-empty field without letting the
 * key reach handlers above it. `size="sm"` (28px) matches small buttons.
 */
export function SearchField({
  value,
  onChange,
  label,
  placeholder,
  clearLabel,
  size = "sm",
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  /** The field's accessible name; the placeholder is not one. */
  label: string;
  placeholder?: string;
  clearLabel?: string;
  size?: "sm" | "default";
  className?: string;
}) {
  const t = useMessages(MESSAGES);
  return (
    <InputGroup
      className={cn(size === "sm" ? "h-7" : "h-8", "w-full sm:w-72", className)}
    >
      <InputGroupAddon>
        <MagnifyingGlassIcon aria-hidden />
      </InputGroupAddon>
      <InputGroupInput
        aria-label={label}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape" && value) {
            e.stopPropagation();
            onChange("");
          }
        }}
      />
      {value ? (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            aria-label={clearLabel ?? t.clear}
            onClick={() => onChange("")}
          >
            <XIcon />
          </InputGroupButton>
        </InputGroupAddon>
      ) : null}
    </InputGroup>
  );
}
