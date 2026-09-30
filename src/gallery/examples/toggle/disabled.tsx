/**
 * 禁用
 * disabled 的开关保持当前状态，不能再切换。
 */
import { BellSlashIcon } from "@phosphor-icons/react";

import { Toggle } from "@/components/ui/toggle";

export default function ToggleDisabledExample() {
  return (
    <div className="flex items-center gap-2">
      <Toggle variant="outline" disabled>
        <BellSlashIcon data-icon="inline-start" />
        静音通知
      </Toggle>
      <Toggle variant="outline" defaultPressed disabled>
        <BellSlashIcon data-icon="inline-start" />
        静音通知
      </Toggle>
    </div>
  );
}
