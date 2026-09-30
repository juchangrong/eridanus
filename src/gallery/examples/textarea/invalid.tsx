/**
 * 校验出错
 * aria-invalid 显示错误样式，错误说明用 aria-describedby 关联到文本框。
 */
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function TextareaInvalidExample() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="textarea-invalid-reason">停用原因</Label>
      <Textarea
        id="textarea-invalid-reason"
        aria-invalid
        aria-describedby="textarea-invalid-reason-error"
      />
      <p
        id="textarea-invalid-reason-error"
        className="text-sm text-destructive"
      >
        请填写停用原因，方便其他成员了解情况。
      </p>
    </div>
  );
}
