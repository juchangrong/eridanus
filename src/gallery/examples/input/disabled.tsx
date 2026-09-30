/**
 * 禁用
 * disabled 的输入框不可聚焦也不会随表单提交；只想展示不让改时用 readOnly。
 */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputDisabledExample() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="input-disabled-id">项目 ID</Label>
      <Input id="input-disabled-id" defaultValue="proj_7c21a9" disabled />
    </div>
  );
}
