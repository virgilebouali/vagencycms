import React from "react";

const ICONS = {
  Activity: require("lucide-react").Activity,
  AlertCircle: require("lucide-react").AlertCircle,
  ArrowRight: require("lucide-react").ArrowRight,
  Check: require("lucide-react").Check,
  ChevronRight: require("lucide-react").ChevronRight,
  Clock: require("lucide-react").Clock,
  Code: require("lucide-react").Code,
  Copy: require("lucide-react").Copy,
  Download: require("lucide-react").Download,
  Edit: require("lucide-react").Edit,
  Eye: require("lucide-react").Eye,
  File: require("lucide-react").File,
  Filter: require("lucide-react").Filter,
  Github: require("lucide-react").Github,
  Globe: require("lucide-react").Globe,
  Heart: require("lucide-react").Heart,
  Home: require("lucide-react").Home,
  Image: require("lucide-react").Image,
  Info: require("lucide-react").Info,
  Link: require("lucide-react").Link,
  Mail: require("lucide-react").Mail,
  MessageSquare: require("lucide-react").MessageSquare,
  Moon: require("lucide-react").Moon,
  Phone: require("lucide-react").Phone,
  Plus: require("lucide-react").Plus,
  Search: require("lucide-react").Search,
  Settings: require("lucide-react").Settings,
  Share: require("lucide-react").Share,
  Star: require("lucide-react").Star,
  Sun: require("lucide-react").Sun,
  Trash: require("lucide-react").Trash,
  User: require("lucide-react").User,
  X: require("lucide-react").X,
};

type Section = {
  id: string;
  type: string;
  content: any;
};

export default function FeaturesSection({ section }: { section: Section }) {
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
  );
} 