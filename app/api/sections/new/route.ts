import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  const { pageId, type } = body

  console.log("body reçu :", body)

  // On compte combien de sections pour gérer l'ordre
  const count = await prisma.section.count({ where: { pageId } })
  console.log("count", count)
  console.log("Création section avec pageId :", pageId, "type :", type)
  const section = await prisma.section.create({
    data: {
      pageId,
      type,
      order: count,
      position: count,
      content: {}, // vide au départ
    },
  })

  return NextResponse.json(section)
}
