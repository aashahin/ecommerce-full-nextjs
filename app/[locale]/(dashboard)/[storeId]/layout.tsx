import React from "react";
import { auth } from "@clerk/nextjs";
import Redirect from "@/hooks/use-redirect";
import prisma from "@/lib/prismadb";
import Navbar from "@/components/Navbar/Navbar";

export default async function DashboardLayout({
  children,
  params: { locale, storeId },
}: {
  children: React.ReactNode;
  params: { storeId: string; locale: string };
}) {
  const { userId } = auth();
  if (!userId) {
    return Redirect({
      to: "/login",
      locale,
    });
  }

  const store = await prisma.store.findUnique({
    where: {
      id: Number(storeId),
      userId: String(userId),
    },
  });

  if (!store) {
    return Redirect({
      to: "/404",
      locale,
    });
  }

  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
}
