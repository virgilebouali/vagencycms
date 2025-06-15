// lib/queries.ts
import { prisma } from "./prisma"

export async function getAllPages() {
  return await prisma.page.findMany({
    orderBy: { createdAt: "desc" },
  })
}
export async function getPageBySlug(slug: string) {
    return await prisma.page.findUnique({
      where: { slug },
      include: { 
        sections: {
          orderBy: { position: 'asc' }
        }
      }
    })
  }
  