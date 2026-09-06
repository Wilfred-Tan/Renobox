import { PlusIcon } from "@heroicons/react/24/outline";

export type FaqItemType = { question: string; answer: string };

export function Faq({ items }: { items: FaqItemType[] }) {
  return (
    <div className="divide-y divide-ink/10 border-t border-b border-ink/10">
      {items.map((item) => (
        <details key={item.question} className="group py-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {item.question}
            <PlusIcon
              className="h-5 w-5 shrink-0 text-gold-deep transition-transform duration-200 group-open:rotate-45"
              aria-hidden="true"
            />
          </summary>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
