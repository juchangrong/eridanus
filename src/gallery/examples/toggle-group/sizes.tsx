/**
 * 尺寸
 * size 有 sm、default、lg 三档，设在 ToggleGroup 上会传给每一项。
 */
import {
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@phosphor-icons/react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const sizes = ["sm", "default", "lg"] as const;

export default function ToggleGroupSizesExample() {
  return (
    <div className="grid justify-items-center gap-3">
      {sizes.map((size) => (
        <ToggleGroup
          key={size}
          size={size}
          variant="outline"
          defaultValue={["left"]}
          aria-label={`对齐方式（${size}）`}
        >
          <ToggleGroupItem value="left" aria-label="左对齐">
            <TextAlignLeftIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="居中">
            <TextAlignCenterIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="右对齐">
            <TextAlignRightIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      ))}
    </div>
  );
}
