import * as React from "react";
import { cn } from "@/lib/utils";

import { Check, X } from "lucide-react";
import {
  Button,
  Checkbox,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components";
import { Icons } from "../icons/icons";

export type OptionType = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  options: OptionType[];
  selected: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  className,
  ...props
}: MultiSelectProps) {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleUnselect = (item: string): void => {
    onChange(selected.filter((i) => i !== item));
  };

  // there's an issue with the overflow. when multi-select-input is selected, the arrow down becomes arrow up. a lot of glitch on the multi-select.
  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between h-12 border border-[#EFF1F6] bg-[#EFF1F6]  px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-[3px] rounded-xl focus:ring-[#131316] focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
          )}
          onClick={() => setOpen(!open)}
        >
          <div className="flex w-full">
            {selected.map((item) => (
              <div key={item} className="inline-flex items-center">
                {item}
                <button
                  className="ml-1 mr-2 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(item);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(item)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </div>
            ))}
          </div>
          <Icons.arrowDown />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="">
        <Command className={className}>
          <CommandInput placeholder="Search ..." />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => {
                  onChange(
                    selected.includes(option.value)
                      ? selected.filter((item) => item !== option.value)
                      : [...selected, option.value]
                  );
                  setOpen(true);
                }}
              >
                {/* <Check
                  className={cn(
                    "mr-2 h-4 w-4 bg-black text-white",
                    selected.includes(option.value)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                /> */}

                <Checkbox
                  id="terms"
                  // className={cn(
                  //   "mr-2",
                  //   selected.includes(option.value)
                  //     ? "opacity-100"
                  //     : "opacity-0"
                  // )}
                />

                <span className="py-1 text-base font-semibold [letter-spacing:-0.4px] text-[#131316]">
                  {option.label}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
