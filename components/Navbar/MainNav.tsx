"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { usePathname } from "next-intl/client";
import Link from "next-intl/link";
import { useTranslations } from "next-intl";

const MainNav = ({ className }: React.HTMLAttributes<HTMLElement>) => {
  const t = useTranslations("Index");
  const params = useParams();
  const pathname = usePathname();

  const routes = [
    {
      label: t("settings"),
      href: `/${params.storeId}/settings`,
      isActive: pathname === `/${params.storeId}/settings`,
    },
  ];

  return (
    <nav className={cn("flex items-center gap-4", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          locale={String(params.locale)}
          className={cn(
            "rounded-md font-medium text-gray-500 hover:text-gray-700 px-3 py-2",
            route.isActive ? "bg-gray-100" : "hover:text-gray-700",
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
