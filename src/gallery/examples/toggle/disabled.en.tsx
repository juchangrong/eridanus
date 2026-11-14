/**
 * Disabled
 * A disabled toggle keeps its current state and can no longer be switched.
 */
import { BellSlashIcon } from "@phosphor-icons/react";

import { Toggle } from "@/components/ui/toggle";

export default function ToggleDisabledExample() {
  return (
    <div className="flex items-center gap-2">
      <Toggle variant="outline" disabled>
        <BellSlashIcon data-icon="inline-start" />
        Mute notifications
      </Toggle>
      <Toggle variant="outline" defaultPressed disabled>
        <BellSlashIcon data-icon="inline-start" />
        Mute notifications
      </Toggle>
    </div>
  );
}
