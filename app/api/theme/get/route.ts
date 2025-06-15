import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { themes } from "@/lib/themes"

export async function GET() {
  const settings = await prisma.settings.findFirst()
  const theme = settings?.themeId ? themes[settings.themeId] : themes["classic"]
  return NextResponse.json(theme)
}
