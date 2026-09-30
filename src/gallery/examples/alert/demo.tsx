import { InfoIcon } from "@phosphor-icons/react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertDemo() {
  return (
    <Alert className="max-w-md">
      <InfoIcon />
      <AlertTitle>本周六凌晨维护</AlertTitle>
      <AlertDescription>
        02:00–04:00 升级调度服务，期间新提交的运行会排队，维护结束后自动开始。
      </AlertDescription>
    </Alert>
  );
}
