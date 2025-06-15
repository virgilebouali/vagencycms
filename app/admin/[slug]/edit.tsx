"use client"

import { useState } from "react"
import SectionRenderer from "@/app/components/SectionRenderer"
import { SectionListEditor } from "@/app/components/SectionListEditor"
import { Section } from "@prisma/client"
import ThemeSelector from "@/app/components/ThemeSelector"

export default function PageEditorClient({ initialSections, initialThemeId, slug }: { initialSections: Section[], initialThemeId: string, slug: string }) {
  const [sections, setSections] = useState(initialSections)

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Zone de rendu (75%) */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {sections
          .sort((a, b) => a.order - b.order)
          .map((section) => (
            <SectionRenderer key={section.id} section={section} />
          ))}
      </div>

      {/* Éditeur (fixe à droite) */}
      <div className="w-[400px] bg-white border-l shadow-lg overflow-y-auto p-4">
        <h2 className="text-xl font-bold mb-4">Éditeur</h2>
        <ThemeSelector initialThemeId={initialThemeId} />
        <SectionListEditor initialSections={initialSections} slug={slug} onSectionsChange={setSections} />
      </div>
    </div>
  )
}
