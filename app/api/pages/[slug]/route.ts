import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Session } from "next-auth";

interface CustomSession extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions) as CustomSession | null;

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const page = await db.page.findFirst({
      where: {
        slug: params.slug,
        userId: session.user.id,
      },
      include: {
        sections: {
          orderBy: {
            order: 'asc'
          }
        }
      }
    });

    if (!page) {
      return new NextResponse("Page not found", { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error("[PAGE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 