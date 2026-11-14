/**
 * Sizes
 * size has three steps: sm, default and lg. When there is only an icon, name it with aria-label.
 */
import { StarIcon } from "@phosphor-icons/react";

import { Toggle } from "@/components/ui/toggle";

export default function ToggleSizesExample() {
  return (
    <div className="flex items-center gap-2">
      <Toggle size="sm" variant="outline" aria-label="Favorite workflow">
        <StarIcon />
      </Toggle>
      <Toggle variant="outline" aria-label="Favorite workflow">
        <StarIcon />
      </Toggle>
      <Toggle size="lg" variant="outline" aria-label="Favorite workflow">
        <StarIcon />
      </Toggle>
    </div>
  );
}
