import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { PageHero } from "@/components/sections/PageHero";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { ClientLogoGrid } from "@/components/sections/ClientLogoGrid";
import { projects } from "@/lib/data/projects";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Commercial, F&B, and residential renovation projects delivered across Singapore.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Selected work across Singapore."
        description={`${site.stats[1].value}+ projects completed over ${site.stats[0].value}+ years — most from before we kept a consistent photo record. Here's a recent, well-documented selection; filter by category to see relevant work.`}
        imageLabel="Portfolio"
      />
      <section className="py-24 md:py-32">
        <Container size="wide">
          <PortfolioGrid projects={projects} />
        </Container>
      </section>

      {/* Past Clients */}
      <section className="bg-paper-dim py-24 md:py-32">
        <Container size="wide">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Past Clients"
              title="Businesses that have trusted us."
              description="From F&B chains to retail stores and corporate offices, these are some of the brands we've delivered fit-outs and renovations for across Singapore."
            />
          </RevealOnScroll>
          <ClientLogoGrid />
        </Container>
      </section>
    </>
  );
}
