import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em]",
            tone === "dark" ? "text-gold-deep" : "text-gold-bright",
            align === "center" && "justify-center",
          )}
        >
          <span className={cn("h-px w-8 bg-gold", align === "center" && "hidden")} />
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-balance font-heading text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl",
          tone === "dark" ? "text-ink" : "text-paper",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            tone === "dark" ? "text-muted" : "text-paper/70",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
