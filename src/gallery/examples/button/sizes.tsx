/**
 * 尺寸
 * 文字按钮有 xs、sm、default、lg 四档，图标按钮用对应的 icon-* 尺寸。
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
        <Button size="icon-xs" variant="outline" aria-label="设置">
          <GearSixIcon />
        </Button>
        <Button size="icon-sm" variant="outline" aria-label="设置">
          <GearSixIcon />
        </Button>
        <Button size="icon" variant="outline" aria-label="设置">
          <GearSixIcon />
        </Button>
        <Button size="icon-lg" variant="outline" aria-label="设置">
          <GearSixIcon />
        </Button>
      </div>
    </div>
  );
}
