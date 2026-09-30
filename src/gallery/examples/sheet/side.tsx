/**
 * 弹出方向
 * side 决定面板从哪一边滑入，默认是 right。
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
  { side: "top", label: "上" },
  { side: "right", label: "右" },
  { side: "bottom", label: "下" },
  { side: "left", label: "左" },
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
              <SheetTitle>运行 #2048</SheetTitle>
              <SheetDescription>
                从{label}侧滑入的面板，适合在不离开列表的情况下查看详情。
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
