import { Section } from "@prisma/client";

export default function FaqSection({ section }: { section: Section }) {
  const content = (section.content || {}) as any;
  return (
    <section className="py-16 bg-[var(--color-background)] text-[var(--color-text)]">
      <h2 className="text-3xl font-bold text-center mb-10">{content.title}</h2>
      <div className="max-w-2xl mx-auto divide-y divide-gray-200">
        {(content.items || []).map((item: any, idx: number) => (
          <details key={idx} className="py-4">
            <summary className="font-semibold cursor-pointer text-lg">{item.question}</summary>
            <div className="mt-2 text-gray-700">{item.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
