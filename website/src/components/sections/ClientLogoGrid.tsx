import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { CornerFrame } from "@/components/ui/CornerFrame";
import { clients } from "@/lib/data/clients";

export function ClientLogoGrid() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {clients.map((client, i) => (
        <RevealOnScroll key={client.name} delay={(i % 6) * 100}>
          <div className="group relative h-24 border border-ink/10 bg-paper md:h-28">
            <Image
              src={client.logo}
              alt={client.name}
              fill
              sizes="150px"
              className="object-contain p-3"
            />
            <CornerFrame className="absolute inset-3 text-paper/0 transition-colors duration-300 group-hover:text-gold/70" />
          </div>
        </RevealOnScroll>
      ))}
    </div>
  );
}
