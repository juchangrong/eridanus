/**
 * Tinted by name
 * tint="name": without a picture, the initials sit in white on a color the name picks, so people stay apart in a long list before their pictures load.
 */
import { PersonAvatar } from "@/components/eridanus/person-avatar";

const PEOPLE = [
  "liuyang",
  "chenxi@example.com",
  "wangfang",
  "zhaolei",
  "sunmei",
];

export default function PersonAvatarTint() {
  return (
    <div className="flex flex-wrap items-center gap-5 text-sm">
      {PEOPLE.map((name) => (
        <span key={name} className="inline-flex items-center gap-2">
          <PersonAvatar name={name} tint="name" />
          {name.replace(/@.*$/, "")}
        </span>
      ))}
    </div>
  );
}
