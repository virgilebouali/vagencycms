// app/admin/settings/page.tsx
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { themes } from "@/lib/themes"

export default async function AdminSettingsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  const settings = await prisma.settings.findFirst()

  return (
    <main className="p-8 max-w-xl space-y-8">
      <h1 className="text-3xl font-bold">Paramètres du site</h1>

      <form action="/admin/settings/update" method="POST" className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nom du site</label>
          <input
            type="text"
            name="siteName"
            defaultValue={settings?.siteName || ""}
            className="w-full border px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Thème</label>
          <select name="themeId" defaultValue={settings?.themeId || "classic"} className="w-full border px-3 py-2">
            {Object.entries(themes).map(([key, t]) => (
              <option key={key} value={key}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Enregistrer les modifications
        </button>
      </form>
    </main>
  )
}
