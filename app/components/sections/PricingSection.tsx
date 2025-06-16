import { Section } from "@prisma/client";

const PLACEHOLDER_PLANS = [
  {
    name: "Starter",
    price: "Gratuit",
    features: [
      "1 utilisateur",
      "Support basique",
      "Accès limité aux fonctionnalités",
    ],
    cta: { label: "Commencer", href: "#" },
  },
  {
    name: "Pro",
    price: "19€/mois",
    features: [
      "Jusqu'à 10 utilisateurs",
      "Support prioritaire",
      "Toutes les fonctionnalités principales",
    ],
    cta: { label: "Essayer Pro", href: "#" },
  },
  {
    name: "Entreprise",
    price: "Sur devis",
    features: [
      "Utilisateurs illimités",
      "Support dédié 24/7",
      "Fonctionnalités avancées & personnalisées",
    ],
    cta: { label: "Contactez-nous", href: "#" },
  },
];

export default function PricingSection({ section }: { section: Section }) {
  const content = (section.content || {}) as any;
  const title = content.title || "Nos offres";
  const plans = content.plans && content.plans.length > 0 ? content.plans : PLACEHOLDER_PLANS;
  return (
    <section className="py-16 bg-[var(--color-background)] text-[var(--color-text)]">
      <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan: any, idx: number) => (
          <div key={idx} className="bg-white rounded-lg shadow p-8 flex flex-col items-center text-center">
            <div className="text-2xl font-bold mb-2">{plan.name || `Plan ${idx + 1}`}</div>
            <div className="text-3xl font-extrabold text-[var(--color-primary)] mb-4">{plan.price || "-"}</div>
            <ul className="mb-6 space-y-2">
              {(plan.features && plan.features.length > 0 ? plan.features : ["Feature 1", "Feature 2"]).map((f: string, fidx: number) => (
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
