/**
 * 字段分组
 * FieldSet 和 FieldLegend 把一组相关字段包起来，读屏软件会先读出分组名。
 */
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function FieldFieldsetExample() {
  return (
    <FieldSet className="w-full max-w-sm">
      <FieldLegend>失败通知</FieldLegend>
      <FieldDescription>运行失败时，会同时发到下面两个地址。</FieldDescription>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="fieldset-email">邮箱</FieldLabel>
          <Input
            id="fieldset-email"
            type="email"
            placeholder="ops@example.com"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="fieldset-webhook">Webhook 地址</FieldLabel>
          <Input
            id="fieldset-webhook"
            type="url"
            placeholder="https://example.com/hooks/runs"
          />
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}
