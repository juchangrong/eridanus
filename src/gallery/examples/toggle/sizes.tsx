/**
 * 尺寸
 * size 有 sm、default、lg 三档；只有图标时用 aria-label 命名。
 */
import { StarIcon } from "@phosphor-icons/react";

import { Toggle } from "@/components/ui/toggle";

export default function ToggleSizesExample() {
  return (
    <div className="flex items-center gap-2">
      <Toggle size="sm" variant="outline" aria-label="收藏工作流">
        <StarIcon />
      </Toggle>
      <Toggle variant="outline" aria-label="收藏工作流">
        <StarIcon />
      </Toggle>
      <Toggle size="lg" variant="outline" aria-label="收藏工作流">
        <StarIcon />
      </Toggle>
    </div>
  );
}
