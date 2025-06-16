import React from "react"
import {
  Activity, AlertCircle, ArrowRight, Check, ChevronRight,
  Clock, Code, Copy, Download, Edit, Eye, File, Filter,
  Github, Globe, Heart, Home, Image, Info, Link, Mail,
  MessageSquare, Moon, Phone, Plus, Search, Settings,
  Share, Star, Sun, Trash, User, X
} from "lucide-react";

const ICONS = {
  Activity,
  AlertCircle,
  ArrowRight,
  Check,
  ChevronRight,
  Clock,
  Code,
  Copy,
  Download,
  Edit,
  Eye,
  File,
  Filter,
  Github,
  Globe,
  Heart,
  Home,
  Image,
  Info,
  Link,
  Mail,
  MessageSquare,
  Moon,
  Phone,
  Plus,
  Search,
  Settings,
  Share,
  Star,
  Sun,
  Trash,
  User,
  X
} as const;

// Palette de couleurs à proposer
const COLORS = [
  { name: "Noir", value: "black" },
  { name: "Bleu", value: "#2563eb" },
  { name: "Rouge", value: "#dc2626" },
  { name: "Vert", value: "#16a34a" },
  { name: "Orange", value: "#f59e42" },
  { name: "Violet", value: "#7c3aed" },
  { name: "Gris", value: "#6b7280" },
];

type Section = {
    id: string
    type: string
    content: any
  }
  
  export default function SectionRenderer({ section }: { section: Section }) {
    switch (section.type) {
      case "navbar":
        return (
          <header className="flex items-center justify-between px-6 py-4 bg-[var(--color-background)] text-[var(--color-text)]">
            <div className="flex items-center space-x-4">
              {section.content.logo && (
                <img src={section.content.logo} alt="Logo" className="h-8 w-auto" />
              )}
              <h1 className={`text-${section.content.titleSize || "xl"} font-bold`}>{section.content.title}</h1>
            </div>

            <nav className="hidden md:flex space-x-6">
              {(section.content.links || []).map((link: any, idx: number) => (
                <a 
                  key={idx} 
                  href={link.href} 
                  className={`text-${section.content.linksSize || "base"} hover:underline`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {section.content.cta?.label && (
              <a
                href={section.content.cta.href}
                className={`hidden md:inline-block bg-[var(--color-primary)] text-white px-4 py-2 rounded text-${section.content.cta?.size || "base"}`}
              >
                {section.content.cta.label}
              </a>
            )}
          </header>
        )
      case "hero":
        const overlayOpacity = section.content.overlayOpacity !== undefined ? parseFloat(section.content.overlayOpacity) : 0.5;
        const ctaLabel = section.content.cta?.label && section.content.cta.label.trim() !== '' ? section.content.cta.label : 'Bouton';
        const ctaHref = section.content.cta?.href && section.content.cta.href.trim() !== '' ? section.content.cta.href : '#';
        const ctaColor = section.content.cta?.color || '#2563eb';
        return (
          <section
            className="relative w-full flex items-center justify-center"
            style={{
              minHeight: '400px',
              backgroundImage: section.content.image ? `url('${section.content.image}')` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* Overlay sombre */}
            <div className="absolute inset-0 z-0" style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }} />
            {/* Contenu */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center w-full px-4 py-16">
              <h1 className={`text-${section.content.titleSize || "4xl"} font-bold text-white drop-shadow-lg`}>{section.content.title}</h1>
              <p className={`text-${section.content.subtitleSize || "xl"} mt-4 text-white drop-shadow`}>{section.content.subtitle}</p>
              <a
                href={ctaHref}
                className="mt-8 inline-block text-white px-6 py-3 rounded shadow-lg text-lg font-semibold hover:bg-opacity-90 transition"
                style={{ backgroundColor: ctaColor }}
              >
                {ctaLabel}
              </a>
            </div>
          </section>
        )
      case "textImage":
        const isImageRight = section.content.position === "right"
        const imageClass = `${section.content.imageSize || "w-full"} ${section.content.imageRounded || "rounded"} object-cover`
        const ctaLabelTI = section.content.cta?.label && section.content.cta.label.trim() !== '' ? section.content.cta.label : 'Bouton';
        const ctaHrefTI = section.content.cta?.href && section.content.cta.href.trim() !== '' ? section.content.cta.href : '#';
        const ctaColorTI = section.content.cta?.color || '#2563eb';
        return (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-[var(--color-secondary)] text-[var(--color-text)] items-center">
            {!isImageRight && (
              <img src={section.content.image} alt="" className={imageClass} />
            )}
            <div className="flex flex-col items-center text-center">
              <h2 className={`text-${section.content.titleSize || "2xl"} font-semibold`}>{section.content.title}</h2>
              <p className={`text-${section.content.textSize || "base"} mt-2`}>{section.content.text}</p>
              <a
                href={ctaHrefTI}
                className="mt-8 inline-block text-white px-6 py-3 rounded shadow-lg text-lg font-semibold hover:bg-opacity-90 transition"
                style={{ backgroundColor: ctaColorTI }}
              >
                {ctaLabelTI}
              </a>
            </div>
            {isImageRight && (
              <img src={section.content.image} alt="" className={imageClass} />
            )}
          </section>
        )
      case "features":
        return (
          <section className="p-8 bg-[var(--color-secondary)] text-[var(--color-text)]">
            <h2 className={`text-${section.content.titleSize || "2xl"} font-semibold`}>{section.content.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {section.content.items.map((item: any, index: number) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {ICONS[item.icon as keyof typeof ICONS] ? (
                        React.createElement(ICONS[item.icon as keyof typeof ICONS], {
                          className: "w-8 h-8",
                          color: item.color || "black"
                        })
                      ) : null}
                    </div>
                    <div>
                      <h3 className={`text-${section.content.featuresTitleSize || "lg"} font-semibold`}>{item.title}</h3>
                      <p className={`text-${section.content.featuresTextSize || "base"} mt-1`}>{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )
      default:
        return null
    }
  }
  
  