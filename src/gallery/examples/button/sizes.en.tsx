/**
 * Sizes
 * Text buttons come in four steps: xs, sm, default and lg. Icon buttons use the matching icon-* sizes.
 */
import { GearSixIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";

export default function ButtonSizesExample() {
  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="xs" variant="outline">
          xs
        </Button>
        <Button size="sm" variant="outline">
          sm
        </Button>
        <Button variant="outline">default</Button>
        <Button size="lg" variant="outline">
          lg
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="icon-xs" variant="outline" aria-label="Settings">
          <GearSixIcon />
        </Button>
        <Button size="icon-sm" variant="outline" aria-label="Settings">
          <GearSixIcon />
        </Button>
        <Button size="icon" variant="outline" aria-label="Settings">
          <GearSixIcon />
        </Button>
        <Button size="icon-lg" variant="outline" aria-label="Settings">
          <GearSixIcon />
        </Button>
      </div>
    </div>
  );
}
