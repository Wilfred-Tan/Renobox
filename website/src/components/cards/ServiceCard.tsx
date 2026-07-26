import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { ServiceSlideshow } from "@/components/cards/ServiceSlideshow";
import { CornerFrame } from "@/components/ui/CornerFrame";

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
  return (
    <div className="group relative flex flex-col overflow-hidden border border-ink/10 transition-colors duration-300 hover:border-gold/40">
      <div className="relative aspect-[4/3] overflow-hidden">
        {images && images.length > 0 ? (
          <ServiceSlideshow images={images} label={imageLabel} />
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
