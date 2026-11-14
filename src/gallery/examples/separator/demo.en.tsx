import { Separator } from "@/components/ui/separator";

export default function SeparatorDemo() {
  return (
    <div className="w-full max-w-sm text-sm">
      <div className="grid gap-1">
        <h4 className="font-medium">Daily data sync</h4>
        <p className="text-muted-foreground">
          Syncs from the business database to the analytics database at 02:00
          every day.
        </p>
      </div>
      <Separator className="my-4" />
      <dl className="grid grid-cols-2 gap-1">
        <dt className="text-muted-foreground">Owner</dt>
        <dd>Avery Lin</dd>
        <dt className="text-muted-foreground">Last run</dt>
        <dd>Today 02:00</dd>
      </dl>
    </div>
  );
}
