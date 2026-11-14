import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AvatarDemo() {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="https://example.com/avatars/lin-xiao.png" alt="" />
        <AvatarFallback>L</AvatarFallback>
      </Avatar>
      <div className="grid gap-0.5 text-sm">
        <span className="font-medium">Lena Xiao</span>
        <span className="text-muted-foreground">lin.xiao@example.com</span>
      </div>
    </div>
  );
}
