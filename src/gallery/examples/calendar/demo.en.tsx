import { useState } from "react";
import { enUS } from "react-day-picker/locale";

import { Calendar } from "@/components/ui/calendar";

export default function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(() => new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      locale={enUS}
      className="rounded-2xl border"
    />
  );
}
