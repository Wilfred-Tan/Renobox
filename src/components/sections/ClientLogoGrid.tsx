import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { CornerFrame } from "@/components/ui/CornerFrame";
import { clients } from "@/lib/data/clients";
import { cn } from "@/lib/utils";

export function ClientLogoGrid({ tileBg = "bg-paper" }: { tileBg?: string }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {clients.map((client, i) => (
        <RevealOnScroll key={client.name} delay={(i % 6) * 100}>
          {/* The logo files all have a flat white (or near-white) background
              baked in with no transparency. mix-blend-multiply on the image
              makes that background disappear into whatever's immediately
              behind it — but RevealOnScroll's fade-up animation puts a
              `transform` on an ancestor, which creates a stacking context
              that isolates blending from anything painted further up the
              tree. So the tile needs its own matching, opaque background
              right here for the blend to actually reach — it can't rely on
              transparency + the page background showing through. */}
          <div className={cn("group relative h-24 border border-ink/10 md:h-28", tileBg)}>
            <Image
              src={client.logo}
              alt={client.name}
              fill
              sizes="150px"
              className="mix-blend-multiply object-contain p-3"
            />
            <CornerFrame className="absolute inset-3 text-paper/0 transition-colors duration-300 group-hover:text-gold/70" />
          </div>
        </RevealOnScroll>
      ))}
    </div>
  );
}
