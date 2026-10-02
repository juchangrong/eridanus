/**
 * 日期范围
 * mode="range" 选择起止日期，numberOfMonths 并排显示两个月。
 */
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { zhCN } from "react-day-picker/locale";

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
      locale={zhCN}
      className="rounded-2xl border"
    />
  );
}
