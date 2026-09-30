/**
 * 描边样式
 * variant="outline" 给每一项加边框，在浅色背景上更容易辨认。
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
      aria-label="触发方式"
    >
      <ToggleGroupItem value="schedule">
        <CalendarBlankIcon data-icon="inline-start" />
        定时
      </ToggleGroupItem>
      <ToggleGroupItem value="event">
        <LightningIcon data-icon="inline-start" />
        事件
      </ToggleGroupItem>
      <ToggleGroupItem value="manual">
        <ClockIcon data-icon="inline-start" />
        手动
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
