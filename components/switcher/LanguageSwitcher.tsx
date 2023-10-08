"use client";

import Link from "next-intl/link";
import { useParams } from "next/navigation";
import { Sa, Us } from "react-flags-select";
import { usePathname } from "next-intl/client";

const LanguageSwitcher = () => {
    const params = useParams();
    const pathname = usePathname();

    return (
        <div className="border mx-6 rounded-lg p-1 cursor-pointer hover:bg-gray-100">
            <Link href={pathname} locale={params.locale === "ar" ? "en" : "ar"}>
                {params.locale === "en" ? (
                    <Us className="w-6 h-6 rounded-lg" />
                ) : (
                    <Sa className="w-6 h-6 rounded-lg" />
                )}
            </Link>
        </div>
    )
}

export default LanguageSwitcher;