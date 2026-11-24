import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

/** Up to two initials from a name or an email's local part. */
function initials(name: string): string {
  return name.replace(/@.*$/, "").slice(0, 2).toUpperCase();
}

/** The hues a tinted fallback picks from: spread round the wheel, each
 * keeping white initials above 4.5:1 at the lightness below. */
const HUES = [25, 70, 145, 195, 250, 300];

/** One of HUES, picked by the name, so a person keeps their color. */
function hueOf(name: string): number {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) | 0;
  return HUES[Math.abs(hash) % HUES.length]!;
}

/**
 * A person's picture, or their initials while there is none or it fails to
 * load. Decorative: render the name beside it, since the avatar is hidden
 * from screen readers. `tint="name"` sets the initials in white on a color
 * picked by the name, so people tell each other apart in a long list before
 * their pictures load; the default keeps the neutral ground.
 */
export function PersonAvatar({
  name,
  src,
  size = "sm",
  tint = "none",
  className,
}: {
  name: string;
  src?: string;
  size?: "sm" | "default" | "lg";
  tint?: "none" | "name";
  className?: string;
}) {
  return (
    <Avatar size={size} aria-hidden className={className}>
      {src ? (
        <AvatarImage src={src} alt="" referrerPolicy="no-referrer" />
      ) : null}
      <AvatarFallback
        className={cn("font-medium", tint === "name" && "text-white")}
        style={
          tint === "name"
            ? { backgroundColor: `oklch(0.52 0.13 ${hueOf(name)})` }
            : undefined
        }
      >
        {initials(name)}
      </AvatarFallback>
    </Avatar>
  );
}
