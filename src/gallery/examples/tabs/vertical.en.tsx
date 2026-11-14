/**
 * Vertical layout
 * Add orientation="vertical" to Tabs to arrange the tabs in a column. The arrow keys switch up and down instead.
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
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="general" className="text-muted-foreground">
        Project name, default branch, and time zone.
      </TabsContent>
      <TabsContent value="notifications" className="text-muted-foreground">
        Send email and webhooks when a run fails. Stay quiet on success.
      </TabsContent>
      <TabsContent value="billing" className="text-muted-foreground">
        On-demand billing. 382 compute hours used this month.
      </TabsContent>
    </Tabs>
  );
}
