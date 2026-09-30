/**
 * 带图标
 * 图标加 data-icon 标明在文字哪一侧；只有图标的按钮必须用 aria-label 命名。
 */
import {
  ArrowRightIcon,
  DownloadSimpleIcon,
  TrashIcon,
} from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";

export default function ButtonWithIconExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline">
        <DownloadSimpleIcon data-icon="inline-start" />
        导出日志
      </Button>
      <Button variant="secondary">
        下一步
        <ArrowRightIcon data-icon="inline-end" />
      </Button>
      <Button variant="ghost" size="icon" aria-label="删除运行记录">
        <TrashIcon />
      </Button>
    </div>
  );
}
