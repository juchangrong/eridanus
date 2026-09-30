/**
 * 弹出方向
 * side 决定提示出现在哪一侧，空间不够时会自动翻到对侧。
 */
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const sides = [
  { side: "top", label: "上" },
  { side: "right", label: "右" },
  { side: "bottom", label: "下" },
  { side: "left", label: "左" },
] as const;

export default function TooltipSideExample() {
  return (
    <div className="flex flex-wrap gap-2">
      {sides.map(({ side, label }) => (
        <Tooltip key={side}>
          <TooltipTrigger render={<Button variant="outline" />}>
            {label}
          </TooltipTrigger>
          <TooltipContent side={side}>最近运行：今天 02:00</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
