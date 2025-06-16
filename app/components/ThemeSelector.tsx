"use client"

import { useTransition, useState, useEffect } from "react"
import { themes } from "@/lib/themes"

type ThemeKey = keyof typeof themes

export default function ThemeSelector({ initialThemeId }: { initialThemeId: string }) {
  const [isPending, startTransition] = useTransition()
  const [selectedTheme, setSelectedTheme] = useState(initialThemeId)

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const themeId = e.target.value as ThemeKey
    console.log("🎨 Thème sélectionné :", themeId)

    startTransition(async () => {
      try {
        await fetch("/api/theme", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ themeId }),
        })
        
        // Mettre à jour le thème sélectionné après la réponse du serveur
        setSelectedTheme(themeId)
        
        // Appliquer les nouvelles couleurs
        const theme = themes[themeId]
        const root = document.documentElement
        root.style.setProperty("--color-primary", theme.primary)
        root.style.setProperty("--color-secondary", theme.secondary)
        root.style.setProperty("--color-background", theme.background)
        root.style.setProperty("--color-text", theme.text)
      } catch (error) {
        console.error("Erreur lors du changement de thème :", error)
        // Revenir à l'ancien thème en cas d'erreur
        setSelectedTheme(initialThemeId)
      }
    })
  }

  useEffect(() => {
    const root = document.documentElement;
  
    console.log("🎨 Couleurs appliquées :");
    console.log("--color-primary:", getComputedStyle(root).getPropertyValue("--color-primary"));
    console.log("--color-secondary:", getComputedStyle(root).getPropertyValue("--color-secondary"));
    console.log("--color-background:", getComputedStyle(root).getPropertyValue("--color-background"));
    console.log("--color-text:", getComputedStyle(root).getPropertyValue("--color-text"));
  }, []);

  return (
    <div className="mb-6">
      <label className="block mb-1 font-medium text-sm">Changer le thème</label>
      <select
        onChange={handleChange}
        value={selectedTheme}
        className="border p-2 rounded text-black"
        disabled={isPending}
      >
        {Object.entries(themes).map(([key, theme]) => (
          <option key={key} value={key}>
            {theme.name}
          </option>
        ))}
      </select>
      {isPending && <p className="text-sm text-gray-500 mt-1">Changement en cours...</p>}
    </div>
  )
}
