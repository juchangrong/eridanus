/**
 * 作为链接
 * 用 render 把徽标渲染成 <a>，悬停时会有反馈。
 */
import { Badge } from "@/components/ui/badge";

export default function BadgeLinkExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge
        variant="outline"
        render={<a href="https://example.com/runs/2048" />}
      >
        运行 #2048
      </Badge>
      <Badge variant="link" render={<a href="https://example.com/releases" />}>
        查看版本记录
      </Badge>
    </div>
  );
}
