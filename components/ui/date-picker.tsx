import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DatePickerProps {
  date?: Date
  onSelect: (date: Date | undefined) => void
  className?: string
  placeholder?: string
  disabled?: boolean
}

export function DatePicker({
  date,
  onSelect,
  className,
  placeholder = "Pick a date",
  disabled = false
}: DatePickerProps) {
  const [calendarDate, setCalendarDate] = React.useState<Date | undefined>(date);

  // Generate years (e.g., last 100 years)
  const years = React.useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, i) => currentYear - i);
  }, []);

  // Generate months
  const months = React.useMemo(() => [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ], []);

  const handleMonthChange = React.useCallback((month: string) => {
    if (!calendarDate) {
      const newDate = new Date();
      newDate.setMonth(months.indexOf(month));
      setCalendarDate(newDate);
    } else {
      const newDate = new Date(calendarDate);
      newDate.setMonth(months.indexOf(month));
      setCalendarDate(newDate);
    }
  }, [calendarDate, months]);

  const handleYearChange = React.useCallback((year: string) => {
    if (!calendarDate) {
      const newDate = new Date();
      newDate.setFullYear(parseInt(year));
      setCalendarDate(newDate);
    } else {
      const newDate = new Date(calendarDate);
      newDate.setFullYear(parseInt(year));
      setCalendarDate(newDate);
    }
  }, [calendarDate]);

  const handleSelect = React.useCallback((date: Date | undefined) => {
    setCalendarDate(date);
    onSelect(date);
  }, [onSelect]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "MMMM yyyy") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex gap-2 p-3 pb-0">
          <Select
            value={calendarDate ? months[calendarDate.getMonth()] : months[new Date().getMonth()]}
            onValueChange={handleMonthChange}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={calendarDate ? calendarDate.getFullYear().toString() : new Date().getFullYear().toString()}
            onValueChange={handleYearChange}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          defaultMonth={calendarDate}
          initialFocus
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  )
} 