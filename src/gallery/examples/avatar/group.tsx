/**
 * 头像组
 * AvatarGroup 让头像互相叠压，AvatarGroupCount 显示放不下的人数。
 */
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";

const members = ["林", "陈", "许", "周"];

export default function AvatarGroupExample() {
  return (
    <div className="flex items-center gap-3 text-sm">
      <AvatarGroup>
        {members.map((initial) => (
          <Avatar key={initial}>
            <AvatarFallback>{initial}</AvatarFallback>
          </Avatar>
        ))}
        <AvatarGroupCount>+8</AvatarGroupCount>
      </AvatarGroup>
      <span className="text-muted-foreground">12 位成员</span>
    </div>
  );
}
