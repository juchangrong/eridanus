/**
 * 竖向排列
 * Tabs 加 orientation="vertical"，标签排成一列，方向键改为上下切换。
 */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsVerticalExample() {
  return (
    <Tabs
      defaultValue="notifications"
      orientation="vertical"
      className="w-full max-w-md"
    >
      <TabsList>
        <TabsTrigger value="general">常规</TabsTrigger>
        <TabsTrigger value="notifications">通知</TabsTrigger>
        <TabsTrigger value="billing">计费</TabsTrigger>
      </TabsList>
      <TabsContent value="general" className="text-muted-foreground">
        项目名称、默认分支和时区。
      </TabsContent>
      <TabsContent value="notifications" className="text-muted-foreground">
        运行失败时发送邮件和 Webhook，成功时不打扰。
      </TabsContent>
      <TabsContent value="billing" className="text-muted-foreground">
        按需计费，本月已用 382 计算小时。
      </TabsContent>
    </Tabs>
  );
}
