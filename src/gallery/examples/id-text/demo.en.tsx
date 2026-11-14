import { IdText } from "@/components/eridanus/id-text";

const IDS = [
  { label: "Run ID", value: "run_8f3a2c91d04e4b7aa1c2e5f0c91e" },
  { label: "Trace ID", value: "4bf92f3577b34da6a3ce929d0e0e4736" },
  { label: "Short ID", value: "job_42" },
];

export default function IdTextDemo() {
  return (
    <dl className="m-0 grid grid-cols-[auto_auto] items-center gap-x-8 gap-y-2 text-sm">
      {IDS.map(({ label, value }) => (
        <div key={label} className="contents">
          <dt className="text-muted-foreground">{label}</dt>
          <dd className="m-0">
            <IdText value={value} copy copyLabel={`Copy ${label}`} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
