import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const statuses = {
  succeeded: { label: "Succeeded", variant: "secondary" },
  failed: { label: "Failed", variant: "destructive" },
  running: { label: "Running", variant: "outline" },
} as const;

const runs: {
  id: string;
  workflow: string;
  status: keyof typeof statuses;
  duration: string;
}[] = [
  {
    id: "#2048",
    workflow: "Daily data sync",
    status: "running",
    duration: "1 min 05 sec",
  },
  {
    id: "#2047",
    workflow: "Weekly report",
    status: "failed",
    duration: "38 sec",
  },
  {
    id: "#2046",
    workflow: "Clean up expired snapshots",
    status: "succeeded",
    duration: "52 sec",
  },
  {
    id: "#2045",
    workflow: "Daily data sync",
    status: "succeeded",
    duration: "4 min 03 sec",
  },
];

export default function TableDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Run</TableHead>
          <TableHead>Workflow</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {runs.map((run) => (
          <TableRow key={run.id}>
            <TableCell className="font-mono">{run.id}</TableCell>
            <TableCell>{run.workflow}</TableCell>
            <TableCell>
              <Badge variant={statuses[run.status].variant}>
                {statuses[run.status].label}
              </Badge>
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {run.duration}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
