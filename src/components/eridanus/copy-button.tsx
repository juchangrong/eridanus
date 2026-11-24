import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { type ComponentProps, useEffect, useRef, useState } from "react";

import { useMessages } from "@/components/eridanus/locale-provider";
import { Button } from "@/components/ui/button";
import { copyText } from "@/lib/eridanus/clipboard";
import type { Locale } from "@/lib/eridanus/locale";
import { cn } from "@/lib/utils";

const MESSAGES: Record<Locale, { copy: string; copied: string }> = {
  "zh-CN": { copy: "复制", copied: "已复制" },
  "en-US": { copy: "Copy", copied: "Copied" },
};

/**
 * An icon-only copy control. After a copy the icon cross-fades to a check for
 * a moment, and the accessible name says "Copied" for anyone not watching
 * the icon. `label` names what is copied, e.g. "Copy run ID".
 */
export function CopyButton({
  text,
  label,
  copiedLabel,
  variant = "ghost",
  size = "icon-sm",
  className,
}: {
  text: string;
  label?: string;
  copiedLabel?: string;
  variant?: ComponentProps<typeof Button>["variant"];
  size?: "icon-xs" | "icon-sm" | "icon" | "icon-lg";
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const t = useMessages(MESSAGES);
  const name = copied ? (copiedLabel ?? t.copied) : (label ?? t.copy);

  return (
    <Button
      variant={variant}
      size={size}
      aria-label={name}
      title={name}
      className={className}
      onClick={() => {
        void copyText(text).then(() => {
          setCopied(true);
          window.clearTimeout(timer.current);
          timer.current = window.setTimeout(() => setCopied(false), 1500);
        });
      }}
    >
      {/* Both icons share one grid cell and trade places on data-copied. */}
      <span
        data-copied={copied || undefined}
        className={cn(
          "inline-grid place-items-center *:transition-[opacity,filter,scale] *:duration-300 *:ease-[cubic-bezier(0.2,0,0,1)] *:[grid-area:1/1] motion-reduce:*:transition-none",
          "[&>:last-child]:scale-25 [&>:last-child]:opacity-0 [&>:last-child]:blur-[4px]",
          "data-copied:[&>:first-child]:scale-25 data-copied:[&>:first-child]:opacity-0 data-copied:[&>:first-child]:blur-[4px]",
          "data-copied:[&>:last-child]:scale-100 data-copied:[&>:last-child]:opacity-100 data-copied:[&>:last-child]:blur-none",
        )}
      >
        <CopyIcon />
        <CheckIcon className="text-success" />
      </span>
    </Button>
  );
}
