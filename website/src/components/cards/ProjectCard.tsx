import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { ProjectPlaceholder } from "@/components/cards/ProjectPlaceholder";
import type { Project } from "@/lib/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/portfolio/${project.slug}`} className="group flex flex-col gap-4">
      <div className="relative aspect-[4/5] overflow-hidden bg-ink-soft">
        {project.images.length > 0 ? (
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <ProjectPlaceholder project={project} size="card" />
        )}
        <span className="absolute top-4 left-4">
          <Badge tone="dark">{project.category === "commercial" ? "Commercial" : "Residential"}</Badge>
        </span>
      </div>
      <div>
        <h3 className="font-heading text-xl font-semibold text-ink transition-colors group-hover:text-gold-deep">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-muted">
          {project.location} &middot; {project.year}
        </p>
      </div>
    </Link>
  );
}
