import "./globals.css";
import type { Metadata } from "next";
import {IBM_Plex_Sans_Arabic} from "next/font/google";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import clerkAr from "@/public/locales/ar/clerkAr";

const font = IBM_Plex_Sans_Arabic({
    subsets: ["arabic", "latin"],
    weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard for the app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={clerkAr}>
      <html lang="ar" dir="rtl">
        <body className={font.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
