/**
 * Variants
 * variant has six options. Use destructive only for failures and errors, not for ordinary emphasis.
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
