"use client"
import { useEffect, useState } from "react"
import SectionRenderer from "@/app/components/SectionRenderer"

export default function Page({ params }: { params: { slug: string } }) {
  const [sections, setSections] = useState<any[]>([])

  useEffect(() => {
    const fetchSections = async () => {
      const res = await fetch(`/api/pages/${params.slug}/sections`)
      const data = await res.json()
      setSections(data)
    }
    fetchSections()
  }, [params.slug])

  return (
    <main>
      {sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </main>
  )
}
