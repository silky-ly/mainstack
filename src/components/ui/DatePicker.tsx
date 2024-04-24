"use client";

import * as React from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Icons } from "../icons/icons";
import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";

export function DatePicker() {
  const [date, setDate] = React.useState<Date>(new Date());

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "flex h-12 w-full items-center justify-between rounded-xl border-[#EFF1F6] bg-[#EFF1F6] text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          {date ? format(date, "dd MMM yyyy") : <span>Pick a date</span>}
          <Icons.ArrowDown />
        </Button>
      </PopoverTrigger>

      <PopoverContent side="bottom" align="start" className="w-[410px] p-0">
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
