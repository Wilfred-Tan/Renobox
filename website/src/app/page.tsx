import {
  WrenchScrewdriverIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  SparklesIcon,
  CubeIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCounter } from "@/components/ui/StatCounter";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { FeatureItem } from "@/components/cards/FeatureItem";
import { ClientLogoGrid } from "@/components/sections/ClientLogoGrid";
import { site } from "@/lib/data/site";
import { projects } from "@/lib/data/projects";

// Hand-picked, not a blind first-N slice — Suntec City has no photos yet, so
// it's excluded here even though it'd otherwise be in chronological range.
const featuredSlugs = [
  "september-coffee",
  "office-mbfc",
  "kfc-plq",
  "pizza-hut-tiong-bahru",
  "residential-potong-pasir",
  "residential-bidadari",
];
const featuredProjects = featuredSlugs
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is (typeof projects)[number] => Boolean(p));

// On mobile (single-column) the grid shows only this hand-picked subset of 4;
// the rest appear once the grid widens to 2+ columns at the sm breakpoint.
const mobileOnlySlugs = [
  "september-coffee",
  "office-mbfc",
  "residential-potong-pasir",
  "residential-bidadari",
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

const whyUsItems = [
  {
    icon: BuildingOfficeIcon,
    title: "Our In-House Factory",
    description:
      "A 20-strong in-house team of carpenters, painters, and masons works out of our own Singapore factory — no waiting on outside trade schedules.",
  },
  {
    icon: SparklesIcon,
    title: "Experience With Complex Projects",
    description:
      "We've delivered multiple flagship outlets for major F&B operators — projects with a broader scope of work and more exacting standards of workmanship and design than a standard fit-out.",
  },
  {
    icon: WrenchScrewdriverIcon,
    title: "On-Time, On-Budget Delivery",
    description:
      "Renovation execution is our core trade — for homeowners, brands, and the design firms who trust us to build what they've drawn.",
  },
  {
    icon: UserGroupIcon,
    title: "Dedicated Project Management",
    description:
      "A single point of contact coordinates every trade and keeps you updated without you having to chase.",
  },
];

// Lighter-weight paths alongside the two primary crafts above — same "pick
// your path" idea, without the full slideshow-card treatment.
const secondarySegments = [
  {
    href: "/partnerships",
    icon: UserGroupIcon,
    title: "Design Firm Partnerships",
    description:
      "Main-contractor support for ID firms — from full execution to specialist trade support.",
  },
  {
    href: "/contact",
    icon: CubeIcon,
    title: "Bespoke Furniture",
    description: "Custom-built furniture and joinery, sized and finished for your space.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92dvh] items-end overflow-hidden bg-ink">
        <Image
          src="/images/portfolio/september-coffee/11.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/70 to-ink/40" />
        <Container size="wide" className="relative z-10 pt-40 pb-20 md:pt-48 md:pb-28">
          <p className="mb-6 flex animate-fade-up items-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold-bright uppercase drop-shadow-[0_1px_6px_rgba(0,0,0,0.65)]">
            <span className="h-px w-8 bg-gold-bright" />
            Renovation &amp; Fit-Out &middot; Singapore
          </p>
          <h1 className="max-w-4xl animate-fade-up text-5xl leading-[1.02] font-semibold tracking-tight text-balance text-paper [animation-delay:120ms] font-heading md:text-7xl lg:text-8xl">
            We renovate spaces people{" "}
            <span className="text-gold-bright drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
              remember.
            </span>
          </h1>
          <p className="mt-8 max-w-xl animate-fade-up text-lg leading-relaxed text-paper/70 [animation-delay:240ms] md:text-xl">
            {site.name}
            {" "}
            delivers commercial fit-outs for brand teams and interior design firms across
            Singapore, backed by a proven track record in residential renovation — plus bespoke
            furniture and design support when you need it.
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
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {whyUsItems.map((item, i) => (
              <RevealOnScroll key={item.title} delay={i * 100}>
                <FeatureItem
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  tone="light"
                />
              </RevealOnScroll>
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
              title="Commercial fit-outs are our focus."
              description="We're built primarily around commercial and F&B fit-outs — restaurants, retail, and offices with hard opening-day deadlines — and bring that same rigour to residential renovation, where we've built a proven track record from HDB units to full landed homes."
            />
          </RevealOnScroll>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            <RevealOnScroll delay={80}>
              <ServiceCard
                href="/commercial"
                title="Commercial & F&B Fit-Outs"
                imageLabel="Commercial & F&B"
                images={commercialShowcase}
                description="Restaurants, cafes, retail, and offices — for landlords, brand teams, and design firms — built around licensing timelines and opening-day deadlines."
              />
            </RevealOnScroll>
            <RevealOnScroll delay={160}>
              <ServiceCard
                href="/residential"
                title="Residential Renovation"
                imageLabel="Residential"
                images={residentialShowcase}
                description="A proven track record across HDB, condo, and landed renovations — from space planning through custom carpentry and bespoke furniture to final handover."
              />
            </RevealOnScroll>
          </div>

          <p className="mt-14 text-sm font-semibold tracking-wide text-muted uppercase">
            We Also Offer
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {secondarySegments.map((item, i) => (
              <RevealOnScroll key={item.href} delay={i * 100}>
                <Link
                  href={item.href}
                  className="group flex items-start gap-4 border border-ink/10 p-6 transition-colors duration-300 hover:border-gold/40"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink/5 text-gold-deep">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-ink">{item.title}</h3>
                    <p className="mt-1 leading-relaxed text-muted">{item.description}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-deep">
                      Learn more
                      <ArrowUpRightIcon
                        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* Corporate clients — credibility signal, right after the segment picker */}
      <section className="py-20 md:py-24">
        <Container size="wide">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Trusted By"
              title="Brands and corporates who've built with us."
            />
          </RevealOnScroll>
          <RevealOnScroll delay={100} className="mt-12">
            <ClientLogoGrid />
          </RevealOnScroll>
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
                description={`What's below is our more recent, best-documented work — for most of our ${site.stats[0].value}+ years, word of mouth was all the marketing this business needed. We're only now growing beyond that to reach a wider audience, so don't hesitate to ask about the projects that came before.`}
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
            {featuredProjects.map((project, i) => {
              // Mobile shows a tighter, hand-picked set of 4; these two only
              // appear once the grid widens to 2+ columns.
              const desktopOnly = mobileOnlySlugs.every((slug) => slug !== project.slug);
              return (
                <RevealOnScroll
                  key={project.slug}
                  delay={(i % 3) * 100}
                  className={desktopOnly ? "hidden sm:block" : undefined}
                >
                  <ProjectCard project={project} />
                </RevealOnScroll>
              );
            })}
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
              a competitively priced quote.
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
