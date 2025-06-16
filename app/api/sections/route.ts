import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { type, pageId, order } = body;

    if (!type || !pageId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const section = await db.section.create({
      data: {
        type,
        pageId,
        order,
        content: type === 'text' ? '' : { url: '' },
        userId: session.user.id,
      },
    });

    return NextResponse.json(section);
  } catch (error) {
    console.error("[SECTIONS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const pageId = searchParams.get("pageId");

    if (!pageId) {
      return new NextResponse("Page ID is required", { status: 400 });
    }

    const sections = await db.section.findMany({
      where: {
        pageId,
        userId: session.user.id,
      },
      orderBy: {
        order: 'asc',
      },
    });

    return NextResponse.json(sections);
  } catch (error) {
    console.error("[SECTIONS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 