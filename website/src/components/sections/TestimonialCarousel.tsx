"use client";

import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import type { Testimonial } from "@/lib/data/testimonials";

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "prev" | "next") => {
    const node = trackRef.current;
    if (!node) return;
    const amount = node.clientWidth * 0.85;
    node.scrollBy({ left: direction === "next" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
      >
        {testimonials.map((testimonial, i) => (
          <div key={i} className="w-[85%] shrink-0 snap-center sm:w-[60%] lg:w-[calc(50%-0.75rem)]">
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center gap-3">
        <button
          type="button"
          onClick={() => scroll("prev")}
          aria-label="Previous testimonial"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-gold hover:text-gold-deep"
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scroll("next")}
          aria-label="Next testimonial"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-gold hover:text-gold-deep"
        >
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
