"use client"

import { useState, useEffect, useCallback } from "react"
import * as LucideIcons from "lucide-react"

const ICONS = {
  Activity: LucideIcons.Activity,
  AlertCircle: LucideIcons.AlertCircle,
  ArrowRight: LucideIcons.ArrowRight,
  Check: LucideIcons.Check,
  ChevronRight: LucideIcons.ChevronRight,
  Clock: LucideIcons.Clock,
  Code: LucideIcons.Code,
  Copy: LucideIcons.Copy,
  Download: LucideIcons.Download,
  Edit: LucideIcons.Edit,
  Eye: LucideIcons.Eye,
  File: LucideIcons.File,
  Filter: LucideIcons.Filter,
  Github: LucideIcons.Github,
  Globe: LucideIcons.Globe,
  Heart: LucideIcons.Heart,
  Home: LucideIcons.Home,
  Image: LucideIcons.Image,
  Info: LucideIcons.Info,
  Link: LucideIcons.Link,
  Mail: LucideIcons.Mail,
  MessageSquare: LucideIcons.MessageSquare,
  Moon: LucideIcons.Moon,
  Phone: LucideIcons.Phone,
  Plus: LucideIcons.Plus,
  Search: LucideIcons.Search,
  Settings: LucideIcons.Settings,
  Share: LucideIcons.Share,
  Star: LucideIcons.Star,
  Sun: LucideIcons.Sun,
  Trash: LucideIcons.Trash,
  User: LucideIcons.User,
  X: LucideIcons.X,
} as const

const COLORS = [
  { name: "Noir", value: "black" },
  { name: "Bleu", value: "#2563eb" },
  { name: "Rouge", value: "#dc2626" },
  { name: "Vert", value: "#16a34a" },
  { name: "Orange", value: "#f59e42" },
  { name: "Violet", value: "#7c3aed" },
  { name: "Gris", value: "#6b7280" },
]

const FONT_SIZES = [
  { name: "Petit", value: "sm" },
  { name: "Normal", value: "base" },
  { name: "Grand", value: "lg" },
  { name: "Très grand", value: "xl" },
  { name: "Énorme", value: "2xl" },
  { name: "Titre", value: "3xl" },
  { name: "Grand titre", value: "4xl" },
]

const IMAGE_SIZES = [
  { name: "Petite", value: "w-32" },
  { name: "Moyenne", value: "w-64" },
  { name: "Grande", value: "w-96" },
  { name: "Full", value: "w-full" },
]

const IMAGE_ROUNDED = [
  { name: "Aucun", value: "rounded-none" },
  { name: "Arrondi", value: "rounded" },
  { name: "Arrondi +", value: "rounded-lg" },
  { name: "Cercle", value: "rounded-full" },
]

type Section = {
  id: string
  type: string
  content: any
}

type Props = {
  section: Section
}

