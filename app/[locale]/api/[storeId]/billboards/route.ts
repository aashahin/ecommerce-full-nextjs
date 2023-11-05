import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { nanoid } from "nanoid";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("StoreID is required", { status: 400 });
    }

    const { userId } = auth();

    const existingStore = await prisma.store.findUnique({
      where: { id: params.storeId, userId: String(userId) },
    });

    if (!existingStore) {
      return new NextResponse("Store not found", { status: 404 });
    }

    const { label, image } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }
    if (!image) {
      return new NextResponse("Image is required", { status: 400 });
    }

    const id = nanoid(10);
    const billboard = await prisma.billboard.create({
      data: {
        id,
        label,
        image,
        storeId: params.storeId,
      },
    });

    return new NextResponse(JSON.stringify(billboard), { status: 201 });
  } catch (e) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
