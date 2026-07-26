import {
  WrenchScrewdriverIcon,
  DocumentCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { StatCounter } from "@/components/ui/StatCounter";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ProcessStep } from "@/components/cards/ProcessStep";
import { FeatureItem } from "@/components/cards/FeatureItem";
import { site } from "@/lib/data/site";
import { projects } from "@/lib/data/projects";

// Balance the teaser across both audiences rather than a blind first-N slice.
const featuredProjects = [
  ...projects.filter((p) => p.category === "commercial").slice(0, 4),
  ...projects.filter((p) => p.category === "residential").slice(0, 2),
];

// Hand-picked across all projects in each category — not a generic slice —
// for the "What We Do" slideshow cards. Update if a stronger shot turns up.
const commercialShowcase = [
  "/images/portfolio/september-coffee/1.jpg",
  "/images/portfolio/kfc-amk/2.jpg",
  "/images/portfolio/kfc-downtown-east/2.jpg",
  "/images/portfolio/pizza-hut-tiong-bahru/1.jpg",
  "/images/portfolio/office-mbfc/1.jpg",
];
const residentialShowcase = [
  "/images/portfolio/residential-potong-pasir/1.jpg",
  "/images/portfolio/residential-bidadari/4.jpg",
  "/images/portfolio/residential-potong-pasir/4.jpg",
  "/images/portfolio/residential-bidadari/1.jpg",
  "/images/portfolio/residential-potong-pasir/3.jpg",
];

