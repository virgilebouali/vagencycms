import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export async function POST(req: Request) {
  const form = await req.formData()
  const title = form.get("title") as string
  const slug = form.get("slug") as string

  await prisma.page.create({
    data: {
      title,
      slug,
    },
  })

  return redirect(`/admin/${slug}`)
}
