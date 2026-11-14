/**
 * Avatar group
 * AvatarGroup overlaps the avatars, and AvatarGroupCount shows how many more do not fit.
 */
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";

const members = ["L", "M", "A", "J"];

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
      <span className="text-muted-foreground">12 members</span>
    </div>
  );
}
