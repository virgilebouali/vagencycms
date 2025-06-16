import React from "react";

type Section = {
  id: string;
  type: string;
  content: any;
};

export default function TextImageSection({ section }: { section: Section }) {
  const isImageRight = section.content.position === "right";
  const imageClass = `${section.content.imageSize || "w-full"} ${section.content.imageRounded || "rounded"} object-cover`;
  const ctaLabel = section.content.cta?.label && section.content.cta.label.trim() !== '' ? section.content.cta.label : 'Bouton';
  const ctaHref = section.content.cta?.href && section.content.cta.href.trim() !== '' ? section.content.cta.href : '#';
  const ctaColor = section.content.cta?.color || '#2563eb';
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-[var(--color-secondary)] text-[var(--color-text)] items-center">
      {!isImageRight && (
        <img src={section.content.image || "/image-placeholder.webp"} alt="" className={imageClass} />
      )}
      <div className="flex flex-col items-center text-center">
        <h2 className={`text-${section.content.titleSize || "2xl"} font-semibold`}>{section.content.title}</h2>
        <p className={`text-${section.content.textSize || "base"} mt-2`}>{section.content.text}</p>
        <a
          href={ctaHref}
          className="mt-8 inline-block text-white px-6 py-3 rounded shadow-lg text-lg font-semibold hover:bg-opacity-90 transition"
          style={{ backgroundColor: ctaColor }}
        >
          {ctaLabel}
        </a>
      </div>
      {isImageRight && (
        <img src={section.content.image || "/image-placeholder.webp"} alt="" className={imageClass} />
      )}
    </section>
  );
} 