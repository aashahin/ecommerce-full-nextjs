import "./globals.css";
import type { Metadata } from "next";
import {Almarai, Inter} from "next/font/google";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import clerkAr from "@/public/locales/ar/clerkAr";

const inter = Almarai({
    subsets: ["arabic"],
    weight: ['400', '700'],
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
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
