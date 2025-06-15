'use client'

import { useEffect, useState } from "react"
import { Section } from "@prisma/client"
import { SectionListEditor } from "./SectionListEditor"

export default function SectionListEditorWrapper({ slug, initialSections }: {
  slug: string
  initialSections: Section[]
}) {
    const [sections, setSections] = useState(initialSections)

    useEffect(() => {
      setSections(initialSections)
    }, [initialSections])
    
  const fetchSections = async () => {
    const res = await fetch(`/api/pages/${slug}/sections`, { cache: "no-store" })
    const data = await res.json()
    setSections(data)
  }

  useEffect(() => {
    // Recharge les sections après 500ms pour laisser le backend traiter l'ordre
    const interval = setInterval(() => {
      fetchSections()
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <SectionListEditor
      initialSections={sections}
      onReorder={fetchSections}
    />
  )
}
