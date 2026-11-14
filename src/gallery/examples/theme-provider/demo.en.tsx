import { DesktopIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";

import {
  type ThemePreference,
  useTheme,
} from "@/components/eridanus/theme-provider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const OPTIONS = [
  { value: "system", label: "System", Icon: DesktopIcon },
  { value: "light", label: "Light", Icon: SunIcon },
  { value: "dark", label: "Dark", Icon: MoonIcon },
] as const;

const isPreference = (value: unknown): value is ThemePreference =>
  OPTIONS.some((o) => o.value === value);

export default function ThemeProviderDemo() {
  const { preference, resolved, setPreference } = useTheme();
  return (
    <div className="flex flex-col items-center gap-3">
      <ToggleGroup
        aria-label="Theme"
        variant="outline"
        spacing={0}
        value={[preference]}
        onValueChange={([next]) => {
          if (isPreference(next)) setPreference(next);
        }}
      >
        {OPTIONS.map(({ value, label, Icon }) => (
          <ToggleGroupItem
            key={value}
            value={value}
            aria-label={label}
            title={label}
          >
            <Icon />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <p className="m-0 text-sm text-muted-foreground">
        Selected <span className="font-mono text-foreground">{preference}</span>
        {", "}applied{" "}
        <span className="font-mono text-foreground">{resolved}</span>
      </p>
    </div>
  );
}
