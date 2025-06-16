import { Section } from "@prisma/client";

export default function PricingSection({ section }: { section: Section }) {
  const content = (section.content || {}) as any;
  return (
    <section className="py-16 bg-[var(--color-background)] text-[var(--color-text)]">
      <h2 className="text-3xl font-bold text-center mb-10">{content.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {(content.plans || []).map((plan: any, idx: number) => (
          <div key={idx} className="bg-white rounded-lg shadow p-8 flex flex-col items-center text-center">
            <div className="text-2xl font-bold mb-2">{plan.name}</div>
            <div className="text-3xl font-extrabold text-[var(--color-primary)] mb-4">{plan.price}</div>
            <ul className="mb-6 space-y-2">
              {(plan.features || []).map((f: string, fidx: number) => (
                <li key={fidx} className="text-gray-700 flex items-center gap-2"><span>✔️</span> {f}</li>
              ))}
            </ul>
            {plan.cta?.label && (
              <a href={plan.cta.href || "#"} className="mt-auto inline-block bg-[var(--color-primary)] text-white px-6 py-2 rounded font-semibold hover:bg-opacity-90 transition">{plan.cta.label}</a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
