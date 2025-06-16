import React from "react";

type Section = {
  id: string;
  type: string;
  content: any;
};

export default function LogosSection({ section }: { section: Section }) {
  return (
    <section className="py-10 bg-[var(--color-background)] text-[var(--color-text)]">
      <h2 className="text-2xl font-bold text-center mb-8">{section.content.title}</h2>
      <div className="flex flex-wrap justify-center items-center gap-8 max-w-5xl mx-auto">
        {(section.content.logos || []).map((logo: any, idx: number) => (
          <img
            key={idx}
            src={logo.url}
            alt={logo.alt}
            className="h-12 w-auto grayscale hover:grayscale-0 transition"
          />
        ))}
      </div>
    </section>
  );
}