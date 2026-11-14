import { ArrowClockwiseIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger
        render={<Button variant="outline" size="icon" aria-label="Rerun" />}
      >
        <ArrowClockwiseIcon />
      </TooltipTrigger>
      <TooltipContent>Rerun with the same parameters</TooltipContent>
    </Tooltip>
  );
}
