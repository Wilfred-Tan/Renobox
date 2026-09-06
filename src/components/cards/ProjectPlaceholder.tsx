import { LogoMark } from "@/components/layout/LogoMark";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/data/projects";

/** Fills the image slot for a finished project with no presentable photos. */
export function ProjectPlaceholder({
  project,
  size = "card",
  className,
}: {
  project: Pick<Project, "location" | "type">;
  size?: "card" | "hero";
  className?: string;
}) {
  const isHero = size === "hero";

  // The hero already renders the project's title, type, and category as real
  // text bottom-left (see portfolio/[slug]/page.tsx), so repeating location/type
  // centered here would both duplicate it and visually collide with it. The hero
  // variant is background texture only, plus a small badge tucked in a corner
  // that never competes with the bottom-aligned title.
  if (isHero) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 overflow-hidden bg-gradient-to-br from-ink-soft via-ink to-ink-elevated",
          className,
        )}
      >
        <LogoMark className="absolute inset-0 m-auto h-[75%] w-[75%] text-gold/5" />
        <span className="absolute top-24 right-6 md:top-28 md:right-10">
          <Badge tone="dark">Photography Unavailable</Badge>
        </span>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 flex items-center justify-center overflow-hidden",
        "bg-gradient-to-br from-ink-soft via-ink to-ink-elevated",
        className,
      )}
    >
      <LogoMark className="absolute inset-0 m-auto h-[60%] w-[60%] text-gold/5" />
      <div className="relative flex max-w-xs flex-col items-center gap-3 px-6 text-center text-balance">
        <LogoMark className="h-7 w-7 text-gold-bright/70" />
        <div className="h-px w-8 bg-gold-bright/25" />
        <p className="font-heading text-base text-paper">{project.location}</p>
        <p className="text-[10px] text-paper/45 uppercase tracking-[0.18em]">{project.type}</p>
      </div>
    </div>
  );
}
