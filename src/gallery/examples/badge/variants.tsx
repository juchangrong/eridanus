/**
 * 变体
 * variant 共六种；destructive 只用于失败和错误，别拿来做普通强调。
 */
import { Badge } from "@/components/ui/badge";

export default function BadgeVariantsExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>default</Badge>
      <Badge variant="secondary">secondary</Badge>
      <Badge variant="destructive">destructive</Badge>
      <Badge variant="outline">outline</Badge>
      <Badge variant="ghost">ghost</Badge>
      <Badge variant="link">link</Badge>
    </div>
  );
}
