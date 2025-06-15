import { getPageBySlug } from "@/lib/queries"
import PageEditorClient from "./edit"

export default async function AdminEditPage({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug)
  if (!page) return <p>Page introuvable</p>

  return <PageEditorClient initialSections={page.sections} />
}
