import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function PageHero({
  eyebrow,
  title,
  description,
  imageSrc,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  imageSrc: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative flex min-h-[60dvh] items-end overflow-hidden bg-ink">
      <Image src={imageSrc} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
      <Container size="wide" className="relative z-10 pt-40 pb-16 md:pt-44 md:pb-20">
        <p className="mb-6 flex animate-fade-up items-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold-bright uppercase">
          <span className="h-px w-8 bg-gold-bright" />
          {eyebrow}
        </p>
        <h1 className="max-w-3xl animate-fade-up text-4xl leading-[1.05] font-semibold tracking-tight text-balance text-paper [animation-delay:100ms] font-heading md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-paper/70 [animation-delay:200ms]">
            {description}
          </p>
        )}
        {children && (
          <div className="mt-8 animate-fade-up [animation-delay:300ms]">{children}</div>
        )}
      </Container>
    </section>
  );
}
