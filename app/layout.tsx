import "./globals.css";
import type {Metadata} from "next";
import React from "react";
import {ClerkProvider} from "@clerk/nextjs";
import clerkAr from "@/public/locales/ar/clerkAr";
import localFont from 'next/font/local'

const font = localFont({
    src: [
        {
            path: "../lib/fonts/ibm-plex-arabic/IBMPlexSansArabic-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../lib/fonts/ibm-plex-arabic/IBMPlexSansArabic-Medium.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "../lib/fonts/ibm-plex-arabic/IBMPlexSansArabic-SemiBold.woff2",
            weight: "600",
            style: "normal",
        },
        {
            path: "../lib/fonts/ibm-plex-arabic/IBMPlexSansArabic-Bold.woff2",
            weight: "700",
            style: "normal",
        }
    ]
})

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
