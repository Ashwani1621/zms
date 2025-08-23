"use client"

import * as React from "react"
import { Dispatch, SetStateAction } from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface Calendar24Props {
  onDateChange: Dispatch<SetStateAction<Date | undefined>>;
}

export function Calendar24({ onDateChange }: Calendar24Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  const nextYear = new Date(today);
  nextYear.setFullYear(nextYear.getFullYear() + 1);

  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(today)

  React.useEffect(() => {
    onDateChange(date);
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date-picker"
          className="w-full justify-between font-normal"
        >
          {date ? date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }) : "Select date"}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            
            if (selectedDate && selectedDate < today) {
              return; 
            }
            setDate(selectedDate)
            if (selectedDate) {
              onDateChange(selectedDate)
            }
            setOpen(false)
          }}
          defaultMonth={today}
         
          disabled={{ before: today }}
          // --------------------
          toDate={nextYear}
          fromYear={today.getFullYear()}
          toYear={nextYear.getFullYear()}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  )
}