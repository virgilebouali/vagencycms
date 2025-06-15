import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getAllPages } from "@/lib/queries"
import Link from "next/link"

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  const pages = await getAllPages()

  return (
    <main className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Admin</h1>
      <p>Connecté en tant que <strong>{session.user?.email}</strong></p>

      <div>
        <h2 className="text-xl font-semibold mb-2">Pages existantes :</h2>
        <ul className="list-disc pl-6">
          {pages.map((page) => (
            <li key={page.id}>
              <Link href={`/admin/${page.slug}`} className="text-blue-500 underline">
                {page.title} ({page.slug})
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <form action="/admin/create" method="POST" className="space-x-2 mt-4">
  <input
    type="text"
    name="title"
    placeholder="Nom de la page (ex: Accueil)"
    className="border px-2 py-1"
    required
  />
  <input
    type="text"
    name="slug"
    placeholder="Slug (ex: home)"
    className="border px-2 py-1"
    required
  />
  <button
    type="submit"
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    + Créer la page
  </button>
</form>
    </main>
  )
}
