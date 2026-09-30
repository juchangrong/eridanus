/**
 * 尺寸
 * size 有 sm、default、lg 三档，分别是 24、32、40 像素。
 */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AvatarSizesExample() {
  return (
    <div className="flex items-center gap-3">
      <Avatar size="sm">
        <AvatarFallback>周</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>周</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>周</AvatarFallback>
      </Avatar>
    </div>
  );
}
