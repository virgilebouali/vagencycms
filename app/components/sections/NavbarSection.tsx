import React from "react";

type Section = {
  id: string;
  type: string;
  content: any;
};

export default function NavbarSection({ section }: { section: Section }) {
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
  );
} 