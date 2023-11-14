import { Icons } from "@/components/icons";

const sideIcons = {
  one: <Icons.product />,
  two: <Icons.productTwo />,
  three: <Icons.productThree />,
  four: <Icons.productFour />,
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
