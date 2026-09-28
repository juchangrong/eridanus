import { InfoIcon, WarningCircleIcon, WarningIcon } from "@phosphor-icons/react";
import type { ReactNode } from "react";

import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

const ICON = { error: WarningCircleIcon, warning: WarningIcon, neutral: InfoIcon };

export type NoticeTone = keyof typeof ICON;

/**
 * A notice above the content it is about: a failed read or write (`error`,
 * announced to screen readers as an alert), a caution the reader must see
 * (`warning`), or a quiet fact about the page (`neutral`). `action` is one
 * small control on the trailing edge, such as a retry button.
 */
export function Notice({
  tone = "neutral",
  title,
  description,
  action,
  className,
}: {
  tone?: NoticeTone;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  const Icon = ICON[tone];
  return (
    <Alert
      variant={tone === "error" ? "destructive" : "default"}
      role={tone === "error" ? "alert" : undefined}
      className={cn("shrink-0", tone === "warning" && "*:[svg]:text-warning", className)}
    >
      <Icon weight={tone === "neutral" ? "regular" : "fill"} />
      {title ? <AlertTitle>{title}</AlertTitle> : null}
      {description ? <AlertDescription>{description}</AlertDescription> : null}
      {action ? <AlertAction>{action}</AlertAction> : null}
    </Alert>
  );
}
