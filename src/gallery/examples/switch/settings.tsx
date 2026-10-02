/**
 * 设置项
 * 说明在左、开关在右，常见于设置页；size="sm" 用在紧凑的工具栏里。
 */
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

export default function SwitchSettingsExample() {
  return (
    <FieldGroup className="max-w-md">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel htmlFor="switch-settings-public">公开项目</FieldLabel>
          <FieldDescription>组织内的所有人都能查看运行记录。</FieldDescription>
        </FieldContent>
        <Switch id="switch-settings-public" />
      </Field>
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel htmlFor="switch-settings-compact">紧凑模式</FieldLabel>
          <FieldDescription>表格行高从 36px 缩小到 28px。</FieldDescription>
        </FieldContent>
        <Switch id="switch-settings-compact" size="sm" defaultChecked />
      </Field>
    </FieldGroup>
  );
}
