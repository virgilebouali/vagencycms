// app/api/sections/save-all/route.ts
import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function POST(req: NextRequest) {
  try {
    const sections = await req.json()
    console.log('Sections reçues:', sections)

    if (!Array.isArray(sections)) {
      return new Response(JSON.stringify({ error: 'Les données doivent être un tableau' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    for (const section of sections) {
      if (!section.id || !section.content) {
        return new Response(JSON.stringify({ 
          error: 'Chaque section doit avoir un id et un content',
          section
        }), { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        })
      }

      await prisma.section.update({
        where: { id: section.id },
        data: { 
          content: section.content,
          order: section.order
        },
      })
    }

    revalidatePath("/") // ou revalidatePath("/[slug]") si tu veux large
    return new Response(JSON.stringify({ success: true }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
    return new Response(JSON.stringify({ 
      error: 'Erreur lors de la sauvegarde',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
