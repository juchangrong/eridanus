/**
 * 禁用
 * disabled 的文本框不可编辑也不可聚焦。
 */
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function TextareaDisabledExample() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="textarea-disabled-summary">工作流说明</Label>
      <Textarea
        id="textarea-disabled-summary"
        defaultValue="由平台统一维护的内置工作流，不能修改说明。"
        disabled
      />
    </div>
  );
}
