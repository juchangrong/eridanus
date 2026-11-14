import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="input-demo-email">Notification email</Label>
      <Input id="input-demo-email" type="email" placeholder="ops@example.com" />
    </div>
  );
}
