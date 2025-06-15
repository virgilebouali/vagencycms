import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { sections, slug } = body

  for (const { id, position } of sections) {
    await prisma.section.update({
      where: { id },
      data: { position },
    })
  }

  // Revalidation de la page concernée
  revalidatePath(`/${slug}`)
  revalidatePath(`/admin/${slug}`)

  return new Response(JSON.stringify({ success: true }), { status: 200 })
}
