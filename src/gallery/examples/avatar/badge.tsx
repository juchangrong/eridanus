/**
 * 状态角标
 * AvatarBadge 叠在右下角标出在线状态，状态本身仍要用文字写出来。
 */
import { Avatar, AvatarBadge, AvatarFallback } from "@/components/ui/avatar";

const members = [
  { name: "陈默", initial: "陈", online: true },
  { name: "许文", initial: "许", online: false },
];

export default function AvatarBadgeExample() {
  return (
    <ul className="grid gap-3">
      {members.map((member) => (
        <li key={member.name} className="flex items-center gap-3 text-sm">
          <Avatar>
            <AvatarFallback>{member.initial}</AvatarFallback>
            {member.online ? <AvatarBadge className="bg-success" /> : null}
          </Avatar>
          <span className="font-medium">{member.name}</span>
          <span className="text-muted-foreground">
            {member.online ? "在线" : "离线"}
          </span>
        </li>
      ))}
    </ul>
  );
}
