import { useLocale } from "@/components/eridanus/locale-provider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { isLocale } from "@/lib/eridanus/locale";

import { setDocsLocale, useT } from "../i18n";

const OPTIONS = [
  { value: "zh-CN", text: "中", label: "中文", lang: "zh-CN" },
  { value: "en-US", text: "EN", label: "English", lang: "en" },
] as const;

/** Each option is named in its own language, so it can be found from either. */
export function LocaleSwitch() {
  const locale = useLocale();
  const t = useT();
  return (
    <ToggleGroup
      aria-label={t("语言", "Language")}
      size="sm"
      variant="outline"
      spacing={0}
      value={[locale]}
      onValueChange={([next]) => {
        if (isLocale(next)) setDocsLocale(next);
      }}
    >
      {OPTIONS.map(({ value, text, label, lang }) => (
        <ToggleGroupItem
          key={value}
          value={value}
          lang={lang}
          aria-label={label}
          title={label}
          className="min-w-8 px-2 text-xs"
        >
          {text}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
