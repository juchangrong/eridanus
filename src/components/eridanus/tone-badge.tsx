import type { ComponentProps } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type Tone =
  | "success"
  | "error"
  | "info"
  | "warning"
  | "neutral"
  | "outline";

/** Tints for the states the badge has no variant for. With the base and
 * status-colors tokens the text keeps 4.5:1 or better on its own tint in both
 * themes, also inside a tinted ClickableRow under the pointer. */
const TONE_CLASS: Record<Tone, string> = {
  success: "bg-success/10 text-success dark:bg-success/20",
  error: "bg-destructive/10 text-destructive dark:bg-destructive/20",
  info: "bg-info/10 text-info dark:bg-info/20",
  warning: "bg-warning/10 text-warning dark:bg-warning/20",
  neutral: "",
  outline: "",
};

/**
 * A status word on its tint. The word carries the state and the color only
 * repeats it, so the badge still reads without color. Map your own states
 * to tones where you render them, e.g. `failed` to `error`.
 */
export function ToneBadge({
  tone,
  className,
  ...props
}: Omit<ComponentProps<typeof Badge>, "variant"> & { tone: Tone }) {
  return (
    <Badge
      variant={tone === "outline" ? "outline" : "secondary"}
      className={cn(TONE_CLASS[tone], className)}
      {...props}
    />
  );
}
