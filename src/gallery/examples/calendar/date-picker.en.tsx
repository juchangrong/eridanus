/**
 * Date picker
 * Popover plus Calendar makes a date picker. The popover closes once a date is selected.
 */
import { CalendarBlankIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { enUS } from "react-day-picker/locale";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { localDay } from "@/lib/eridanus/format-time";

export default function CalendarDatePickerExample() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className="w-44 justify-start font-normal data-[empty=true]:text-muted-foreground"
            data-empty={!date}
          />
        }
      >
        <CalendarBlankIcon data-icon="inline-start" />
        {date ? localDay(date) : "Select date"}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(next) => {
            setDate(next);
            setOpen(false);
          }}
          locale={enUS}
        />
      </PopoverContent>
    </Popover>
  );
}
