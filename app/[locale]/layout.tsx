import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import clerkAr from "@/public/locales/ar/clerkAr";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import ModalProvider from "@/providers/modal-provider";
import font from "@/lib/fonts/fonts";
import ToastProvider from "@/providers/toast-provider";

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
        <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
          <body className={font.className}>
            <ToastProvider />
            <ModalProvider />
            {children}
          </body>
        </html>
      </ClerkProvider>
    </NextIntlClientProvider>
  );
}
