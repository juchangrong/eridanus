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
        render={<Button variant="outline" size="icon" aria-label="重新运行" />}
      >
        <ArrowClockwiseIcon />
      </TooltipTrigger>
      <TooltipContent>用相同参数重新运行</TooltipContent>
    </Tooltip>
  );
}
