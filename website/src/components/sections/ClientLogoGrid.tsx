import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { CornerFrame } from "@/components/ui/CornerFrame";

// PLACEHOLDER — replace each tile with the client's real logo (next/image,
// object-contain) once we have permission and artwork on hand. Adjust this
// count if the number of confirmed clients changes before launch.
const PLACEHOLDER_LOGO_COUNT = 18;

export function ClientLogoGrid() {
  return (
    <div className="mt-14 grid grid-cols-3 gap-4 sm:grid-cols-6">
      {Array.from({ length: PLACEHOLDER_LOGO_COUNT }).map((_, i) => (
        <RevealOnScroll key={i} delay={(i % 6) * 100}>
          <div className="group relative flex h-20 items-center justify-center border border-ink/10 bg-paper md:h-24">
            <span className="sr-only">Client logo {i + 1}</span>
            <BuildingOffice2Icon className="h-8 w-8 text-ink/20" aria-hidden="true" />
            <CornerFrame className="absolute inset-3 text-paper/0 transition-colors duration-300 group-hover:text-gold/70" />
          </div>
        </RevealOnScroll>
      ))}
    </div>
  );
}
