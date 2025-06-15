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
        <h1 className="text-xl font-bold">{section.content.title}</h1>
      </div>

      <nav className="hidden md:flex space-x-6">
        {(section.content.links || []).map((link: any, idx: number) => (
          <a key={idx} href={link.href} className="hover:underline">
            {link.label}
          </a>
        ))}
      </nav>

      {section.content.cta?.label && (
        <a
          href={section.content.cta.href}
          className="hidden md:inline-block bg-[var(--color-primary)] text-white px-4 py-2 rounded"
        >
          {section.content.cta.label}
        </a>
      )}
    </header>
  )
      case "hero":
        return (
          <section className="p-16 bg-[var(--color-primary)] text-[var(--color-text)]">
            <h1 className="text-4xl font-bold">{section.content.title}</h1>
            <p className="text-xl mt-2">{section.content.subtitle}</p>
          </section>
        )
      case "textImage":
        return (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-[var(--color-secondary)] text-[var(--color-text)]">
            <div>
              <h2 className="text-2xl font-semibold">{section.content.title}</h2>
              <p className="mt-2">{section.content.text}</p>
            </div>
            <img src={section.content.image} alt="" className="w-full h-auto rounded object-cover" />
          </section>
        )
      case "features":
        return (
          <section className="p-8 bg-[var(--color-secondary)] text-[var(--color-text)]">
            <h2 className="text-2xl font-semibold">{section.content.title}</h2>
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
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="mt-1">{item.description}</p>
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
  
  