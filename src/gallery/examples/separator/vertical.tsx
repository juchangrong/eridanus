/**
 * 竖向
 * orientation="vertical" 在一行里分隔内容，父元素需要给出高度。
 */
import { Separator } from "@/components/ui/separator";

export default function SeparatorVerticalExample() {
  return (
    <div className="flex h-5 items-center gap-4 text-sm">
      <span>1,284 次运行</span>
      <Separator orientation="vertical" />
      <span>17 次失败</span>
      <Separator orientation="vertical" />
      <span>平均 4 分 12 秒</span>
    </div>
  );
}
