import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BaseDemo() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <div className="flex flex-col gap-1">
        <span className="font-heading text-lg font-medium tracking-tight">
          Weekly report · 周报生成
        </span>
        <span className="text-sm text-muted-foreground">
          拉丁字母用 Inter，代码和标识用 JetBrains Mono，中文跟随系统字体。
        </span>
        <span className="font-mono text-[13px]">
          run_3k9x2m7qa1b8 · 2026-09-28 14:05:31.207 UTC+8
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm">立即同步</Button>
        <Button size="sm" variant="secondary">
          编辑配置
        </Button>
        <Button size="sm" variant="outline">
          导出
        </Button>
        <Button size="sm" variant="ghost">
          取消
        </Button>
        <Button size="sm" variant="destructive">
          删除项目
        </Button>
      </div>
      <Input
        aria-label="示例输入"
        placeholder="输入框和按钮同一套圆角"
        className="h-7 max-w-72"
      />
      <div className="flex flex-wrap gap-4 text-sm">
        <span>foreground</span>
        <span className="text-muted-foreground">muted-foreground</span>
        <span className="text-destructive">destructive</span>
      </div>
    </div>
  );
}
