/**
 * 带说明与禁用
 * 用 Field 的水平排列把说明挂在标签下面；disabled 的选项整行变淡。
 */
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

export default function CheckboxWithDescriptionExample() {
  return (
    <FieldGroup className="max-w-md">
      <Field orientation="horizontal">
        <Checkbox id="checkbox-desc-retry" defaultChecked />
        <FieldContent>
          <FieldLabel htmlFor="checkbox-desc-retry">失败后自动重试</FieldLabel>
          <FieldDescription>最多重试 3 次，每次间隔 30 秒。</FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal" data-disabled>
        <Checkbox id="checkbox-desc-archive" disabled />
        <FieldContent>
          <FieldLabel htmlFor="checkbox-desc-archive">完成后归档</FieldLabel>
          <FieldDescription>需要管理员权限。</FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  );
}
