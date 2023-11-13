"use client";

import { cn } from "@/lib/utils";
import { Navbar, Sidebar } from "./_components";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="app" className={cn("sidebar-open min-h-screen")}>
      <div className="app-layout">
        <Navbar />
        <div className="app-content">
          {/* <Sidebar /> */}
          <div className="px-20 w-[98%] m-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
