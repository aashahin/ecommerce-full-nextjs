import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import clerkAr from "@/public/locales/ar/clerkAr";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

const font = localFont({
  src: [
    {
      path: "../../lib/fonts/ibm-plex-arabic/IBMPlexSansArabic-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../lib/fonts/ibm-plex-arabic/IBMPlexSansArabic-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../lib/fonts/ibm-plex-arabic/IBMPlexSansArabic-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../lib/fonts/ibm-plex-arabic/IBMPlexSansArabic-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard for the app",
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export default async function RootLayout({
  children,
    params: { locale },
}: {
  children: React.ReactNode;
    params: { locale: string };
}) {
  let translations;
  try {
    translations = (
      await import(`../../public/locales/${locale}/${locale}.json`)
    ).default;
  } catch (error) {
    notFound();
  }

  return (
      <NextIntlClientProvider locale={locale} messages={translations}>
    <ClerkProvider localization={clerkAr}>
      <html lang="ar" dir="rtl">
        <body className={font.className}>{children}</body>
      </html>
    </ClerkProvider>
        </NextIntlClientProvider>
  );
}
