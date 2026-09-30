import { Notice } from "@/components/eridanus/notice";
import { notify } from "@/components/eridanus/toaster";
import { Button } from "@/components/ui/button";

export default function NoticeDemo() {
  return (
    <Notice
      tone="error"
      title="运行记录加载失败"
      description="服务返回 500，可以稍后重试。"
      action={
        <Button
          size="sm"
          variant="secondary"
          onClick={() => notify("已重新加载")}
        >
          重试
        </Button>
      }
      className="w-full max-w-xl"
    />
  );
}
