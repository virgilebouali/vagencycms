// app/api/sections/save-all/route.ts
import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const sections = await req.json()

    // Vérifier que toutes les sections ont un pageId
    const sectionsWithoutPageId = sections.filter((section: any) => !section.pageId)
    if (sectionsWithoutPageId.length > 0) {
      return new NextResponse("Some sections are missing pageId", { status: 400 })
    }

    // Upsert toutes les sections
    const upsertPromises = sections.map((section: any) =>
      db.section.upsert({
        where: { id: section.id },
        update: {
          content: section.content,
          order: section.order,
          position: section.position,
          type: section.type,
          pageId: section.pageId,
        },
        create: {
          id: section.id,
          content: section.content,
          order: section.order,
          position: section.position,
          type: section.type,
          pageId: section.pageId,
        },
      })
    )

    const updatedSections = await Promise.all(upsertPromises)

    return NextResponse.json(updatedSections)
  } catch (error) {
    console.error("[SECTIONS_SAVE_ALL]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
