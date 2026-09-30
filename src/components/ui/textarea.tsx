import * as React from "react"
import { cn } from "cn"

/**
 * Eridanus fork of shadcn's base-rhea textarea. Focus and errors show on the
 * border alone: no ring, a muted-foreground border on focus (3:1 or better
 * against the field in both themes) and a solid destructive border when
 * invalid. Upstream changes are merged by hand, see docs/plan.md.
 */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full resize-none rounded-2xl border border-transparent bg-input/50 px-2.5 py-2 text-base transition-[color,box-shadow] duration-200 outline-none placeholder:text-muted-foreground focus-visible:border-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
