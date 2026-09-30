/**
 * 跟随异步任务
 * toast.promise 先显示进行中，任务结束后在同一条通知里换成成功或失败。
 */
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

function exportReport() {
  return new Promise<number>((resolve) => {
    setTimeout(() => resolve(18_402), 2000);
  });
}

export default function ToastPromiseExample() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        void toast.promise(exportReport(), {
          loading: "正在导出报表…",
          success: (rows) => ({
            title: "报表已导出",
            description: `共 ${rows.toLocaleString("zh-CN")} 行。`,
          }),
          error: "导出失败，请稍后重试",
        })
      }
    >
      导出报表
    </Button>
  );
}
