import { Badge } from "@/components/ui/Badge";
import type { Testimonial } from "@/lib/data/testimonials";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col justify-between gap-8 border border-paper/10 bg-ink-soft p-8 md:p-10">
      <blockquote className="font-heading text-xl leading-snug text-paper md:text-2xl">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-paper">{testimonial.name}</p>
          <p className="text-sm text-paper/50">{testimonial.role}</p>
        </div>
        <Badge tone="dark">{testimonial.category}</Badge>
      </figcaption>
    </figure>
  );
}
