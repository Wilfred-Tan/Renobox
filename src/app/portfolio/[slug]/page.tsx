import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { isLandscape } from "@/lib/data/image-sizes";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ProjectPlaceholder } from "@/components/cards/ProjectPlaceholder";
import { projects, getProjectBySlug } from "@/lib/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = projects
    .filter((p) => p.category === project.category && p.slug !== project.slug)
    .slice(0, 3);

  return (
    <>
      <section className="relative flex min-h-[70dvh] items-end overflow-hidden bg-ink">
        {project.images.length > 0 ? (
          <Image
            src={project.images[0]}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <ProjectPlaceholder project={project} size="hero" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
        <Container size="wide" className="relative z-10 pt-40 pb-16 md:pt-44 md:pb-20">
          <Link
            href="/portfolio"
            className="mb-6 inline-flex animate-fade-up items-center gap-2 text-sm font-medium text-paper/60 hover:text-gold-bright"
          >
            ← Back to Portfolio
          </Link>
          <div className="flex animate-fade-up flex-wrap items-center gap-3 [animation-delay:80ms]">
            <Badge tone="dark">{project.category === "commercial" ? "Commercial" : "Residential"}</Badge>
            <Badge tone="dark">{project.type}</Badge>
          </div>
          <h1 className="mt-6 max-w-3xl animate-fade-up text-4xl leading-[1.05] font-semibold tracking-tight text-balance text-paper [animation-delay:160ms] font-heading md:text-6xl">
            {project.title}
          </h1>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr]">
            <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
              <dl className="grid grid-cols-2 gap-6 border-t border-ink/10 pt-6">
                <div>
                  <dt className="text-xs font-semibold tracking-wide text-muted uppercase">Location</dt>
                  <dd className="mt-1 font-heading text-lg text-ink">{project.location}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-wide text-muted uppercase">Year</dt>
                  <dd className="mt-1 font-heading text-lg text-ink">{project.year}</dd>
                </div>
                {project.duration && (
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-muted uppercase">Duration</dt>
                    <dd className="mt-1 font-heading text-lg text-ink">{project.duration}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs font-semibold tracking-wide text-muted uppercase">Scope</dt>
                  <dd className="mt-1 font-heading text-lg text-ink">{project.type}</dd>
                </div>
              </dl>
              <Button href="/contact" size="lg">
                Start a Similar Project
              </Button>
            </div>

            <div className="flex flex-col gap-6">
              <p className="text-xl leading-relaxed text-ink">{project.summary}</p>
              {project.description.map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}

              {project.images.length > 1 && (
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {project.images.slice(1).map((src, i) => {
                    // Landscape photos get the full width of the grid at a 3:2
                    // tile; portrait photos pair up two-to-a-row from sm: up.
                    // Below sm:, everything stacks in one column so a lone
                    // portrait photo never leaves an empty cell beside it.
                    const wide = isLandscape(src);
                    return (
                      <div
                        key={src}
                        className={
                          wide
                            ? "relative aspect-[3/2] overflow-hidden bg-ink-soft sm:col-span-2"
                            : "relative aspect-[4/5] overflow-hidden bg-ink-soft"
                        }
                      >
                        <Image
                          src={src}
                          alt={`${project.title} — photo ${i + 2}`}
                          fill
                          // A wide photo in the 3:2 tile is covered by HEIGHT, so it
                          // needs ~(its aspect / 1.5) more width than the tile itself.
                          sizes={
                            wide
                              ? "(min-width: 1024px) 65vw, 100vw"
                              : "(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
                          }
                          className="object-cover"
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              {project.testimonial && (
                <figure className="mt-6 border-l-2 border-gold pl-6">
                  <blockquote className="font-heading text-2xl leading-snug text-ink">
                    &ldquo;{project.testimonial.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 text-sm text-muted">
                    {project.testimonial.name} — {project.testimonial.role}
                  </figcaption>
                </figure>
              )}
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-paper-dim py-24 md:py-32">
          <Container size="wide">
            <SectionHeading eyebrow="Related Work" title="More projects like this." />
            <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
