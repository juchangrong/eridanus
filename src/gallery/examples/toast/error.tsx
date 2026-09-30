/**
 * 错误
 * type: "error" 的通知会立即播报，并且一直停留到用户手动关闭。
 */
import { notify } from "@/components/eridanus/toaster";
import { Button } from "@/components/ui/button";

export default function ToastErrorExample() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        notify("部署失败", {
          type: "error",
          description: "镜像 registry.example.com/sync:2.4.1 拉取超时。",
        })
      }
    >
      部署
    </Button>
  );
}
