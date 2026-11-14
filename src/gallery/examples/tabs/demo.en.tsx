import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="runs">Runs</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="text-muted-foreground">
        1,284 runs in the last 30 days, 98.6% success rate, 4 min 12 sec average
        duration.
      </TabsContent>
      <TabsContent value="runs" className="text-muted-foreground">
        The latest run, #2048, started today at 02:00 and is still running.
      </TabsContent>
      <TabsContent value="settings" className="text-muted-foreground">
        Triggers daily at 02:00, times out after 30 minutes, and notifies
        ops@example.com on failure.
      </TabsContent>
    </Tabs>
  );
}
