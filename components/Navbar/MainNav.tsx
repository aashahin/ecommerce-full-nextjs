"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {createSharedPathnamesNavigation} from 'next-intl/navigation';

const MainNav = ({ className }: React.HTMLAttributes<HTMLElement>) => {
  const t = useTranslations("Index");
  const params = useParams();
  const locales = ['en', 'ar'] as const;
  const {Link, usePathname} = createSharedPathnamesNavigation({locales});
  const pathname = usePathname();

  const routes = [
    {
      label: t("overview"),
      href: `/${params.storeId}`,
      isActive: pathname === `/${params.storeId}`,
    },
    {
      label: t("billboards"),
      href: `/${params.storeId}/billboards`,
      isActive: pathname === `/${params.storeId}/billboards`,
    },
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

