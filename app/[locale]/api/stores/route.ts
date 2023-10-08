import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { nanoid } from "nanoid";

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

    const checkExists = await prisma.store.findFirst({
      where: {
        name,
        userId,
      },
    });

    if (checkExists) {
      return new NextResponse("Store already exists", { status: 400 });
    }

    const id = nanoid(10);
    const store = await prisma.store.create({
      data: {
        id,
        name,
        userId,
      },
    });

    return new NextResponse(JSON.stringify(store), { status: 201 });
  } catch (e) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
