'use client'

import { useEffect, useState } from "react"
import { Section } from "@prisma/client"
import { SectionListEditor } from "./SectionListEditor"

export default function SectionListEditorWrapper({ slug, initialSections }: {
  slug: string
  initialSections: Section[]
}) {
    const [sections, setSections] = useState(initialSections)
    const [pageId, setPageId] = useState<string | null>(null)

    useEffect(() => {
      fetch(`/api/pages/${slug}`)
        .then(res => res.json())
        .then(page => setPageId(page?.id))
    }, [slug])

    const fetchSections = async () => {
      const res = await fetch(`/api/pages/${slug}/sections`, { cache: "no-store" })
      const data = await res.json()
      setSections(data)
    }

    useEffect(() => {
      const interval = setInterval(() => {
        fetchSections()
      }, 1000)
      return () => clearInterval(interval)
    }, [])

    return (
      pageId && (
        <SectionListEditor
          initialSections={sections}
          pageId={pageId}
          onReorder={fetchSections}
        />
      )
    )
}
