import { TrashIcon } from "@phosphor-icons/react";
import { useRef } from "react";

import { ConfirmDialog } from "@/components/eridanus/confirm-dialog";
import { notify } from "@/components/eridanus/toaster";
import { Button } from "@/components/ui/button";

export default function ConfirmDialogDemo() {
  // The first confirmation fails on purpose, to show the dialog's error state.
  const attempts = useRef(0);
  return (
    <ConfirmDialog
      trigger={
        <Button size="sm" variant="destructive">
          <TrashIcon data-icon="inline-start" />
          清理失败任务
        </Button>
      }
      title="清理失败任务？"
      description="删除 12 个重试次数已用完的任务，删除后无法恢复。第一次确认会模拟失败。"
      confirmLabel="清理失败任务"
      destructive
      onConfirm={async () => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        if (attempts.current++ === 0)
          throw new Error("服务返回 503，可以稍后重试");
        notify("已清理 12 个任务");
      }}
    />
  );
}
