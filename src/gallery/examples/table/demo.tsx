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
  succeeded: { label: "成功", variant: "secondary" },
  failed: { label: "失败", variant: "destructive" },
  running: { label: "运行中", variant: "outline" },
} as const;

const runs: {
  id: string;
  workflow: string;
  status: keyof typeof statuses;
  duration: string;
}[] = [
  {
    id: "#2048",
    workflow: "每日数据同步",
    status: "running",
    duration: "1 分 05 秒",
  },
  { id: "#2047", workflow: "周报生成", status: "failed", duration: "38 秒" },
  {
    id: "#2046",
    workflow: "清理过期快照",
    status: "succeeded",
    duration: "52 秒",
  },
  {
    id: "#2045",
    workflow: "每日数据同步",
    status: "succeeded",
    duration: "4 分 03 秒",
  },
];

export default function TableDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>运行</TableHead>
          <TableHead>工作流</TableHead>
          <TableHead>状态</TableHead>
          <TableHead className="text-right">耗时</TableHead>
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
