/**
 * 带操作
 * AlertAction 固定在右上角，放一个能直接处理这条提示的按钮。
 */
import { KeyIcon } from "@phosphor-icons/react";

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function AlertWithActionExample() {
  return (
    <Alert className="max-w-md">
      <KeyIcon />
      <AlertTitle>访问密钥 7 天后过期</AlertTitle>
      <AlertDescription>过期后，使用它的定时任务会停止运行。</AlertDescription>
      <AlertAction>
        <Button size="xs" variant="outline">
          续期
        </Button>
      </AlertAction>
    </Alert>
  );
}
