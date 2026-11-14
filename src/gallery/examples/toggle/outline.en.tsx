/**
 * Outline style
 * variant="outline" adds a border, so it is clear this is a clickable control even when not pressed.
 */
import { UserIcon } from "@phosphor-icons/react";

import { Toggle } from "@/components/ui/toggle";

export default function ToggleOutlineExample() {
  return (
    <Toggle variant="outline" defaultPressed>
      <UserIcon data-icon="inline-start" />
      Assigned to me
    </Toggle>
  );
}
