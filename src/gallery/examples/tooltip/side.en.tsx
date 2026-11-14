/**
 * Side
 * side decides which side the tooltip appears on. It flips to the opposite side automatically when there is not enough room.
 */
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const sides = [
  { side: "top", label: "Top" },
  { side: "right", label: "Right" },
  { side: "bottom", label: "Bottom" },
  { side: "left", label: "Left" },
] as const;

export default function TooltipSideExample() {
  return (
    <div className="flex flex-wrap gap-2">
      {sides.map(({ side, label }) => (
        <Tooltip key={side}>
          <TooltipTrigger render={<Button variant="outline" />}>
            {label}
          </TooltipTrigger>
          <TooltipContent side={side}>Last run: today 02:00</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
