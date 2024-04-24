"use client";

import useSWR from "swr";
import axios, { AxiosError } from "axios";
import { cn } from "@/lib/utils";
import { Navbar } from "./_components";
import { BASE_URL } from "@/constants";
import { AppContext, AppContextType } from "@/lib/context";

const fetcher = async (url: string) =>
  axios.get(url).then((response) => response.data);

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: user } = useSWR<AppContextType["user"], AxiosError>(
    `${BASE_URL}/user`,
    fetcher,
    {
      refreshInterval: 4000,
    },
  );

  return (
    <div id="app" className={cn("sidebar-open min-h-screen")}>
      <div className="app-layout">
        <Navbar user={user} />

        <AppContext.Provider value={{ user }}>
          <div className="app-content">
            {/* <Sidebar /> */}
            <div className="m-auto w-[98%] px-20">{children}</div>
          </div>
        </AppContext.Provider>
      </div>
    </div>
  );
}
