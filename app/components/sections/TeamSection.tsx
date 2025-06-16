import { Section } from "@prisma/client";

export default function TeamSection({ section }: { section: Section }) {
  const content = (section.content || {}) as any;
  return (
    <section className="py-16 bg-[var(--color-background)] text-[var(--color-text)]">
      <h2 className="text-3xl font-bold text-center mb-10">{content.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {(content.members || []).map((member: any, idx: number) => (
          <div key={idx} className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
            {member.photo && <img src={member.photo} alt={member.name} className="w-20 h-20 rounded-full object-cover mb-4" />}
            <div className="font-semibold text-lg">{member.name}</div>
            <div className="text-sm text-gray-500 mb-2">{member.role}</div>
            <div className="text-gray-700 text-sm">{member.bio}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
