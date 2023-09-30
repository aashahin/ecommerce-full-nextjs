import localFont from "next/font/local";

export const font = localFont({
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

export default font;
