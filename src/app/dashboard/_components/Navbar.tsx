import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import {
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components";

const links = [
  {
    to: "/",
    title: "Home",
    icon: <Icons.home />,
  },
  {
    to: "/",
    title: "Analytics",
    icon: <Icons.analytics />,
  },
  {
    to: "/dashboard",
    title: "Revenue",
    icon: <Icons.revenue />,
  },
  {
    to: "/",
    title: "CRM",
    icon: <Icons.crm />,
  },
  {
    to: "/",
    title: "Apps",
    icon: <Icons.apps />,
  },
];

const profiles = [
  {
    to: "/",
    title: "Settings",
    icon: <Icons.settings />,
  },
  {
    to: "/",
    title: "Purchase History",
    icon: <Icons.purchaseHistory />,
  },
  {
    to: "/",
    title: "Refer and Earn",
    icon: <Icons.refer />,
  },
  {
    to: "/",
    title: "Integrations",
    icon: <Icons.integrations />,
  },
  {
    to: "/",
    title: "Report Bug",
    icon: <Icons.reportBug />,
  },
  {
    to: "/",
    title: "Switch Account",
    icon: <Icons.switchAccount />,
  },
  {
    to: "/",
    title: "Sign Out",
    icon: <Icons.signOut />,
  },
];

export function Navbar({
  user,
}: {
  user?: { first_name?: string; last_name?: string; email?: string };
}) {
  const pathname = usePathname();

  return (
    <div className="w-full h-14 mt-4 m-auto px-5 grid sm:grid-cols-4 items-center rounded-full shadow-md bg-white">
      <Icons.logo data-testid="logo" className="col-span-1 cursor-pointer" />

      <div className="col-span-2 w-[88%] flex justify-evenly items-center">
        {links.map((link, index) => (
          <Link
            key={link.title}
            data-testid={`nav-link-${index}`}
            href={link.to}
            className={cn(
              "inline-flex gap-x-1 px-6 h-10 items-center mx-auto cursor-pointer text-sm text-center font-semibold tracking-tight ease-in duration hover:rounded-full hover:bg-[#EFF1F6] text-[#56616B]",
              pathname === link.to &&
                "bg-[#131316] text-white px-4 py-1.5 rounded-full hover:bg-[#131316]"
            )}
          >
            {link.icon}
            {link.title}
          </Link>
        ))}
      </div>

      <div className="w-full col-span-1 flex justify-end items-center gap-3">
        <div className="w-1/6 flex justify-between items-center">
          <Link href={"/"} data-testid="notifications">
            <Icons.notification />
          </Link>
          <Link href={"/"} data-testid="chat">
            <Icons.chat />
          </Link>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="py-1 pl-[5px] pr-3 inline-flex items-center gap-2 rounded-full cursor-pointer bg-[#EFF1F6]">
              <Avatar>
                <AvatarFallback className="text-sm text-center font-semibold leading-4 [letter-spacing:-0.4px] text-[#F2F3F5]">
                  {user?.first_name?.substring(0, 1)}
                  {user?.last_name?.substring(0, 1)}
                </AvatarFallback>
              </Avatar>
              <Icons.menu />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="py-4 px-3 shadow-sm border-t-0">
            <DropdownMenuLabel>
              <div className="flex gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="text-base text-center font-semibold leading-4 [letter-spacing:-0.4px] text-[#F2F3F5]">
                    {user?.first_name?.substring(0, 1)}
                    {user?.last_name?.substring(0, 1)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="text-base font-bold [letter-spacing:-0.2px] text-[#131316]">
                    {user?.first_name} {user?.last_name}
                  </p>
                  <span className="text-xs font-medium tracking-tight text-[#56616B]">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuGroup className="mt-4 flex flex-col gap-6">
              {profiles.map((profile, index) => (
                <DropdownMenuItem
                  key={profile.title}
                  className="items-center"
                  data-testid={`profile-option-${index}`}
                >
                  {profile.icon} &nbsp; &nbsp;
                  <span className="text-sm text-bold [letter-spacing:-0.2px] text-[#131316]">
                    {profile.title}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
