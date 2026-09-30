import { PersonAvatar } from "@/components/eridanus/person-avatar";

const PEOPLE = ["liuyang", "chenxi@example.com", "wangfang"];

export default function PersonAvatarDemo() {
  return (
    <div className="flex flex-wrap items-center gap-5 text-sm">
      {PEOPLE.map((name) => (
        <span key={name} className="inline-flex items-center gap-2">
          <PersonAvatar name={name} />
          {name.replace(/@.*$/, "")}
        </span>
      ))}
    </div>
  );
}
