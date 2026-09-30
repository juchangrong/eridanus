import { notify } from "@/components/eridanus/toaster";
import { Button } from "@/components/ui/button";
import { copyText } from "@/lib/eridanus/clipboard";

export default function ClipboardDemo() {
  const copy = () =>
    copyText("npx shadcn@latest add juchangrong/eridanus/time").then(
      () => notify("已复制安装命令"),
      () =>
        notify("复制失败", {
          type: "error",
          description: "浏览器拒绝了剪贴板访问。",
        }),
    );
  return (
    <Button size="sm" variant="secondary" onClick={() => void copy()}>
      复制 time 的安装命令
    </Button>
  );
}
