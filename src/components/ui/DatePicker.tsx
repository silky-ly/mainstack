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
      <PopoverTrigger asChild className="">
        <Button
          variant={"outline"}
          aria-expanded="false"
          data-state="closed"
          className={cn(
            "flex h-12 w-full items-center justify-between rounded-xl border-[#EFF1F6] bg-[#EFF1F6] text-left font-normal focus:border-[3px] focus:border-[#131316] focus:outline-none",
            !date && "text-muted-foreground",
          )}
        >
          {date ? format(date, "dd MMM yyyy") : <span>Pick a date</span>}
          <Icons.ArrowDown />
        </Button>
      </PopoverTrigger>

      <PopoverContent side="bottom" align="start" className="p-0 sm:w-[410px]">
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
