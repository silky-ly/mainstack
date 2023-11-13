"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, Calendar } from "@/components/ui";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui";
import { Icons } from "../icons/icons";

export function DatePicker() {
  const [date, setDate] = React.useState<Date>(new Date());

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full h-12 rounded-xl flex justify-between items-center text-left font-normal border-[#EFF1F6] bg-[#EFF1F6]",
            !date && "text-muted-foreground"
          )}
        >
          {date ? format(date, "PP") : <span>Pick a date</span>}
          <Icons.arrowDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(day) => setDate(day as Date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
