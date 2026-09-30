/**
 * 合计与说明
 * TableFooter 放合计行，TableCaption 说明表格内容，读屏软件会把它当作表格标题。
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
  { project: "数据平台", runs: 8_412, hours: 312.5 },
  { project: "增长实验", runs: 2_096, hours: 48.2 },
  { project: "财务报表", runs: 620, hours: 21.7 },
];

const totalRuns = usage.reduce((sum, row) => sum + row.runs, 0);
const totalHours = usage.reduce((sum, row) => sum + row.hours, 0);

export default function TableFooterExample() {
  return (
    <Table>
      <TableCaption>9 月各项目的运行次数与计算时长</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>项目</TableHead>
          <TableHead className="text-right">运行次数</TableHead>
          <TableHead className="text-right">计算时长（小时）</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {usage.map((row) => (
          <TableRow key={row.project}>
            <TableCell>{row.project}</TableCell>
            <TableCell className="text-right tabular-nums">
              {row.runs.toLocaleString("zh-CN")}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {row.hours.toFixed(1)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>合计</TableCell>
          <TableCell className="text-right tabular-nums">
            {totalRuns.toLocaleString("zh-CN")}
          </TableCell>
          <TableCell className="text-right tabular-nums">
            {totalHours.toFixed(1)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
