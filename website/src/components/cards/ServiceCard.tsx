"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { ServiceSlideshow, type ServiceSlideshowHandle } from "@/components/cards/ServiceSlideshow";
import { CornerFrame } from "@/components/ui/CornerFrame";

// Swipe threshold in pixels — must be a clearly horizontal, deliberate drag so
// it doesn't fire on an incidental touch or a vertical page-scroll gesture.
const SWIPE_THRESHOLD = 40;

export function ServiceCard({
  href,
  title,
  description,
  imageLabel,
  images,
  cta = "Explore",
}: {
  href: string;
  title: string;
  description: string;
  imageLabel: string;
  images?: string[];
  cta?: string;
}) {
  const slideshowRef = useRef<ServiceSlideshowHandle>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const didSwipe = useRef(false);

  // The full-card <Link> below sits on top of the photo (so tapping anywhere
  // opens the project), which also means it — not the slideshow — is what
  // actually receives touch events there. These handlers live on the card
  // root (an ancestor of that Link) so they still see the events via bubbling.
  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
    didSwipe.current = false;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      didSwipe.current = true;
      if (dx < 0) slideshowRef.current?.next();
      else slideshowRef.current?.prev();
    }
  };

  // Capture phase, so this runs before the Link's own click handler and can
  // stop a swipe from also being read as a tap that navigates away.
  const handleClickCapture = (e: React.MouseEvent) => {
    if (didSwipe.current) {
      e.preventDefault();
      e.stopPropagation();
      didSwipe.current = false;
    }
  };

  return (
    <div
      className="group relative flex flex-col overflow-hidden border border-ink/10 transition-colors duration-300 hover:border-gold/40"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClickCapture={handleClickCapture}
    >
      <div className="relative aspect-[4/3] touch-pan-y overflow-hidden">
        {images && images.length > 0 ? (
          <ServiceSlideshow ref={slideshowRef} images={images} label={imageLabel} />
        ) : (
          <PlaceholderImage
            label={imageLabel}
            aspect="aspect-[4/3]"
            className="transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
        <CornerFrame className="pointer-events-none absolute inset-4 text-paper/0 transition-colors duration-300 group-hover:text-gold/70" />
      </div>
      <div className="flex flex-1 flex-col gap-3 bg-paper p-8">
        <h3 className="font-heading text-2xl font-semibold text-ink">{title}</h3>
        <p className="leading-relaxed text-muted">{description}</p>
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-deep">
          {cta}
          <ArrowUpRightIcon
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
      <Link href={href} className="absolute inset-0 z-0" aria-label={title} />
    </div>
  );
}
