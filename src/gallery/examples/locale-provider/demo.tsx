import { CopyButton } from "@/components/eridanus/copy-button";
import { LocaleProvider } from "@/components/eridanus/locale-provider";
import { Pager } from "@/components/eridanus/pager";
import { Time } from "@/components/eridanus/time";
import { TimeRangePicker } from "@/components/eridanus/time-range-picker";
import type { Locale } from "@/lib/eridanus/locale";

const AN_HOUR_AGO = new Date(Date.now() - 42 * 60_000);

function Sample({ locale }: { locale: Locale }) {
  return (
    <LocaleProvider locale={locale}>
      <div lang={locale} className="flex flex-col items-start gap-3">
        <span className="font-mono text-xs text-muted-foreground">
          {locale}
        </span>
        <div className="flex items-center gap-2 text-sm">
          <Time value={AN_HOUR_AGO} />
          <CopyButton text="run_8f3a2c91e" />
        </div>
        <TimeRangePicker value={{ last: "1h" }} onChange={() => {}} />
        <Pager total={173} page={0} pageSize={50} onPage={() => {}} />
      </div>
    </LocaleProvider>
  );
}

export default function LocaleProviderDemo() {
  return (
    <div className="grid w-full gap-8 sm:grid-cols-2">
      <Sample locale="zh-CN" />
      <Sample locale="en-US" />
    </div>
  );
}
