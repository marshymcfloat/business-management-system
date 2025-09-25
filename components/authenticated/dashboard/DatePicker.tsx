// components/authenticated/dashboard/DatePicker.tsx (Corrected)

"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type DatePickerProps = {
  value?: Date;
  onChange: (date?: Date) => void;
  className?: string;
};

export default function DatePicker({
  value,
  onChange,
  className,
}: DatePickerProps) {
  const [isPopoverOpen, setPopoverOpen] = React.useState(false);

  // --- FIX IS HERE ---
  // Create a NEW date object for the calendar, leaving the original `value` untouched.
  const selectedDateForCalendar = React.useMemo(() => {
    if (!value) return undefined;
    const dateOnly = new Date(value); // Create a copy
    dateOnly.setHours(0, 0, 0, 0); // Mutate the copy
    return dateOnly;
  }, [value]);
  // --------------------

  const selectedTime = value ? format(value, "HH:mm") : "";

  const handleDateChange = (newDate: Date | undefined) => {
    if (!newDate) {
      onChange(undefined);
      return;
    }

    // Get the existing time from the original `value` prop, or default to 00:00
    const currentHours = value ? value.getHours() : 0;
    const currentMinutes = value ? value.getMinutes() : 0;

    // Apply the existing time to the newly selected date
    newDate.setHours(currentHours, currentMinutes);

    onChange(newDate);
    setPopoverOpen(false); // Close the popover after selecting a date
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    const datePart = value || new Date(); // Use existing date or today if none
    const newDate = new Date(datePart); // Create a copy to avoid mutation

    const [hours, minutes] = time.split(":").map(Number);

    // Check for valid numbers before setting
    if (!isNaN(hours) && !isNaN(minutes)) {
      newDate.setHours(hours, minutes);
      onChange(newDate);
    }
  };

  return (
    <div className={cn("grid grid-cols-2 gap-4 items-start", className)}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="date-picker">Date</Label>
        <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              id="date-picker"
              className={cn(
                "w-[200px] justify-start text-left font-normal",
                !value && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? format(value, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDateForCalendar}
              onSelect={handleDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="time-picker">Time</Label>
        <Input
          id="time-picker"
          type="time"
          value={selectedTime}
          onChange={handleTimeChange}
          className="w-[120px]"
        />
      </div>
    </div>
  );
}
