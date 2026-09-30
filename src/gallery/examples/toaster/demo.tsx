import { notify } from "@/components/eridanus/toaster";
import { Button } from "@/components/ui/button";

export default function ToasterDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        size="sm"
        variant="secondary"
        onClick={() => notify("设置已保存")}
      >
        成功提示
      </Button>
      <Button
        size="sm"
        variant="secondary"
        onClick={() =>
          notify("保存失败", {
            type: "error",
            description: "服务返回 409：配置已被其他人修改。",
          })
        }
      >
        错误提示
      </Button>
    </div>
  );
}
