/**
 * Totals and caption
 * TableFooter holds the totals row, and TableCaption describes the table. Screen readers treat it as the table title.
 */
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const usage = [
  { project: "Data platform", runs: 8_412, hours: 312.5 },
  { project: "Growth experiments", runs: 2_096, hours: 48.2 },
  { project: "Finance reports", runs: 620, hours: 21.7 },
];

const totalRuns = usage.reduce((sum, row) => sum + row.runs, 0);
const totalHours = usage.reduce((sum, row) => sum + row.hours, 0);

export default function TableFooterExample() {
  return (
    <Table>
      <TableCaption>
        Runs and compute hours by project in September
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead className="text-right">Runs</TableHead>
          <TableHead className="text-right">Compute hours</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {usage.map((row) => (
          <TableRow key={row.project}>
            <TableCell>{row.project}</TableCell>
            <TableCell className="text-right tabular-nums">
              {row.runs.toLocaleString("en-US")}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {row.hours.toFixed(1)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell className="text-right tabular-nums">
            {totalRuns.toLocaleString("en-US")}
          </TableCell>
          <TableCell className="text-right tabular-nums">
            {totalHours.toFixed(1)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
