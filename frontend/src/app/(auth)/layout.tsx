import type { Metadata } from "next";
import { Cal_Sans, Geist, Geist_Mono } from "next/font/google";
// import { NavbarDemo } from "@/components/navbar";
import "./global.css";
// import { Navbar } from "@/components/ui/resizable-navbar";
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
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <NavbarDemo />
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
