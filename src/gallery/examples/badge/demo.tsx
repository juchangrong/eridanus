import { Badge } from "@/components/ui/badge";

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>已发布</Badge>
      <Badge variant="secondary">草稿</Badge>
      <Badge variant="destructive">失败</Badge>
      <Badge variant="outline">v2.4.1</Badge>
    </div>
  );
}
