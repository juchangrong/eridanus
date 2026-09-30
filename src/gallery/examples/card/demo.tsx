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
  { label: "最近运行", value: "今天 02:00" },
  { label: "平均耗时", value: "4 分 12 秒" },
  { label: "近 30 天成功率", value: "98.6%" },
];

export default function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>每日数据同步</CardTitle>
        <CardDescription>每天 02:00 把业务库同步到分析库。</CardDescription>
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
        <Button variant="outline">查看运行</Button>
        <Button>立即运行</Button>
      </CardFooter>
    </Card>
  );
}
