import type { ReactNode } from "react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";

/**
 * A nothing-here, no-access or failed-page panel that sits open on the page
 * rather than in a box. `size="sm"` is for an empty table body or list.
 * `contents` holds the way out: a button, a link or a short code block.
 */
export function EmptyState({
  icon,
  title,
  description,
  contents,
  size,
  className,
}: {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  contents?: ReactNode;
  size?: "sm";
  className?: string;
}) {
  return (
    <Empty className={cn(size === "sm" && "gap-3 p-6", className)}>
      <EmptyHeader>
        {icon ? <EmptyMedia variant="icon">{icon}</EmptyMedia> : null}
        <EmptyTitle className={cn(size === "sm" && "text-base")}>
          {title}
        </EmptyTitle>
        {description ? (
          <EmptyDescription>{description}</EmptyDescription>
        ) : null}
      </EmptyHeader>
      {contents ? <EmptyContent>{contents}</EmptyContent> : null}
    </Empty>
  );
}
