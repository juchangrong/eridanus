/**
 * Disabled
 * A disabled input cannot be focused and is not submitted with the form. To display a value without letting it change, use readOnly.
 */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputDisabledExample() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="input-disabled-id">Project ID</Label>
      <Input id="input-disabled-id" defaultValue="proj_7c21a9" disabled />
    </div>
  );
}
