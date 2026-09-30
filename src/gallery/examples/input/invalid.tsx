/**
 * 校验出错
 * aria-invalid 会让输入框显示错误样式，错误说明用 aria-describedby 关联。
 */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputInvalidExample() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="input-invalid-email">通知邮箱</Label>
      <Input
        id="input-invalid-email"
        type="email"
        defaultValue="ops@example"
        aria-invalid
        aria-describedby="input-invalid-email-error"
      />
      <p id="input-invalid-email-error" className="text-sm text-destructive">
        邮箱缺少域名后缀，例如 ops@example.com。
      </p>
    </div>
  );
}
