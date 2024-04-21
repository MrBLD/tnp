import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children, 
  // showNavbar = true,
}: Readonly<{
  children: React.ReactNode;
  // showNavbar?: boolean;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      {/* {showNavbar && <Navbar />} */}
      <div><Navbar /></div>
        {children}
      </body>
    </html>
  );
}
