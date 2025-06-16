import React from "react";

type Section = {
  id: string;
  type: string;
  content: any;
};

export default function CtaSection({ section }: { section: Section }) {
  return (
    <section className="py-16 bg-[var(--color-primary)] text-white flex flex-col items-center text-center">
      <h2 className="text-3xl font-bold mb-2">{section.content.title}</h2>
      <p className="mb-6 text-lg">{section.content.subtitle}</p>
      <a
        href={section.content.button?.href || "#"}
        className="bg-white text-[var(--color-primary)] px-8 py-3 rounded font-bold text-lg shadow hover:bg-gray-100 transition"
      >
        {section.content.button?.label || "Commencer"}
      </a>
    </section>
  );
}