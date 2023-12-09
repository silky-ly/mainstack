import { Icons } from "@/components/icons";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components";

const sideIcons = [
  {
    icon: <Icons.product data-testid="product-icon" />,
    content: "Link in Bio",
  },
  {
    icon: <Icons.productTwo data-testid="productTwo-icon" />,
    content: "Store",
  },
  {
    icon: <Icons.productThree data-testid="productThree-icon" />,
    content: "Media Kit",
  },
  {
    icon: <Icons.productFour data-testid="productFour-icon" />,
    content: "Invoicing",
  },
];

export function Sidebar() {
  return (
    <div className="sidebar">
      {sideIcons?.map((icons) => (
        <TooltipProvider key={icons.content}>
          <Tooltip>
            <TooltipTrigger className="p-2 grayscale hover:grayscale-0 hover:rounded-full hover:bg-[#EFF1F6]">
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
