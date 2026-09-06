import type { Metadata } from "next";
import {
  BuildingOffice2Icon,
  BuildingOfficeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { FeatureItem } from "@/components/cards/FeatureItem";
import { PageHero } from "@/components/sections/PageHero";
import { Faq } from "@/components/sections/Faq";
import { whatsappHref } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Interior Design Firm Partnerships",
  description:
    "Main-contractor support for interior design firms in Singapore — end-to-end renovation execution backed by our own factory and a network of specialist trade partners.",
};

const capabilities = [
  {
    icon: BuildingOffice2Icon,
    title: "End-to-End Main Contractor",
    description:
      "One contractor for the full scope — structural work, M&E, and finishes — so you're not chasing multiple vendors across a single project.",
  },
  {
    icon: BuildingOfficeIcon,
    title: "Our In-House Factory",
    description:
      "The same 20-person carpentry, painting, and masonry team from our Singapore factory executes your drawings, not a rotating cast of subcontractors.",
  },
  {
    icon: UserGroupIcon,
    title: "A Wide Specialist Network",
    description:
      "For anything outside our core trades, we bring in vetted specialist partners at rates we've already negotiated — not marked up on your behalf.",
  },
];

const faqItems = [
  {
    question: "Do you work directly with our client, or only through us?",
    answer:
      "Either way — we can liaise directly with your client under your direction, or work solely through your team. We'll follow whatever reporting structure you set.",
  },
  {
    question: "I'm an interior designer with a client — can you help execute my designs?",
    answer:
      "Yes — with our extensive main-contractor experience, we can advise on technical feasibility and work hand-in-hand with your team from concept to completion, backed by our in-house furniture fabrication capabilities.",
  },
  {
    question: "Can you take on just the furniture fabrication for a project?",
    answer:
      "Yes — we can act as a sub-contractor purely for furniture fabrication, building to your drawings and specs while you retain the main contract.",
  },
];

export default function PartnershipsPage() {
  return (
    <>
      <PageHero
        eyebrow="Design Firm Partnerships"
        title="A main contractor your projects can rely on."
        description="We execute renovation and fit-out projects designed by interior design firms — end-to-end, on your timeline, backed by our own in-house factory and a wide network of specialist trade partners."
        imageSrc="/images/portfolio/september-coffee/5.jpg"
      >
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href="/contact" size="lg">
            Discuss a Project
          </Button>
          <Button href={whatsappHref} target="_blank" rel="noopener noreferrer" size="lg" variant="on-dark">
            Chat on WhatsApp
          </Button>
        </div>
      </PageHero>

      {/* Capabilities */}
      <section className="py-24 md:py-32">
        <Container size="wide">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="How We Work With You"
              title="Built to plug into your project, not compete with it."
              description="Whether you need a main contractor for the full scope or specialist support for one piece of it, the same team and process applies."
            />
          </RevealOnScroll>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item, i) => (
              <RevealOnScroll key={item.title} delay={(i % 3) * 100}>
                <FeatureItem icon={item.icon} title={item.title} description={item.description} />
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-paper-dim py-24 md:py-32">
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
              Have a project that needs a main contractor?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-paper/60">
              Send us the drawings and scope — we&apos;ll come back with a competitively priced
              quote and a timeline your client can plan around.
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
