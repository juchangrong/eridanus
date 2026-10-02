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
        重试设置
      </PopoverTrigger>
      <PopoverContent align="start">
        <PopoverHeader>
          <PopoverTitle>重试设置</PopoverTitle>
          <PopoverDescription>
            失败的运行会按这里的设置自动重试。
          </PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-3">
          <div className="grid grid-cols-3 items-center gap-3">
            <Label htmlFor="popover-demo-times">次数</Label>
            <Input
              id="popover-demo-times"
              defaultValue="3"
              inputMode="numeric"
              className="col-span-2"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-3">
            <Label htmlFor="popover-demo-interval">间隔</Label>
            <Input
              id="popover-demo-interval"
              defaultValue="30 秒"
              className="col-span-2"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
