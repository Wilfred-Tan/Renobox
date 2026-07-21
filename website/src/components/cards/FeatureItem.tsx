import { cn } from "@/lib/utils";

export function FeatureItem({
  icon: Icon,
  title,
  description,
  tone = "dark",
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  tone?: "dark" | "light";
}) {
  return (
    <div className="flex flex-col gap-4">
      <span
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full",
          tone === "dark" ? "bg-ink/5 text-gold-deep" : "bg-paper/10 text-gold-bright",
        )}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3
        className={cn(
          "font-heading text-lg font-semibold",
          tone === "dark" ? "text-ink" : "text-paper",
        )}
      >
        {title}
      </h3>
      <p className={cn("leading-relaxed", tone === "dark" ? "text-muted" : "text-paper/60")}>
        {description}
      </p>
    </div>
  );
}
