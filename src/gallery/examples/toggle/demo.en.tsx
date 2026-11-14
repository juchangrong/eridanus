import { PushPinIcon } from "@phosphor-icons/react";

import { Toggle } from "@/components/ui/toggle";

export default function ToggleDemo() {
  return (
    <Toggle>
      <PushPinIcon data-icon="inline-start" />
      Pin
    </Toggle>
  );
}
