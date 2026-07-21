import type { Metadata } from "next";
import {
  BuildingStorefrontIcon,
  ShoppingBagIcon,
  BuildingOffice2Icon,
  ClipboardDocumentCheckIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { FeatureItem } from "@/components/cards/FeatureItem";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { PageHero } from "@/components/sections/PageHero";
import { Faq } from "@/components/sections/Faq";
import { projects } from "@/lib/data/projects";
import { whatsappHref } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Commercial & F&B Fit-Outs",
  description:
    "Restaurant, cafe, retail, and office fit-outs in Singapore, designed and built around your opening date.",
};

const services = [
  {
    icon: BuildingStorefrontIcon,
    title: "Restaurant & Cafe Fit-Outs",
    description:
      "Full-service restaurants and specialty cafes, with kitchen layouts engineered alongside your head chef for service efficiency.",
  },
  {
    icon: ShoppingBagIcon,
    title: "Retail Fit-Outs",
    description:
      "Durable, brand-forward store environments that hold up under daily footfall without losing their finish.",
  },
  {
    icon: BuildingOffice2Icon,
    title: "Office Renovation",
    description:
      "Phased fit-outs and refreshes planned around your working hours, so your team stays operational throughout.",
  },
  {
    icon: ClipboardDocumentCheckIcon,
    title: "Licensing & Compliance Support",
    description:
      "SFA, URA, and fire safety coordination handled alongside construction, not left for you to chase separately.",
  },
  {
    icon: RectangleGroupIcon,
    title: "Turnkey Project Management",
    description:
      "One contract and one point of contact from design through to handover, across every trade on site.",
  },
];

const faqItems = [
  {
    question: "Can you work around our operating hours?",
    answer:
      "Yes — for office and retail renovations we regularly phase works across weekends or after-hours to keep you operational. We'll scope this at the consultation stage.",
  },
  {
    question: "Do you handle F&B licensing and compliance?",
    answer:
      "We coordinate SFA kitchen requirements, URA change-of-use where applicable, and fire safety certification as part of the build, so it isn't a separate workstream for you to manage.",
  },
  {
    question: "What happens if there's a delay?",
    answer:
      "Our fixed quote includes an agreed timeline with milestones. If a delay originates on our side, we absorb the cost of catching back up — we don't pass site inefficiency on to you.",
  },
  {
    question: "Can you work with our own architect or ID?",
    answer:
      "Yes. We regularly deliver as main contractor against third-party designs, as well as offering our own in-house design and build service.",
  },
];

const commercialProjects = projects.filter((p) => p.category === "commercial");

export default function CommercialPage() {
  return (
    <>
      <PageHero
        eyebrow="Commercial & F&B"
        title="Fit-outs built around your opening date."
        description="Every day a unit sits unopened is lost revenue. We design and build restaurants, cafes, retail, and offices against fixed timelines, without cutting corners on finish."
        imageLabel="Commercial & F&B Fit-Outs"
      >
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href="/contact" size="lg">
            Get a Quote
          </Button>
          <Button href="#portfolio" size="lg" variant="on-dark">
            View Commercial Projects
          </Button>
        </div>
      </PageHero>

      {/* Services */}
      <section className="py-24 md:py-32">
        <Container size="wide">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Services"
              title="What we deliver for commercial clients."
              description="From a single cafe unit to a multi-outlet rollout, the same design-and-build team stays with the project end to end."
            />
          </RevealOnScroll>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <RevealOnScroll key={service.title} delay={(i % 3) * 100}>
                <FeatureItem
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                />
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="bg-paper-dim py-24 md:py-32">
        <Container size="wide">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <RevealOnScroll>
              <SectionHeading
                eyebrow="Recent Work"
                title="Commercial & F&B projects."
                className="max-w-xl"
              />
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <Button href="/portfolio" variant="secondary">
                View Full Portfolio
              </Button>
            </RevealOnScroll>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {commercialProjects.map((project, i) => (
              <RevealOnScroll key={project.slug} delay={(i % 3) * 100}>
                <ProjectCard project={project} />
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32">
        <Container size="narrow">
          <RevealOnScroll>
            <SectionHeading eyebrow="Common Questions" title="Before you get in touch." />
          </RevealOnScroll>
          <RevealOnScroll delay={100} className="mt-12">
            <Faq items={faqItems} />
          </RevealOnScroll>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-ink py-24 text-center md:py-28">
        <Container size="default">
          <RevealOnScroll>
            <h2 className="font-heading text-4xl font-semibold text-balance text-paper md:text-5xl">
              Have a site and a deadline?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-paper/60">
              Send us the unit details and your target opening date — we&apos;ll respond with a
              scoped timeline.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" size="lg">
                Request a Quote
              </Button>
              <Button href={whatsappHref} target="_blank" rel="noopener noreferrer" size="lg" variant="on-dark">
                Chat on WhatsApp
              </Button>
            </div>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
