import type { Metadata } from "next";
import { SparklesIcon, ScaleIcon, ShieldCheckIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { FeatureItem } from "@/components/cards/FeatureItem";
import { PageHero } from "@/components/sections/PageHero";
import { ClientLogoGrid } from "@/components/sections/ClientLogoGrid";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Design and construction under one roof — the team behind Reno Box's commercial and residential renovation work in Singapore.",
};

const values = [
  {
    icon: SparklesIcon,
    title: "Craftsmanship",
    description:
      "We sweat the details most contractors skip — mitred skirting, consistent grout lines, doors that still close true a year on.",
  },
  {
    icon: ScaleIcon,
    title: "Transparency",
    description:
      "Fixed quotes and plain-language contracts. If something changes mid-project, you approve the cost before we proceed.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Accountability",
    description:
      "If something's our fault, we fix it. Our warranty period is honoured without you having to fight for it.",
  },
  {
    icon: HandRaisedIcon,
    title: "Partnership",
    description:
      "Every project, big or small, is treated as a relationship worth keeping past handover — many of our clients come back.",
  },
];

const certifications = [
  {
    title: "BCA Registered Contractor",
    description:
      "Registered with the Building and Construction Authority, meeting the regulatory standards required for licensed contracting work in Singapore.",
  },
  {
    title: "CaseTrust Accredited",
    description:
      "Accredited under the CaseTrust scheme for fair trading practices, giving clients added protection and a clear channel for recourse.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Design and construction, under one roof."
        description="We're a Singapore-based design-and-build studio working across commercial fit-outs and residential renovation."
        imageLabel="About the Studio"
      />

      {/* Story */}
      <section className="py-24 md:py-32">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <RevealOnScroll>
              <div className="bg-paper-dim p-8 md:p-10">
                <p className="mb-6 flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-gold-deep uppercase">
                  <span className="h-px w-8 bg-gold" />
                  Select Corporate Clients &amp; Partners
                </p>
                <ClientLogoGrid />
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <p className="mb-4 flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-gold-deep uppercase">
                <span className="h-px w-8 bg-gold" />
                Our Story
              </p>
              <h2 className="text-balance font-heading text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                {site.stats[0].value}+ years of building spaces that work as hard as they look.
              </h2>
              <div className="mt-6 flex flex-col gap-5 text-lg leading-relaxed text-muted">
                <p>
                  {site.name}
                  {" "}
                  has spent {site.stats[0].value}+ years designing and building spaces across
                  Singapore — long enough to have refined a process that holds up under a tight F&amp;B
                  opening deadline and a homeowner&apos;s evolving brief alike.
                </p>
                <p>
                  That range shows in the client list: national F&amp;B chains rolling out new
                  outlets, corporate offices fitting out a full floor, and homeowners renovating a
                  landed property room by room. The same design-and-build team and fixed-quote
                  process applies across all of it.
                </p>
                <p>
                  Today that adds up to {site.stats[1].value}+ projects completed — including the
                  F&amp;B rollouts, corporate offices, and residential renovations featured in our
                  portfolio.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-ink py-24 text-paper md:py-32">
        <Container size="wide">
          <RevealOnScroll>
            <SectionHeading eyebrow="What We Value" title="How we work, on every project." tone="light" />
          </RevealOnScroll>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <RevealOnScroll key={value.title} delay={i * 100}>
                <FeatureItem
                  icon={value.icon}
                  title={value.title}
                  description={value.description}
                  tone="light"
                />
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* Certifications */}
      <section className="py-24 md:py-32">
        <Container size="wide">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Accreditation"
              title="Licensed and accredited to work across Singapore."
            />
          </RevealOnScroll>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {certifications.map((cert, i) => (
              <RevealOnScroll key={cert.title} delay={i * 100}>
                <div className="h-full border-t-2 border-gold pt-6">
                  <h3 className="font-heading text-xl font-semibold text-ink">{cert.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{cert.description}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-ink-soft py-24 text-center md:py-28">
        <Container size="default">
          <RevealOnScroll>
            <h2 className="font-heading text-4xl font-semibold text-balance text-paper md:text-5xl">
              Want to see the work in person?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-paper/60">
              Visit our showroom or start with a call — either way, we&apos;ll walk you through
              past projects relevant to yours.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" size="lg">
                Get in Touch
              </Button>
              <Button href="/portfolio" size="lg" variant="on-dark">
                View Portfolio
              </Button>
            </div>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
