import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Noto_Sans_Bengali,
} from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dr. SK. SERJINA ANWAR",
  description:
    "Child specialist, Paediatric Neurologiest, Neuro Development Specialist, Neurophysiology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        notoBengali.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
