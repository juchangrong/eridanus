/**
 * 带图标与禁用
 * 图标直接放在 TabsTrigger 里；暂不可用的标签加 disabled。
 */
import { ChartBarIcon, ListBulletsIcon, LockIcon } from "@phosphor-icons/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsWithIconExample() {
  return (
    <Tabs defaultValue="logs" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="logs">
          <ListBulletsIcon />
          日志
        </TabsTrigger>
        <TabsTrigger value="metrics">
          <ChartBarIcon />
          指标
        </TabsTrigger>
        <TabsTrigger value="audit" disabled>
          <LockIcon />
          审计
        </TabsTrigger>
      </TabsList>
      <TabsContent value="logs" className="font-mono text-muted-foreground">
        02:00:03 开始拉取 orders 表，共 18,402 行
      </TabsContent>
      <TabsContent value="metrics" className="text-muted-foreground">
        峰值内存 1.2 GB，CPU 平均占用 38%。
      </TabsContent>
      <TabsContent value="audit" className="text-muted-foreground">
        审计日志仅对管理员开放。
      </TabsContent>
    </Tabs>
  );
}
