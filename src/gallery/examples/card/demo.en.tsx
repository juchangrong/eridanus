import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const facts = [
  { label: "Last run", value: "Today 02:00" },
  { label: "Avg. duration", value: "4m 12s" },
  { label: "30-day success rate", value: "98.6%" },
];

export default function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Daily data sync</CardTitle>
        <CardDescription>
          Syncs the business database to the analytics database daily at 02:00.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-2">
          {facts.map((fact) => (
            <div key={fact.label} className="flex justify-between gap-4">
              <dt className="text-muted-foreground">{fact.label}</dt>
              <dd className="tabular-nums">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">View runs</Button>
        <Button>Run now</Button>
      </CardFooter>
    </Card>
  );
}
