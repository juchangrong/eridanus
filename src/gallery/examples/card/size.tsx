/**
 * 紧凑尺寸
 * size="sm" 把卡片内边距从 20 像素收到 16 像素，适合并排的指标卡。
 */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

const stats = [
  { label: "今日运行", value: "1,284" },
  { label: "失败", value: "17" },
  { label: "排队中", value: "6" },
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
