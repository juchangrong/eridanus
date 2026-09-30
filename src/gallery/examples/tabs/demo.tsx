import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="overview">概览</TabsTrigger>
        <TabsTrigger value="runs">运行记录</TabsTrigger>
        <TabsTrigger value="settings">设置</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="text-muted-foreground">
        近 30 天运行 1,284 次，成功率 98.6%，平均耗时 4 分 12 秒。
      </TabsContent>
      <TabsContent value="runs" className="text-muted-foreground">
        最近一次运行 #2048 于今天 02:00 开始，仍在执行。
      </TabsContent>
      <TabsContent value="settings" className="text-muted-foreground">
        每天 02:00 触发，超时 30 分钟，失败时通知 ops@example.com。
      </TabsContent>
    </Tabs>
  );
}
