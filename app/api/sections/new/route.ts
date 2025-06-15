import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  const { pageId, type } = body

  // On compte combien de sections pour gérer l’ordre
  const count = await prisma.section.count({ where: { pageId } })

  const section = await prisma.section.create({
    data: {
      pageId,
      type,
      order: count,
      content: {}, // vide au départ
    },
  })

  return NextResponse.json(section)
}
