/**
 * 校验出错
 * Field 加 data-invalid，输入框加 aria-invalid，再用 FieldError 说明怎么改。
 */
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function FieldInvalidExample() {
  return (
    <Field data-invalid className="max-w-sm">
      <FieldLabel htmlFor="field-invalid-cron">执行计划</FieldLabel>
      <Input
        id="field-invalid-cron"
        defaultValue="0 2 * *"
        aria-invalid
        aria-describedby="field-invalid-cron-error"
        className="font-mono"
      />
      <FieldError id="field-invalid-cron-error">
        Cron 表达式需要 5 段，当前只有 4 段。
      </FieldError>
    </Field>
  );
}