export default function SectionEditor({ section, onChange }: Props & { onChange?: (content: any) => void }) {
  const [openIconPickerIndex, setOpenIconPickerIndex] = useState<number | null>(null)

  // Fonction de sauvegarde avec debounce
  const saveChanges = useCallback(async (data: any) => {
    try {
      console.log('Sauvegarde des modifications:', data)
      const response = await fetch(`/api/sections/${section.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: data }),
      })
      
      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde')
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error)
    }
  }, [section.id])

  // Effet pour la sauvegarde automatique
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveChanges(section.content)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [section.content, saveChanges])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    let newContent

    if (name.includes(".")) {
      const parts = name.split(".")
      if (parts.length === 3 && !isNaN(parseInt(parts[1]))) {
        const [arrayName, index, field] = parts
        const array = [...(section.content[arrayName] || [])]
        array[parseInt(index)] = { ...array[parseInt(index)], [field]: value }
        newContent = {
          ...section.content,
          [arrayName]: array,
        }
      } else {
        const [parent, child] = parts
        if (parent === 'cta') {
          newContent = {
            ...section.content,
            cta: { ...(section.content.cta || {}), [child]: value },
          }
        } else {
          newContent = {
            ...section.content,
            [parent]: { ...(section.content[parent] || {}), [child]: value },
          }
        }
      }
    } else {
      newContent = {
        ...section.content,
        [name]: value
      }
    }

    console.log('Nouveau contenu:', newContent) // Pour le débogage
    if (onChange) onChange(newContent)
  }

  const handleSubmit = async () => {
    await fetch(`/api/sections/${section.id}`, {
      method: "PUT",
      body: JSON.stringify({ content: section.content }),
    })
  }

  return (
    <div className="space-y-2">
      <p className="font-semibold">Type : {section.type}</p>

      {section.type === "hero" && (
        <>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                name="title"
                placeholder="Titre"
                value={section.content.title || ""}
                onChange={handleChange}
                className="border p-2 flex-1"
              />
              <select
                name="titleSize"
                value={section.content.titleSize || "4xl"}
                onChange={handleChange}
                className="border p-2"
              >
                {FONT_SIZES.map(size => (
                  <option key={size.value} value={size.value}>{size.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                name="subtitle"
                placeholder="Sous-titre"
                value={section.content.subtitle || ""}
                onChange={handleChange}
                className="border p-2 flex-1"
              />
              <select
                name="subtitleSize"
                value={section.content.subtitleSize || "xl"}
                onChange={handleChange}
                className="border p-2"
              >
                {FONT_SIZES.map(size => (
                  <option key={size.value} value={size.value}>{size.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <input
              name="image"
              placeholder="URL image"
              value={section.content.image || ""}
              onChange={handleChange}
              className="border p-2 flex-1"
            />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <label className="text-sm">Opacité de l'overlay :</label>
            <input
              type="range"
              name="overlayOpacity"
              min={0}
              max={1}
              step={0.05}
              value={section.content.overlayOpacity ?? 0.5}
              onChange={handleChange}
              className="w-32"
            />
            <span className="text-xs">{Math.round(100 * (section.content.overlayOpacity ?? 0.5))}%</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <input
              name="cta.label"
              placeholder="Bouton"
              value={section.content.cta?.label || ""}
              onChange={handleChange}
              className="border p-2 flex-1"
            />
            <input
              name="cta.href"
              placeholder="Lien du bouton"
              value={section.content.cta?.href || ""}
              onChange={handleChange}
              className="border p-2 flex-1"
            />
            <div className="flex items-center gap-1">
              {COLORS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => {
                    if (onChange) {
                      onChange({
                        ...section.content,
                        cta: { ...(section.content.cta || {}), color: color.value },
                      })
                    }
                  }}
                  className={`w-6 h-6 rounded-full border cursor-pointer ${section.content.cta?.color === color.value ? 'ring-2 ring-black' : ''}`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {section.type === "textImage" && (
        <>
          <div className="flex items-center gap-2">
            <input
              name="title"
              placeholder="Titre"
              value={section.content.title || ""}
              onChange={handleChange}
              className="border p-2 flex-1"
            />
            <select
              name="titleSize"
              value={section.content.titleSize || "2xl"}
              onChange={handleChange}
              className="border p-2"
            >
              {FONT_SIZES.map(size => (
                <option key={size.value} value={size.value}>{size.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input
              name="text"
              placeholder="Texte"
              value={section.content.text || ""}
              onChange={handleChange}
              className="border p-2 flex-1"
            />
            <select
              name="textSize"
              value={section.content.textSize || "base"}
              onChange={handleChange}
              className="border p-2"
            >
              {FONT_SIZES.map(size => (
                <option key={size.value} value={size.value}>{size.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <input
              name="image"
              placeholder="URL image"
              value={section.content.image || ""}
              onChange={handleChange}
              className="border p-2 flex-1"
            />
            <select
              name="imageSize"
              value={section.content.imageSize || "w-full"}
              onChange={handleChange}
              className="border p-2"
            >
              {IMAGE_SIZES.map(size => (
                <option key={size.value} value={size.value}>{size.name}</option>
              ))}
            </select>
            <select
              name="imageRounded"
              value={section.content.imageRounded || "rounded"}
              onChange={handleChange}
              className="border p-2"
            >
              {IMAGE_ROUNDED.map(r => (
                <option key={r.value} value={r.value}>{r.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <input
              name="cta.label"
              placeholder="Bouton"
              value={section.content.cta?.label || ""}
              onChange={handleChange}
              className="border p-2 flex-1"
            />
            <input
              name="cta.href"
              placeholder="Lien du bouton"
              value={section.content.cta?.href || ""}
              onChange={handleChange}
              className="border p-2 flex-1"
            />
            <div className="flex items-center gap-1">
              {COLORS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => {
                    if (onChange) {
                      onChange({
                        ...section.content,
                        cta: { ...(section.content.cta || {}), color: color.value },
                      })
                    }
                  }}
                  className={`w-6 h-6 rounded-full border cursor-pointer ${section.content.cta?.color === color.value ? 'ring-2 ring-black' : ''}`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm">Position de l'image :</label>
            <select
              name="position"
              value={section.content.position || "left"}
              onChange={handleChange}
              className="border p-2"
            >
              <option value="left">Gauche</option>
              <option value="right">Droite</option>
            </select>
          </div>
        </>
      )}

      {section.type === "navbar" && (
        <>
          <input
            name="logo"
            placeholder="URL du logo"
            value={section.content.logo || ""}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <div className="flex items-center gap-2">
            <input
              name="title"
              placeholder="Titre"
              value={section.content.title || ""}
              onChange={handleChange}
              className="border p-2 flex-1"
            />
            <select
              name="titleSize"
              value={section.content.titleSize || "xl"}
              onChange={handleChange}
              className="border p-2"
            >
              {FONT_SIZES.map(size => (
                <option key={size.value} value={size.value}>{size.name}</option>
              ))}
            </select>
          </div>
          <p className="mt-2 font-semibold">Liens</p>
          <div className="flex items-center gap-2 mb-2">
            <label className="text-sm">Taille des liens :</label>
            <select
              name="linksSize"
              value={section.content.linksSize || "base"}
              onChange={handleChange}
              className="border p-1 w-24"
            >
              {FONT_SIZES.map(size => (
                <option key={size.value} value={size.value}>{size.name}</option>
              ))}
            </select>
          </div>
          {(section.content.links || []).map((link: any, index: number) => (
            <div key={index} className="flex gap-2 mb-2 flex-nowrap items-center">
              <input
                name={`links.${index}.label`}
                value={link.label || ""}
                placeholder="Label"
                onChange={handleChange}
                className="border p-1 flex-1 min-w-0"
              />
              <input
                name={`links.${index}.href`}
                value={link.href || ""}
                placeholder="Lien"
                onChange={handleChange}
                className="border p-1 flex-1 min-w-0"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              if (onChange) {
                onChange({
                  ...section.content,
                  links: [...(section.content.links || []), { label: "", href: "" }],
                })
              }
            }}
            className="bg-gray-200 px-3 py-1 rounded"
          >
            + Ajouter un lien
          </button>

          <p className="mt-2 font-semibold">CTA</p>
          <div className="flex items-center gap-2">
            <input
              name="cta.label"
              placeholder="Texte du bouton"
              value={section.content.cta?.label || ""}
              onChange={handleChange}
              className="border p-2 flex-1"
            />
            <select
              name="cta.size"
              value={section.content.cta?.size || "base"}
              onChange={handleChange}
              className="border p-2"
            >
              {FONT_SIZES.map(size => (
                <option key={size.value} value={size.value}>{size.name}</option>
              ))}
            </select>
          </div>
          <input
            name="cta.href"
            placeholder="Lien du bouton"
            value={section.content.cta?.href || ""}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </>
      )}

      {section.type === "features" && (
        <>
          <div className="flex items-center gap-2 mb-2">
            <input
              name="title"
              placeholder="Titre"
              value={section.content.title || ""}
              onChange={handleChange}
              className="border p-2 flex-1"
            />
            <select
              name="titleSize"
              value={section.content.titleSize || "2xl"}
              onChange={handleChange}
              className="border p-2"
            >
              {FONT_SIZES.map(size => (
                <option key={size.value} value={size.value}>{size.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <label className="text-sm">Taille des titres :</label>
            <select
              name="featuresTitleSize"
              value={section.content.featuresTitleSize || "lg"}
              onChange={handleChange}
              className="border p-1 w-24"
            >
              {FONT_SIZES.map(size => (
                <option key={size.value} value={size.value}>{size.name}</option>
              ))}
            </select>
            <label className="text-sm">Taille des textes :</label>
            <select
              name="featuresTextSize"
              value={section.content.featuresTextSize || "base"}
              onChange={handleChange}
              className="border p-1 w-24"
            >
              {FONT_SIZES.map(size => (
                <option key={size.value} value={size.value}>{size.name}</option>
              ))}
            </select>
          </div>
          <p className="mt-2 font-semibold">Avantages</p>
          {(section.content.items || []).map((item: any, index: number) => (
            <div key={index} className="border p-2 mb-2 rounded bg-gray-50">
              {/* Sélecteur d'icône */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setOpenIconPickerIndex(openIconPickerIndex === index ? null : index)
                  }
                  className="border p-1 w-full mb-1 flex items-center gap-2"
                >
                  {item.icon ? (
                    <>
                      {(() => {
                        const Icon = ICONS[item.icon as keyof typeof ICONS]
                        return Icon ? <Icon className="w-4 h-4" /> : null
                      })()}
                      <span>{item.icon}</span>
                    </>
                  ) : (
                    "Sélectionner une icône"
                  )}
                </button>
                {openIconPickerIndex === index && (
                  <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
                    <div className="grid grid-cols-4 gap-1 p-2">
                      {Object.entries(ICONS).map(([iconName, Icon]) => (
                        <button
                          key={iconName}
                          onClick={() => {
                            const updated = [...section.content.items]
                            updated[index].icon = iconName
                            if (onChange) {
                              onChange({ ...section.content, items: updated })
                            }
                            setOpenIconPickerIndex(null)
                          }}
                          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-xs">{iconName}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sélecteur de couleur */}
              <div className="flex gap-2 my-2">
                <p className="text-sm">Couleur :</p>
                {COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => {
                      const updated = [...section.content.items]
                      updated[index].color = color.value
                      if (onChange) {
                        onChange({ ...section.content, items: updated })
                      }
                    }}
                    className="w-6 h-6 rounded-full border cursor-pointer"
                    style={{ backgroundColor: color.value }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <input
                  name={`items.${index}.title`}
                  placeholder="Titre"
                  value={item.title || ""}
                  onChange={handleChange}
                  className="border p-1 flex-1"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  name={`items.${index}.text`}
                  placeholder="Texte"
                  value={item.text || ""}
                  onChange={handleChange}
                  className="border p-1 flex-1"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              if (onChange) {
                onChange({
                  ...section.content,
                  items: [...(section.content.items || []), { 
                    icon: "", 
                    title: "", 
                    text: "", 
                    color: COLORS[0].value
                  }],
                })
              }
            }}
            className="bg-gray-200 px-3 py-1 rounded"
          >
            + Ajouter un avantage
          </button>
        </>
      )}
    </div>
  )
}
