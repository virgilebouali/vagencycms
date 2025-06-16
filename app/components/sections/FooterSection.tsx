import React from "react";

type Section = {
  id: string;
  type: string;
  content: any;
};

export default function FooterSection({ section }: { section: Section }) {
  const footerLogo = section.content.logo || `/image-placeholder.webp`;
  const footerTitle = section.content.title || "Mon Site";
  const footerText = section.content.text || `© 2025 Mon Site. Tous droits réservés.`;
  return (
    <footer className="py-10 bg-[var(--color-primary)] text-white border-t mt-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-4">
        <div className="flex items-center gap-3">
          <img src={footerLogo} alt="Logo" className="h-10 w-auto rounded" />
          <span className="text-2xl font-bold">{footerTitle}</span>
        </div>
        <nav className="flex flex-wrap gap-6">
          {(section.content.links || []).map((link: any, idx: number) => (
            <a
              key={idx}
              href={link.href && link.href.trim() !== "" ? link.href : "#"}
              className="hover:underline hover:text-[var(--color-secondary)] transition"
            >
              {link.label && link.label.trim() !== "" ? link.label : "Lien"}
            </a>
          ))}
        </nav>
      </div>
      <div className="text-center text-sm text-white/70 mt-6">
        {footerText}
      </div>
    </footer>
  );
} 