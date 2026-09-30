/**
 * 变体
 * variant 决定按钮的强调程度，一屏里通常只有一个 default。
 */
import { Button } from "@/components/ui/button";

export default function ButtonVariantsExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>default</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="outline">outline</Button>
      <Button variant="ghost">ghost</Button>
      <Button variant="destructive">destructive</Button>
      <Button variant="link">link</Button>
    </div>
  );
}
