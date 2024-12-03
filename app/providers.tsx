"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/app/components/theme-provider";
import { ShowAddPostModalProvider } from "./contexts/ShowAddPostModal";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ShowAddPostModalProvider>
          {children}
        </ShowAddPostModalProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
