// app/admin/settings/update/route.ts
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { themes } from "@/lib/themes"

export async function POST(req: Request) {
  const form = await req.formData()
  const siteName = form.get("siteName") as string
  const themeId = form.get("themeId") as string

  await prisma.settings.upsert({
    where: { id: "global" },
    update: {
      siteName,
      themeId,
      theme: themes[themeId] || themes["classic"], // 🔧 fix ici
    },
    create: {
      id: "global",
      siteName,
      themeId,
      theme: themes[themeId] || themes["classic"], // 🔧 aussi ici
    },
  })

  redirect("/admin/settings")
}
