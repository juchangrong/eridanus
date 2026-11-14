/**
 * Date range
 * mode="range" selects a start and end date, and numberOfMonths shows two months side by side.
 */
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { enUS } from "react-day-picker/locale";

import { Calendar } from "@/components/ui/calendar";

export default function CalendarRangeExample() {
  const [range, setRange] = useState<DateRange | undefined>(() => {
    const to = new Date();
    const from = new Date(to);
    from.setDate(to.getDate() - 6);
    return { from, to };
  });

  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      numberOfMonths={2}
      locale={enUS}
      className="rounded-2xl border"
    />
  );
}
