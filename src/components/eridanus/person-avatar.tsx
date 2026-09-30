import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/** Up to two initials from a name or an email's local part. */
function initials(name: string): string {
  return name.replace(/@.*$/, "").slice(0, 2).toUpperCase();
}

/**
 * A person's picture, or their initials while there is none or it fails to
 * load. Decorative: render the name beside it, since the avatar is hidden
 * from screen readers.
 */
export function PersonAvatar({
  name,
  src,
  size = "sm",
  className,
}: {
  name: string;
  src?: string;
  size?: "sm" | "default" | "lg";
  className?: string;
}) {
  return (
    <Avatar size={size} aria-hidden className={className}>
      {src ? (
        <AvatarImage src={src} alt="" referrerPolicy="no-referrer" />
      ) : null}
      <AvatarFallback className="font-medium">{initials(name)}</AvatarFallback>
    </Avatar>
  );
}
