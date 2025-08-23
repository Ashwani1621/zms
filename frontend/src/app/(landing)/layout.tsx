import type { Metadata } from "next";
import { Cal_Sans, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavbarDemo } from "@/components/navbar";
import { Footer } from "@/components/navbar/footer";
import { StickyBannerDemo } from "@/components/stickyBanner/banner";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZMS Website",
  description: "Zoo Management System Website for Zoos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <StickyBannerDemo/>
          <NavbarDemo />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
