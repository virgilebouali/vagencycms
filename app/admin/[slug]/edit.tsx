"use client"

import { useState } from "react"
import SectionRenderer from "@/app/components/SectionRenderer"
import { SectionListEditor } from "@/app/components/SectionListEditor"
import { Section } from "@prisma/client"
import ThemeSelector from "@/app/components/ThemeSelector"
import { Eye, Edit } from "lucide-react"

export default function PageEditorClient({ initialSections, initialThemeId, slug, pageId }: { initialSections: Section[], initialThemeId: string, slug: string, pageId: string }) {
  const [sections, setSections] = useState(initialSections)
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Zone de rendu */}
      <div className={`${isPreviewMode ? 'w-full' : 'flex-1'} overflow-y-auto p-6 bg-gray-50`}>
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
            title={isPreviewMode ? "Mode édition" : "Mode aperçu"}
          >
            {isPreviewMode ? <Edit className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {sections
          .sort((a, b) => a.order - b.order)
          .map((section) => (
            <SectionRenderer key={section.id} section={section} />
          ))}
      </div>

      {/* Éditeur (fixe à droite) */}
      {!isPreviewMode && (
        <div className="w-[400px] bg-white border-l shadow-lg overflow-y-auto p-4">
          <h2 className="text-xl font-bold mb-4">Éditeur</h2>
          <ThemeSelector initialThemeId={initialThemeId} />
          <SectionListEditor initialSections={initialSections} pageId={pageId} slug={slug} onSectionsChange={setSections} />
        </div>
      )}
    </div>
  )
}
