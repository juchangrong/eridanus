/**
 * 按名字取色
 * tint="name"：没有头像时，首字母用白色，底色按名字固定选一种，长列表里在头像加载前也能区分不同的人。
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
