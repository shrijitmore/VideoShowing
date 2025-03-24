import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/header";
import Script from "next/script";
import { TempoInit } from "./tempo-init";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Virtual Learning Platform",
  description:
    "Interactive learning platform with virtual labs and video content",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Script src="https://api.tempolabs.ai/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
          <Toaster />
          <TempoInit />
        </ThemeProvider>
      </body>
    </html>
  );
}
