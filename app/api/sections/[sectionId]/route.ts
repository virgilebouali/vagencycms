import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: { sectionId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { content, order, position, type } = body;

    const section = await db.section.update({
      where: {
        id: params.sectionId,
      },
      data: {
        content,
        order,
        position,
        type,
      },
    });

    return NextResponse.json(section);
  } catch (error) {
    console.error("[SECTION_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { sectionId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.section.delete({
      where: {
        id: params.sectionId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[SECTION_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 