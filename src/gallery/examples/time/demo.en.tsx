import { Time } from "@/components/eridanus/time";

const NOW = Date.now();
const MIN = 60_000;
const at = (offset: number, hours: number) => {
  const d = new Date(NOW);
  return new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate() + offset,
    hours,
    5,
    9,
  );
};
const today = at(0, new Date(NOW).getHours() < 12 ? 18 : 6);

const SAMPLES = [
  { label: "Within 10 seconds", value: new Date(NOW - 5_000) },
  { label: "Within an hour", value: new Date(NOW - 12 * MIN) },
  { label: "Today", value: today },
  { label: "Yesterday", value: at(-1, 14) },
  {
    label: "Previous years",
    value: new Date(new Date(NOW).getFullYear() - 1, 11, 3, 9, 30),
  },
  { label: "Future", value: new Date(NOW + 20 * MIN) },
];

export default function TimeDemo() {
  return (
    <dl className="m-0 grid grid-cols-[auto_auto] gap-x-8 gap-y-2 text-sm">
      {SAMPLES.map(({ label, value }) => (
        <div key={label} className="contents">
          <dt className="text-muted-foreground">{label}</dt>
          <dd className="m-0">
            <Time value={value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
