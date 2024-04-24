import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { Icons } from "../icons/icons";
import {
  Button,
  Checkbox,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components";

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
}: Readonly<MultiSelectProps>) {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleUnselect = (item: string): void => {
    onChange(selected.filter((i) => i !== item));
  };

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className={cn(
            "h-12 w-full justify-between rounded-xl border-[1px] border-[#EFF1F6] bg-[#EFF1F6] px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-[3px] focus:border-[#131316] focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
          )}
        >
          <div className="no-scrollbar flex w-full overflow-x-auto">
            {selected.map((item) => (
              <div key={item} className="inline-flex items-center">
                {options?.find((data) => data.value === item)?.label}

                <div
                  className="ml-1 mr-2 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
                </div>
              </div>
            ))}
          </div>
          <Icons.ArrowDown />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="sm:w-[410px]">
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
                      : [...selected, option.value],
                  );
                  setOpen(true);
                }}
              >
                <Checkbox
                  id="terms"
                  checked={selected.includes(option.value)}
                />

                <span className="py-1 text-base font-semibold text-[#131316] [letter-spacing:-0.4px]">
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
