import { Separator } from "@/components/ui/separator";

export default function SeparatorDemo() {
  return (
    <div className="w-full max-w-sm text-sm">
      <div className="grid gap-1">
        <h4 className="font-medium">每日数据同步</h4>
        <p className="text-muted-foreground">
          每天 02:00 从业务库同步到分析库。
        </p>
      </div>
      <Separator className="my-4" />
      <dl className="grid grid-cols-2 gap-1">
        <dt className="text-muted-foreground">负责人</dt>
        <dd>林晓</dd>
        <dt className="text-muted-foreground">最近运行</dt>
        <dd>今天 02:00</dd>
      </dl>
    </div>
  );
}
