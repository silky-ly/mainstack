import "@/styles/globals.scss";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Mainstack",
  description: "Assessment",
  icons: {
    icon: "/favicon.ico",
  },
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={cn("min-h-screen font-sans antialiased", degular.variable)}
      >
        {children}
      </body>
    </html>
  );
}
