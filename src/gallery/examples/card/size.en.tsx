/**
 * Compact size
 * size="sm" reduces the card padding from 20 pixels to 16 pixels, which suits metric cards placed side by side.
 */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

const stats = [
  { label: "Runs today", value: "1,284" },
  { label: "Failed", value: "17" },
  { label: "Queued", value: "6" },
];

export default function CardSizeExample() {
  return (
    <div className="grid w-full grid-cols-3 gap-3">
      {stats.map((stat) => (
        <Card key={stat.label} size="sm">
          <CardHeader>
            <CardDescription>{stat.label}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-heading text-2xl font-medium tabular-nums">
              {stat.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
