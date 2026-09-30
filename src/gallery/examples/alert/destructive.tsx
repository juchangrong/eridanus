/**
 * 错误
 * variant="destructive" 用于失败和需要处理的问题，文字和图标都变成警示色。
 */
import { WarningCircleIcon } from "@phosphor-icons/react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertDestructiveExample() {
  return (
    <Alert variant="destructive" className="max-w-md">
      <WarningCircleIcon />
      <AlertTitle>运行 #2048 失败</AlertTitle>
      <AlertDescription>
        步骤“导出报表”重试 3 次后仍然超时，请检查目标存储是否可写。
      </AlertDescription>
    </Alert>
  );
}
