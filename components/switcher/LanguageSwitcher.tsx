"use client";

import { useParams } from "next/navigation";
import { Sa, Us } from "react-flags-select";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

const LanguageSwitcher = () => {
  const locales = ["en", "ar"] as const;
  const { Link, usePathname } = createSharedPathnamesNavigation({ locales });
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
  );
};

export default LanguageSwitcher;
