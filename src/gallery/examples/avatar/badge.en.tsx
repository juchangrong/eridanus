/**
 * Status badge
 * AvatarBadge sits on the bottom right to show online status. The status itself should still be written out as text.
 */
import { Avatar, AvatarBadge, AvatarFallback } from "@/components/ui/avatar";

const members = [
  { name: "Mason Chen", initial: "M", online: true },
  { name: "Avery Xu", initial: "A", online: false },
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
            {member.online ? "Online" : "Offline"}
          </span>
        </li>
      ))}
    </ul>
  );
}
