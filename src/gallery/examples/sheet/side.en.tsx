/**
 * Side
 * side decides which edge the panel slides in from. The default is right.
 */
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const sides = [
  { side: "top", label: "Top" },
  { side: "right", label: "Right" },
  { side: "bottom", label: "Bottom" },
  { side: "left", label: "Left" },
] as const;

export default function SheetSideExample() {
  return (
    <div className="flex flex-wrap gap-2">
      {sides.map(({ side, label }) => (
        <Sheet key={side}>
          <SheetTrigger render={<Button variant="outline" />}>
            {label}
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Run #2048</SheetTitle>
              <SheetDescription>
                A panel that slides in from the {label.toLowerCase()} edge, good
                for viewing details without leaving the list.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
