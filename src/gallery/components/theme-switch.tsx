import { DesktopIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";

import {
  type ThemePreference,
  useTheme,
} from "@/components/eridanus/theme-provider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { useT } from "../i18n";

const OPTIONS = [
  { value: "system", zh: "跟随系统", en: "System", Icon: DesktopIcon },
  { value: "light", zh: "浅色", en: "Light", Icon: SunIcon },
  { value: "dark", zh: "深色", en: "Dark", Icon: MoonIcon },
] as const;

const isPreference = (value: unknown): value is ThemePreference =>
  OPTIONS.some((o) => o.value === value);

export function ThemeSwitch() {
  const { preference, setPreference } = useTheme();
  const t = useT();
  return (
    <ToggleGroup
      aria-label={t("主题", "Theme")}
      size="sm"
      variant="outline"
      spacing={0}
      value={[preference]}
      // Pressing the pressed item would leave nothing selected; keep it.
      onValueChange={([next]) => {
        if (isPreference(next)) setPreference(next);
      }}
    >
      {OPTIONS.map(({ value, zh, en, Icon }) => (
        <ToggleGroupItem
          key={value}
          value={value}
          aria-label={t(zh, en)}
          title={t(zh, en)}
        >
          <Icon />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
