/**
 * File selection
 * type="file" keeps the same look. Use accept to limit the selectable file types.
 */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputFileExample() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="input-file-config">Import workflow config</Label>
      <Input id="input-file-config" type="file" accept=".json,.yaml,.yml" />
    </div>
  );
}
