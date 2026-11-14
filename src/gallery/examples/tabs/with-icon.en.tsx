/**
 * With icons and disabled
 * Put an icon directly inside TabsTrigger. Add disabled to a tab that is temporarily unavailable.
 */
import { ChartBarIcon, ListBulletsIcon, LockIcon } from "@phosphor-icons/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsWithIconExample() {
  return (
    <Tabs defaultValue="logs" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="logs">
          <ListBulletsIcon />
          Logs
        </TabsTrigger>
        <TabsTrigger value="metrics">
          <ChartBarIcon />
          Metrics
        </TabsTrigger>
        <TabsTrigger value="audit" disabled>
          <LockIcon />
          Audit
        </TabsTrigger>
      </TabsList>
      <TabsContent value="logs" className="font-mono text-muted-foreground">
        02:00:03 Started pulling the orders table, 18,402 rows
      </TabsContent>
      <TabsContent value="metrics" className="text-muted-foreground">
        Peak memory 1.2 GB, average CPU usage 38%.
      </TabsContent>
      <TabsContent value="audit" className="text-muted-foreground">
        Audit logs are available to admins only.
      </TabsContent>
    </Tabs>
  );
}
