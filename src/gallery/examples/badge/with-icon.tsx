/**
 * 带图标
 * 图标加 data-icon="inline-start" 或 "inline-end"，徽标会收紧那一侧的内边距。
 */
import { ArrowUpRightIcon, CheckCircleIcon } from "@phosphor-icons/react";

import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";

export default function BadgeWithIconExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="secondary">
        <CheckCircleIcon data-icon="inline-start" />
        已通过
      </Badge>
      <Badge variant="outline">
        <Spinner data-icon="inline-start" aria-hidden />
        部署中
      </Badge>
      <Badge variant="outline">
        外部依赖
        <ArrowUpRightIcon data-icon="inline-end" />
      </Badge>
    </div>
  );
}
