import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { links, profiles } from "./config";
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

export function Navbar({
  user,
}: Readonly<{
  user?: { first_name?: string; last_name?: string; email?: string };
}>) {
  const pathname = usePathname();

  return (
    <div className="m-auto mt-4 grid h-14 w-full items-center rounded-full bg-white px-5 shadow-md sm:grid-cols-4">
      <Icons.Logo data-testid="logo" className="col-span-1 cursor-pointer" />

      <div className="col-span-2 flex w-[88%] items-center justify-evenly">
        {links.map((link, index) => (
          <Link
            key={link.title}
            data-testid={`nav-link-${index}`}
            href={link.to}
            className={cn(
              "duration mx-auto inline-flex h-10 cursor-pointer items-center gap-x-1 px-6 text-center text-sm font-semibold tracking-tight text-[#56616B] ease-in hover:rounded-full hover:bg-[#EFF1F6]",
              pathname === link.to &&
                "rounded-full bg-[#131316] px-4 py-1.5 text-white hover:bg-[#131316]",
            )}
          >
            {link.icon}
            {link.title}
          </Link>
        ))}
      </div>

      <div className="col-span-1 flex w-full items-center justify-end gap-3">
        <div className="flex w-1/6 items-center justify-between">
          <Link href={"/"} data-testid="notifications">
            <Icons.Notification />
          </Link>
          <Link href={"/"} data-testid="chat">
            <Icons.Chat />
          </Link>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#EFF1F6] py-1 pl-[5px] pr-3">
              <Avatar>
                <AvatarFallback className="text-center text-sm font-semibold leading-4 text-[#F2F3F5] [letter-spacing:-0.4px]">
                  {user?.first_name?.charAt(0)}
                  {user?.last_name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Icons.Menu />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="border-t-0 px-3 py-4 shadow-sm">
            <DropdownMenuLabel>
              <div className="flex gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="text-center text-base font-semibold leading-4 text-[#F2F3F5] [letter-spacing:-0.4px]">
                    {user?.first_name?.substring(0, 1)}
                    {user?.last_name?.substring(0, 1)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="text-base font-bold text-[#131316] [letter-spacing:-0.2px]">
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
                  <span className="text-bold text-sm text-[#131316] [letter-spacing:-0.2px]">
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
