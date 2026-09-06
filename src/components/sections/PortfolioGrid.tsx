"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { cn } from "@/lib/utils";
import type { Project, ProjectCategory } from "@/lib/data/projects";

const filters: { label: string; value: ProjectCategory | "all" }[] = [
  { label: "All Projects", value: "all" },
  { label: "Commercial & F&B", value: "commercial" },
  { label: "Residential", value: "residential" },
];

export function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<ProjectCategory | "all">("all");
  const visible = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            role="tab"
            aria-selected={active === filter.value}
            onClick={() => setActive(filter.value)}
            className={cn(
              "cursor-pointer rounded-full border px-5 py-2.5 text-sm font-medium transition-colors",
              active === filter.value
                ? "border-ink bg-ink text-paper"
                : "border-ink/15 text-ink/70 hover:border-ink/40",
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-12 text-muted">No projects in this category yet.</p>
      )}
    </div>
  );
}
