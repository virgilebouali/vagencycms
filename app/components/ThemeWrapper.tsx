"use client"

import { useEffect, useState } from "react"

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<any>(null)

  useEffect(() => {
    fetch("/api/theme/get")
      .then((res) => res.json())
      .then((data) => setTheme(data))
  }, [])

  if (!theme) return null

  return (
    <body
      style={{
        ["--color-primary" as any]: theme.primary,
        ["--color-secondary" as any]: theme.secondary,
        ["--color-background" as any]: theme.background,
        ["--color-text" as any]: theme.text,
      }}
      className="antialiased"
    >
      {children}
    </body>
  )
}
