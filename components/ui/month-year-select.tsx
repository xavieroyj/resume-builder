import * as React from "react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface MonthYearSelectProps {
  value?: string // Format: "yyyy-MM"
  onChange: (value: string) => void
  className?: string
  placeholder?: string
  disabled?: boolean
}

export function MonthYearSelect({
  value,
  onChange,
  className,
  placeholder = "Select date",
  disabled = false
}: MonthYearSelectProps) {
  // Generate years (e.g., last 100 years)
  const years = React.useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, i) => currentYear - i);
  }, []);

  // Generate months
  const months = React.useMemo(() => [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" }
  ], []);

  // Split the value into year and month
  const selectedYear = value ? value.split("-")[0] : undefined;
  const selectedMonth = value ? value.split("-")[1] : undefined;

  // Format the display value
  const displayValue = React.useMemo(() => {
    if (!value) return "";
    try {
      return format(new Date(parseInt(value.split("-")[0]), parseInt(value.split("-")[1]) - 1), "MMMM yyyy");
    } catch {
      return "";
    }
  }, [value]);

  return (
    <div className={cn("grid grid-cols-2 gap-2", className)}>
      <Select
        value={selectedMonth}
        onValueChange={(month) => {
          const year = selectedYear || new Date().getFullYear().toString();
          onChange(`${year}-${month}`);
        }}
        disabled={disabled}
      >
        <SelectTrigger>
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          {months.map((month) => (
            <SelectItem key={month.value} value={month.value}>
              {month.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedYear}
        onValueChange={(year) => {
          const month = selectedMonth || "01";
          onChange(`${year}-${month}`);
        }}
        disabled={disabled}
      >
        <SelectTrigger>
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
  );
} 