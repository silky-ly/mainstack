import { cn } from "@/lib/utils";
import "@/styles/globals.scss";
import type { Metadata } from "next";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Mainstack",
  description: "Assessment",
};

const degular = localFont({
  src: [
    {
      path: "fonts/degular/Degular-Thin.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "fonts/degular/Degular-Thin.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "fonts/degular/Degular-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "fonts/degular/Degular-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "fonts/degular/Degular-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "fonts/degular/Degular-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-degular",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("min-h-screen antialiased font-sans", degular.variable)}
      >
        {children}
      </body>
    </html>
  );
}
