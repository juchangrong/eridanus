import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Retry settings
      </PopoverTrigger>
      <PopoverContent align="start">
        <PopoverHeader>
          <PopoverTitle>Retry settings</PopoverTitle>
          <PopoverDescription>
            Failed runs are retried automatically using these settings.
          </PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-3">
          <div className="grid grid-cols-3 items-center gap-3">
            <Label htmlFor="popover-demo-times">Attempts</Label>
            <Input
              id="popover-demo-times"
              defaultValue="3"
              inputMode="numeric"
              className="col-span-2"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-3">
            <Label htmlFor="popover-demo-interval">Interval</Label>
            <Input
              id="popover-demo-interval"
              defaultValue="30 sec"
              className="col-span-2"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
