import React from "react";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prismadb";
import Redirect from "@/hooks/use-redirect";

export default async function SetupLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { userId } = auth();
  if (!userId) {
    return Redirect({
      to: "/login",
      locale,
    });
  }

  const store = await prisma.store.findFirst({
    where: {
      userId: String(userId)
    },
  });

  if (store) {
    return Redirect({
        to: `/${store.id}`,
        locale,
    });
  }

  return <div>{children}</div>;
}
