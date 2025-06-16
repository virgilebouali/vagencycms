import React from "react";

type Section = {
  id: string;
  type: string;
  content: any;
};

export default function HeroSection({ section }: { section: Section }) {
  const overlayOpacity = section.content.overlayOpacity !== undefined ? parseFloat(section.content.overlayOpacity) : 0.5;
  const ctaLabel = section.content.cta?.label && section.content.cta.label.trim() !== '' ? section.content.cta.label : 'Bouton';
  const ctaHref = section.content.cta?.href && section.content.cta.href.trim() !== '' ? section.content.cta.href : '#';
  const ctaColor = section.content.cta?.color || '#2563eb';
  return (
    <section
      className="relative w-full flex items-center justify-center"
      style={{
        minHeight: '400px',
        backgroundImage: section.content.image ? `url('${section.content.image}')` : "url('/image-placeholder.webp')",
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
  );
} 