import { Section } from "@prisma/client";

export default function TestimonialsSection({ section }: { section: Section }) {
  const content = (section.content || {}) as any;
  return (
    <section className="py-16 bg-[var(--color-background)] text-[var(--color-text)]">
      <h2 className="text-3xl font-bold text-center mb-10">{content.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {(content.testimonials || []).map((item: any, idx: number) => (
          <div key={idx} className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
            {item.photo && <img src={item.photo} alt={item.name} className="w-20 h-20 rounded-full object-cover mb-4" />}
            <p className="italic mb-4">"{item.text}"</p>
            <div className="font-semibold">{item.name}</div>
            <div className="text-sm text-gray-500">{item.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
