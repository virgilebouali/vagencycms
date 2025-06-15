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
      alert("Modifications enregistrées !")
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error)
      alert("Erreur lors de la sauvegarde")
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
      <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
        {sections.map((section) => (
          <SortableItem key={section.id} id={section.id}>
            <div className="p-4 border rounded bg-white mb-2 cursor-pointer">
              <SectionEditor section={section} onChange={newContent => handleSectionChange(section.id, newContent)} />
            </div>
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  )
}

function SortableItem({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style}>
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
