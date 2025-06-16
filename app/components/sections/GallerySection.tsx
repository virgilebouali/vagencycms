import React from "react";

type Section = {
  id: string;
  type: string;
  content: any;
};

export default function GallerySection({ section }: { section: Section }) {
  return (
    <section className="py-16 bg-[var(--color-background)] text-[var(--color-text)]">
      <h2 className="text-3xl font-bold text-center mb-10">{section.content.title}</h2>
      <div className="overflow-x-auto">
        <div className="flex flex-nowrap gap-4 max-w-full px-2">
          {(section.content.images || []).map((img: any, idx: number) => (
            <img
              key={idx}
              src={img.url || "/image-placeholder.webp"}
              alt={img.alt || `Image`}
              className="w-72 h-52 object-cover rounded-lg shadow-md flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}