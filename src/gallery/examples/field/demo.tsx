import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function FieldDemo() {
  return (
    <FieldGroup className="max-w-sm">
      <Field>
        <FieldLabel htmlFor="field-demo-name">项目名称</FieldLabel>
        <Input
          id="field-demo-name"
          placeholder="例如：数据平台"
          aria-describedby="field-demo-name-hint"
        />
        <FieldDescription id="field-demo-name-hint">
          显示在侧栏和通知里，最多 32 个字。
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="field-demo-summary">简介</FieldLabel>
        <Textarea id="field-demo-summary" placeholder="这个项目负责什么" />
      </Field>
    </FieldGroup>
  );
}
