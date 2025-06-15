import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/Prodiver";
import { prisma } from "@/lib/prisma"
import { themes } from "@/lib/themes"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vagency CMS",
  description: "CMS headless et personnalisable",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await prisma.settings.findFirst()
  const theme = settings?.themeId && themes[settings.themeId] ? themes[settings.themeId] : themes.classic

  return (
    <html
      lang="fr"
      style={{
        "--color-primary": theme.primary,
        "--color-secondary": theme.secondary,
        "--color-background": theme.background,
        "--color-text": theme.text,
      }}
    >
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--color-background)] text-[var(--color-text)]`}>
        {children}
      </body>
    </html>
  )
}