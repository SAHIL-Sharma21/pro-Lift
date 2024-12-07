import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AppProvider from '@/app/AppProvider';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import {Toaster} from '@/components/ui/toaster';

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
  title: "Pro Lift",
  description: "Pro lift application is for buying gym products which will make your life easier",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col`}
      >
        <AppProvider>
          <Navbar />
          {children}
          <Toaster/>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
