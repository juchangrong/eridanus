/**
 * Outline style
 * variant="outline" adds a border to each item, which makes them easier to recognize on a light background.
 */
import {
  CalendarBlankIcon,
  ClockIcon,
  LightningIcon,
} from "@phosphor-icons/react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function ToggleGroupOutlineExample() {
  return (
    <ToggleGroup
      variant="outline"
      defaultValue={["schedule"]}
      aria-label="Trigger"
    >
      <ToggleGroupItem value="schedule">
        <CalendarBlankIcon data-icon="inline-start" />
        Schedule
      </ToggleGroupItem>
      <ToggleGroupItem value="event">
        <LightningIcon data-icon="inline-start" />
        Event
      </ToggleGroupItem>
      <ToggleGroupItem value="manual">
        <ClockIcon data-icon="inline-start" />
        Manual
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
