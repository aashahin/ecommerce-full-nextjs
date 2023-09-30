import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { name } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const store = await prisma.store.create({
      data: {
        name,
        userId,
      },
    });

    return new NextResponse(JSON.stringify(store), { status: 201 });
  } catch (e) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
