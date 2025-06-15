import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { content } = await req.json()

  const section = await prisma.section.update({
    where: { id: params.id },
    data: {
      content,
    },
  })

  return new Response(JSON.stringify(section), { status: 200 })
}
