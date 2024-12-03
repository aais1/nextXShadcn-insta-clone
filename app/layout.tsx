import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ReponsiveMenu from "./components/ReponsiveMenu";
import Providers from "./providers";
import {Navigation} from '@/app/components/Navigation'
import { Toaster } from "@/components/ui/toaster"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Next | Insta",
  description: "Insta Clone with Nextjs and Shadcn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
<Providers>

        <ReponsiveMenu/>
        <Navigation />
        {children}
        <Toaster />
</Providers>
            
       
      </body>
    </html>
  );
}
