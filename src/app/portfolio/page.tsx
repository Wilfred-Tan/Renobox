import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
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
        imageSrc="/images/portfolio/pizza-hut-tiong-bahru/2.jpg"
      />
      <section className="py-24 md:py-32">
        <Container size="wide">
          <PortfolioGrid projects={projects} />
          <p className="mt-16 text-center text-sm text-muted">
            This portfolio&apos;s under construction too — watch this space as we add more of our
            work.
          </p>
        </Container>
      </section>
    </>
  );
}
