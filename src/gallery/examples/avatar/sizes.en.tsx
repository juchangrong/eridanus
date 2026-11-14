/**
 * Sizes
 * size has three steps: sm, default and lg, which are 24, 32 and 40 pixels.
 */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AvatarSizesExample() {
  return (
    <div className="flex items-center gap-3">
      <Avatar size="sm">
        <AvatarFallback>J</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>J</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>J</AvatarFallback>
      </Avatar>
    </div>
  );
}
