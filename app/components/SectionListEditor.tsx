"use client"

import { useState, useEffect, useRef } from "react"
import { Section } from "@prisma/client"
import SectionEditor from "./SectionEditor"
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"

const SECTION_TYPES = [
  { value: "navbar", label: "Navigation" },
  { value: "hero", label: "Hero" },
  { value: "textImage", label: "Texte + Image" },
  { value: "features", label: "Avantages" },
  { value: "testimonials", label: "Témoignages" },
  { value: "faq", label: "FAQ" },
  { value: "pricing", label: "Tarifs" },
  { value: "team", label: "Équipe" },
  { value: "logos", label: "Logos partenaires" },
  { value: "newsletter", label: "Newsletter" },
  { value: "gallery", label: "Galerie" },
  { value: "finalCta", label: "Call to Action final" },
  { value: "footer", label: "Footer" },
  { value: "blog", label: "Blog" },
]

function getDefaultContent(type: string) {
  switch (type) {
    case "navbar": return { title: "", logo: "", links: [], cta: { label: "", href: "" } }
    case "hero": return { title: "", subtitle: "", image: "", overlayOpacity: 0.5, cta: { label: "", href: "", color: "#2563eb" } }
    case "textImage": return { title: "", text: "", image: "", position: "left", cta: { label: "", href: "", color: "#2563eb" } }
    case "features": return { title: "", items: [] }
    case "testimonials": return { title: "", testimonials: [] }
    case "faq": return { title: "", items: [] }
    case "pricing": return { title: "", plans: [] }
    case "team": return { title: "", members: [] }
    case "logos": return { title: "", logos: [] }
    case "newsletter": return { title: "", subtitle: "", placeholder: "", button: "" }
    case "gallery": return { title: "", images: [] }
    case "footer": return { text: "", links: [] }
    case "finalCta": return { title: "", subtitle: "", button: { label: "", href: "" } }
    case "blog": return { title: "", posts: [] }
    default: return {}
  }
}

export function SectionListEditor({
  initialSections,
  slug,
  onReorder,
  onSectionsChange,
}: {
  initialSections: Section[]
  slug: string
  onReorder?: () => void
  onSectionsChange?: (sections: Section[]) => void
}) {  
  
  const [sections, setSections] = useState(initialSections)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [newSectionType, setNewSectionType] = useState("hero")

  // Synchronise le parent à chaque changement
  useEffect(() => {
    if (onSectionsChange) onSectionsChange(sections)
  }, [sections, onSectionsChange])

  // Fonction pour mettre à jour le contenu d'une section
  const handleSectionChange = (id: string, newContent: any) => {
    setSections(sections =>
      sections.map(section =>
        section.id === id ? { ...section, content: newContent } : section
      )
    )
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    if (!event.over) return
  
    const oldIndex = sections.findIndex((s) => s.id === event.active.id)
    const newIndex = sections.findIndex((s) => s.id === event.over!.id)
  
    if (oldIndex === -1 || newIndex === -1) return
  
    const reordered = arrayMove(sections, oldIndex, newIndex)
  
    const updated = reordered.map((item, index) => ({
      ...item,
      order: index,
    }))
  
    setSections(updated)
  
    await fetch("/api/sections/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sections: updated.map(({ id, order }) => ({ id, order })),
        slug,
      }),
    })

    if (onReorder) {
      onReorder()
    }
  }

  // Fonction de sauvegarde manuelle
  const handleSave = async () => {
    try {
      const sectionsToSave = sections.map(section => ({
        id: section.id,
        content: section.content || {},
        order: section.order
      }))
      await fetch("/api/sections/save-all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sectionsToSave),
      })
      if (onReorder) onReorder()
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error)
      setShowError(true)
      setTimeout(() => setShowError(false), 2000)
    }
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <button
        onClick={handleSave}
        className="ml-auto mb-4 bg-green-600 text-white px-4 py-2 rounded shadow"
      >
        ✅ Valider les modifications
      </button>
      {showSuccess && (
        <div className="mb-2 p-2 bg-green-100 text-green-800 rounded text-center transition-all">✔️ Modifications enregistrées</div>
      )}
      {showError && (
        <div className="mb-2 p-2 bg-red-100 text-red-800 rounded text-center transition-all">❌ Erreur lors de la sauvegarde</div>
      )}
      <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
        {sections.map((section) => (
          <SortableItem key={section.id} id={section.id}>
            <div className="p-4 border rounded bg-white mb-2 cursor-pointer">
              <SectionEditor section={section} onChange={newContent => handleSectionChange(section.id, newContent)} />
            </div>
          </SortableItem>
        ))}
      </SortableContext>
      <div className="flex gap-2 mt-8 items-center">
        <select
          value={newSectionType}
          onChange={e => setNewSectionType(e.target.value)}
          className="border p-2 rounded"
        >
          {SECTION_TYPES.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded shadow"
          onClick={() => {
            const newSection = {
              id: Math.random().toString(36).slice(2),
              type: newSectionType,
              content: getDefaultContent(newSectionType),
              order: sections.length,
              pageId: "",
              position: sections.length,
            }
            setSections([...sections, newSection])
            if (onSectionsChange) onSectionsChange([...sections, newSection])
          }}
          type="button"
        >
          + Ajouter une section
        </button>
      </div>
    </DndContext>
  )
}
function SortableItem({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className={`transition-transform duration-200 ${isDragging ? 'scale-50' : 'scale-100'}`}>
      <div className="relative">
        <div
          {...attributes}
          {...listeners}
          className="absolute top-2 right-2 cursor-grab p-1 rounded hover:bg-gray-200"
        >
          <span className="text-gray-500">☰</span>
        </div>
        {children}
      </div>
    </div>
  )
}

