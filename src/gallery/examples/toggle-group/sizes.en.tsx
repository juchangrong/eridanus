/**
 * Sizes
 * size has three steps: sm, default and lg. Set on ToggleGroup, it is passed down to every item.
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
          aria-label={`Alignment (${size})`}
        >
          <ToggleGroupItem value="left" aria-label="Align left">
            <TextAlignLeftIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <TextAlignCenterIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <TextAlignRightIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      ))}
    </div>
  );
}
