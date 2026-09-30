/**
 * 选择文件
 * type="file" 沿用同样的外观，用 accept 限定可选的文件类型。
 */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputFileExample() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="input-file-config">导入工作流配置</Label>
      <Input id="input-file-config" type="file" accept=".json,.yaml,.yml" />
    </div>
  );
}
