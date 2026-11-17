import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

/**
 * Eridanus fork of shadcn's base-rhea input. Focus and errors show on the
 * border alone: no ring, a muted-foreground border on focus (3:1 or better
 * against the field in both themes) and a solid destructive border when
 * invalid. The field is a pill, like the Select trigger, with the text 12px
 * in so it lines up with a Select's value. Upstream changes are merged by
 * hand, see docs/plan.md.
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-full border border-transparent bg-input/50 px-3 py-1 text-base transition-[color,box-shadow] duration-200 outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }
