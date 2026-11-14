import { Meter } from "@/components/eridanus/meter";

export default function MeterDemo() {
  return (
    <div className="grid w-full max-w-sm gap-5">
      <Meter label="In-flight runs" value={37} max={200} valueText="37 / 200" />
      <Meter
        label="In-flight runs"
        value={196}
        max={200}
        valueText="196 / 200"
      />
    </div>
  );
}
