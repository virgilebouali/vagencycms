import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const formData = await req.formData()
  const type = formData.get("type") as string

  const page = await prisma.page.findUnique({ where: { slug: params.slug } })
  if (!page) return redirect("/admin")

  const count = await prisma.section.count({ where: { pageId: page.id } })

  await prisma.section.create({
    data: {
      type,
      pageId: page.id,
      order: count,
      content: {},
    },
  })

  return redirect(`/admin/${params.slug}`)
}
