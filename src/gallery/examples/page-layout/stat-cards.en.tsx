/**
 * Stat cards
 * StatStrip variant="cards": an overview's headline numbers, each on a quiet tile, the row split evenly (two columns on phones); a card without a hint keeps the same height.
 */
import { StatStrip } from "@/components/eridanus/page-layout";

export default function StatCardsDemo() {
  return (
    <div className="w-full">
      <StatStrip
        variant="cards"
        items={[
          { label: "Runs, 24h", value: "1,843" },
          {
            label: "Failure rate",
            value: "0.4%",
            tone: "danger",
            hint: "7 failed",
          },
          { label: "In flight", value: "12", hint: "Cap 100" },
          { label: "Backlog", value: "3", tone: "warning" },
          { label: "p99 duration", value: "42.5s" },
        ]}
      />
    </div>
  );
}
