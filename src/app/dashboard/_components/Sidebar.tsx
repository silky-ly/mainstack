import { sideIcons } from "./config";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components";

export function Sidebar() {
  return (
    <div className="sidebar">
      {sideIcons?.map((icons) => (
        <TooltipProvider key={icons.content}>
          <Tooltip>
            <TooltipTrigger className="p-2 grayscale hover:rounded-full hover:bg-[#EFF1F6] hover:grayscale-0">
              {icons.icon}
            </TooltipTrigger>
            <TooltipContent className="">
              {icons.content}
              <TooltipArrow width={11} height={5} />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
