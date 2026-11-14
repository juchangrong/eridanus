/**
 * Underline style
 * variant="line" on TabsList removes the background and marks the current tab with an underline, which suits page-level navigation.
 */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsLineExample() {
  return (
    <Tabs defaultValue="members" className="w-full max-w-md">
      <TabsList variant="line">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="members">Members</TabsTrigger>
        <TabsTrigger value="keys">Access keys</TabsTrigger>
      </TabsList>
      <TabsContent value="general" className="text-muted-foreground">
        Project name, default branch, and time zone.
      </TabsContent>
      <TabsContent value="members" className="text-muted-foreground">
        12 members, including 2 admins.
      </TabsContent>
      <TabsContent value="keys" className="text-muted-foreground">
        2 active keys. The oldest expires in 7 days.
      </TabsContent>
    </Tabs>
  );
}
