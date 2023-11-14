import { Icons } from "@/components/icons";

const sideIcons = {
  one: <Icons.product data-testid="product-icon" />,
  two: <Icons.productTwo data-testid="productTwo-icon" />,
  three: <Icons.productThree data-testid="productThree-icon" />,
  four: <Icons.productFour data-testid="productFour-icon" />,
};

export function Sidebar() {
  return (
    <div className="sidebar">
      {Object.values(sideIcons)?.map((icon, index) => (
        <div className="hover:bg-[#EFF1F6] p-2 hover:rounded-full" key={index}>
          {icon}
        </div>
      ))}
    </div>
  );
}
