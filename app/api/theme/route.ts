import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { themes } from "@/lib/themes"

export async function POST(req: Request) {
  try {
    const { themeId } = await req.json()

    if (!themes[themeId]) {
      return NextResponse.json({ error: "Thème invalide" }, { status: 400 })
    }

    await prisma.settings.upsert({
      where: { id: "global" },
      update: {
        theme: themes[themeId],      // ✅ JSON appliqué
        themeId: themeId,            // ✅ Clé enregistrée
      },
      create: {
        id: "global",
        siteName: "My Site",
        theme: themes[themeId],
        themeId: themeId,
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Erreur API thème :", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
