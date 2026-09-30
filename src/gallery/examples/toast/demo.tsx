import { notify } from "@/components/eridanus/toaster";
import { Button } from "@/components/ui/button";

export default function ToastDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        notify("设置已保存", {
          description: "新的超时时间从下一次运行开始生效。",
        })
      }
    >
      保存设置
    </Button>
  );
}
