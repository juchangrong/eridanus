import { DesktopIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";

import { useTheme, type ThemePreference } from "@/components/eridanus/theme-provider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const OPTIONS = [
  { value: "system", label: "跟随系统", Icon: DesktopIcon },
  { value: "light", label: "浅色", Icon: SunIcon },
  { value: "dark", label: "深色", Icon: MoonIcon },
] as const;

const isPreference = (value: unknown): value is ThemePreference => OPTIONS.some((o) => o.value === value);

export function ThemeSwitch() {
  const { preference, setPreference } = useTheme();
  return (
    <ToggleGroup
      aria-label="主题"
      size="sm"
      variant="outline"
      spacing={0}
      value={[preference]}
      // Pressing the pressed item would leave nothing selected; keep it.
      onValueChange={([next]) => {
        if (isPreference(next)) setPreference(next);
      }}
    >
      {OPTIONS.map(({ value, label, Icon }) => (
        <ToggleGroupItem key={value} value={value} aria-label={label} title={label}>
          <Icon />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
