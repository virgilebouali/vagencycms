// /pages/api/pages/[slug]/sections.ts
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const page = await prisma.page.findUnique({
    where: { slug: params.slug },
    include: {
      sections: { orderBy: { position: "asc" } }
    }
  })

  return NextResponse.json(page?.sections || [])
}