const processSteps = [
  {
    title: "Consult & Scope",
    description:
      "We walk the space, understand how you'll use it, and align on budget and timeline before anything is drawn.",
  },
  {
    title: "Design & Fixed Quote",
    description:
      "3D visualisation and an itemised, fixed quote — so you sign off knowing exactly what you're paying for.",
  },
  {
    title: "Build & Manage",
    description:
      "One project manager coordinates every trade, with regular site updates so you're never left guessing.",
  },
  {
    title: "Handover & Support",
    description:
      "A final walkthrough, snag-free handover, and a warranty period backed by a team that stays reachable.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92dvh] items-end overflow-hidden bg-ink">
        <PlaceholderImage
          label="Hero — Commercial & Residential Work"
          aspect=""
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
        <Container size="wide" className="relative z-10 pt-40 pb-20 md:pt-48 md:pb-28">
          <p className="mb-6 flex animate-fade-up items-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold-bright uppercase">
            <span className="h-px w-8 bg-gold-bright" />
            Commercial &amp; Residential &middot; Singapore
          </p>
          <h1 className="max-w-4xl animate-fade-up text-5xl leading-[1.02] font-semibold tracking-tight text-balance text-paper [animation-delay:120ms] font-heading md:text-7xl lg:text-8xl">
            We renovate spaces people <span className="text-gold-bright">remember.</span>
          </h1>
          <p className="mt-8 max-w-xl animate-fade-up text-lg leading-relaxed text-paper/70 [animation-delay:240ms] md:text-xl">
            {site.name}
            {" "}
            designs and builds F&amp;B fit-outs, commercial spaces, and residential renovations
            across Singapore — engineered to perform as well as they photograph.
          </p>
          <div className="mt-10 flex animate-fade-up flex-col gap-4 [animation-delay:360ms] sm:flex-row">
            <Button href="/portfolio" size="lg">
              View Our Work
            </Button>
            <Button href="/contact" size="lg" variant="on-dark">
              Get a Quote
            </Button>
          </div>
          <div className="mt-16 flex animate-fade-up flex-wrap items-center gap-x-8 gap-y-3 border-t border-paper/10 pt-8 text-xs font-medium tracking-wide text-paper/50 uppercase [animation-delay:480ms]">
            {site.certifications.map((c) => (
              <span key={c.label}>{c.label}</span>
            ))}
          </div>
        </Container>
      </section>

      {/* Stat bar */}
      <section className="bg-ink-soft py-14">
        <Container size="wide">
          <div className="grid grid-cols-2 gap-8 sm:flex sm:items-center sm:justify-center sm:gap-24">
            {site.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-4xl font-bold text-paper md:text-5xl">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm text-paper/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Dual path intro */}
      <section className="py-24 md:py-32">
        <Container size="wide">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="What We Do"
              title="Two crafts, one standard of delivery."
              description="Whether it's a restaurant that needs to open on schedule or a home that needs to feel right for years, the same design and project-management discipline applies."
            />
          </RevealOnScroll>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            <RevealOnScroll delay={80}>
              <ServiceCard
                href="/commercial"
                title="Commercial & F&B Fit-Outs"
                imageLabel="Commercial & F&B"
                images={commercialShowcase}
                description="Restaurants, cafes, retail, and offices — designed and built around licensing timelines and opening-day deadlines."
              />
            </RevealOnScroll>
            <RevealOnScroll delay={160}>
              <ServiceCard
                href="/residential"
                title="Residential Renovation"
                imageLabel="Residential"
                images={residentialShowcase}
                description="HDB, condo, and landed renovations, from space planning through custom carpentry to final handover."
              />
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      {/* Portfolio teaser */}
      <section className="bg-paper-dim py-24 md:py-32">
        <Container size="wide">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <RevealOnScroll>
              <SectionHeading
                eyebrow="Selected Work"
                title="Recent projects across Singapore."
                description={`A well-documented slice of the ${site.stats[1].value}+ projects we've delivered over ${site.stats[0].value}+ years.`}
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
            {featuredProjects.map((project, i) => (
              <RevealOnScroll key={project.slug} delay={(i % 3) * 100}>
                <ProjectCard project={project} />
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="py-24 md:py-32">
        <Container size="wide">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="How We Work"
              title="A fixed process, from first call to handover."
              description="The same four stages apply whether it's a six-week cafe fit-out or a four-month landed home renovation."
            />
          </RevealOnScroll>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <RevealOnScroll key={step.title} delay={i * 100}>
                <ProcessStep index={i + 1} title={step.title} description={step.description} />
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* Why us */}
      <section className="bg-ink py-24 text-paper md:py-32">
        <Container size="wide">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Why Us"
              title="Built for clients who can't afford surprises."
              tone="light"
            />
          </RevealOnScroll>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <RevealOnScroll delay={0}>
              <FeatureItem
                icon={WrenchScrewdriverIcon}
                title="In-House Design + Build"
                description="One team owns design and construction, so nothing gets lost in translation between drawing and site."
                tone="light"
              />
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <FeatureItem
                icon={DocumentCheckIcon}
                title="Transparent, Fixed Quotes"
                description="An itemised quote before work begins, so the number you approve is the number you pay."
                tone="light"
              />
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <FeatureItem
                icon={UserGroupIcon}
                title="Dedicated Project Management"
                description="A single point of contact coordinates every trade and keeps you updated without you having to chase."
                tone="light"
              />
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      {/* Reviews CTA — no published reviews yet; this collects submissions for
          our team to vet before anything goes live (see ReviewForm). */}
      <section className="border-y border-ink/10 py-16">
        <Container size="default">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="font-heading text-2xl font-semibold text-ink md:text-3xl">
              Worked with us on a project?
            </p>
            <p className="max-w-md text-muted">
              We&apos;d love to hear how it went — every submission is read by our team before
              it&apos;s published.
            </p>
            <Button href="/leave-a-review" variant="secondary" size="lg">
              Leave a Review
            </Button>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="bg-ink-soft py-24 md:py-28">
        <Container size="default" className="text-center">
          <RevealOnScroll>
            <h2 className="font-heading text-4xl font-semibold text-balance text-paper md:text-5xl">
              Ready to start your project?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-paper/60">
              Tell us about your space and timeline — we&apos;ll come back with a clear scope and
              a fixed quote.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" size="lg">
                Request a Quote
              </Button>
              <Button href={site.phoneHref} size="lg" variant="on-dark">
                Call {site.phoneDisplay}
              </Button>
            </div>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
