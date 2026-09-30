/**
 * 描边样式
 * variant="outline" 加一圈边框，没按下时也能看出这是个可点的控件。
 */
import { UserIcon } from "@phosphor-icons/react";

import { Toggle } from "@/components/ui/toggle";

export default function ToggleOutlineExample() {
  return (
    <Toggle variant="outline" defaultPressed>
      <UserIcon data-icon="inline-start" />
      只看我负责的
    </Toggle>
  );
}
