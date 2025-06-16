import React from "react"
import {
  Activity, AlertCircle, ArrowRight, Check, ChevronRight,
  Clock, Code, Copy, Download, Edit, Eye, File, Filter,
  Github, Globe, Heart, Home, Image, Info, Link, Mail,
  MessageSquare, Moon, Phone, Plus, Search, Settings,
  Share, Star, Sun, Trash, User, X
} from "lucide-react";
import HeroSection from './sections/HeroSection'
import FooterSection from './sections/FooterSection'
import TextImageSection from './sections/TextImageSection'
import FeaturesSection from './sections/FeaturesSection'
import NavbarSection from './sections/NavbarSection'
import CtaSection from './sections/CtaSection'
import GallerySection from './sections/GallerySection'
import LogosSection from './sections/LogosSection'
import FaqSection from './sections/FaqSection'
import PricingSection from './sections/PricingSection'
import TeamSection from './sections/TeamSection'
import TestimonialsSection from './sections/TestimonialsSection'

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
  id: string;
  type: string;
  content: any;
  order: number;
  pageId: string;
  position: number;
};

export default function SectionRenderer({ section }: { section: Section }) {
  switch (section.type) {

    case "hero":
      return <HeroSection section={section} />
    case "textImage":
      return <TextImageSection section={section} />
    case "features":
      return <FeaturesSection section={section} />
    case "footer":
      return <FooterSection section={section} />
    case "cta":
      return <CtaSection section={section} />
    case "faq":
      return <FaqSection section={section} />
    case "pricing":
      return <PricingSection section={section} />
    case "team":
      return <TeamSection section={section} />
    case "logos":
      return <LogosSection section={section} />
    case "navbar":
      return <NavbarSection section={section} />
    case "gallery":
      return <GallerySection section={section} />
    case "testimonials":
      return <TestimonialsSection section={section} />
    


    default:
      return null
  }
}
  
  