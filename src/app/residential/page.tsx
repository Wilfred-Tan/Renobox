import type { Metadata } from "next";
import {
  HomeModernIcon,
  BuildingOffice2Icon,
  HomeIcon,
  WrenchScrewdriverIcon,
  CubeTransparentIcon,
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
  title: "Residential Renovation",
  description:
    "HDB, condo, and landed home renovations in Singapore, from space planning to custom carpentry and handover.",
};

const services = [
  {
    icon: HomeModernIcon,
    title: "HDB BTO & Resale Renovation",
    description:
      "From bare BTO units to full resale makeovers, planned around HDB guidelines and permit timelines.",
  },
  {
    icon: BuildingOffice2Icon,
    title: "Condo Renovation",
    description:
      "Renovations that respect MCST house rules and building access windows, without slowing your project down.",
  },
  {
    icon: HomeIcon,
    title: "Landed Property Renovation",
    description:
      "Structural alterations, M&E rewiring, and full-house renovations coordinated under a single contract.",
  },
  {
    icon: WrenchScrewdriverIcon,
    title: "Custom Carpentry & Furniture",
    description:
      "Purpose-built storage and furniture designed for your unit's actual dimensions, not off-the-shelf sizing.",
  },
  {
    icon: CubeTransparentIcon,
    title: "Space Planning & 3D Visualisation",
    description:
      "See your renovation before it's built, so decisions are made on-screen rather than mid-construction.",
  },
];

const faqItems = [
  {
    question: "Can I stay in my home during renovation?",
    answer:
      "For partial renovations, often yes — we'll sequence works to keep at least part of the home liveable. For full renovations or major structural works, we'll advise upfront if temporary relocation makes sense.",
  },
  {
    question: "How long does a typical renovation take?",
    answer:
      "A 4-room HDB resale typically runs 8–10 weeks; condos and landed homes vary with scope. You'll get a specific timeline as part of your quote, not a rough estimate.",
  },
  {
    question: "Do you help with HDB permit applications?",
    answer:
      "Yes — HDB renovation permit submission and any required PE endorsements for hacking works are handled by our team as part of the project.",
  },
  {
    question: "What's included in the quote?",
    answer:
      "Every line item — materials, labour, and carpentry — is itemised before work starts. Any changes you request after that are quoted separately and approved by you before proceeding.",
  },
];

const residentialProjects = projects.filter((p) => p.category === "residential");

export default function ResidentialPage() {
  return (
    <>
      <PageHero
        eyebrow="Residential"
        title="A renovation that's designed around how you live."
        description="HDB, condo, and landed homes — planned with 3D visualisation, competitively priced, and managed by one team from first sketch to key handover."
        imageSrc="/images/portfolio/residential-potong-pasir/2.jpg"
      >
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href="/contact" size="lg">
            Get a Quote
          </Button>
          <Button href="#portfolio" size="lg" variant="on-dark">
            View Residential Projects
          </Button>
        </div>
      </PageHero>

      {/* Services */}
      <section className="py-24 md:py-32">
        <Container size="wide">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Services"
              title="What we deliver for homeowners."
              description="Whichever property type, the same design, quoting, and site-management process applies from start to finish."
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
                title="Residential projects."
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
            {residentialProjects.map((project, i) => (
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
              Thinking about renovating?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-paper/60">
              Share your unit type and move-in timeline — we&apos;ll come back with a clear scope
              and a competitively priced quote.
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
