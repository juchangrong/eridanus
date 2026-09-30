/**
 * 下划线样式
 * TabsList 的 variant="line" 去掉底色，用下划线标出当前页，适合页面级导航。
 */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsLineExample() {
  return (
    <Tabs defaultValue="members" className="w-full max-w-md">
      <TabsList variant="line">
        <TabsTrigger value="general">常规</TabsTrigger>
        <TabsTrigger value="members">成员</TabsTrigger>
        <TabsTrigger value="keys">访问密钥</TabsTrigger>
      </TabsList>
      <TabsContent value="general" className="text-muted-foreground">
        项目名称、默认分支和时区。
      </TabsContent>
      <TabsContent value="members" className="text-muted-foreground">
        12 位成员，其中 2 位管理员。
      </TabsContent>
      <TabsContent value="keys" className="text-muted-foreground">
        2 个有效密钥，最早的一个 7 天后过期。
      </TabsContent>
    </Tabs>
  );
}
