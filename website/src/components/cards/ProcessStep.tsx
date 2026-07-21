import { cn } from "@/lib/utils";

export function ProcessStep({
  index,
  title,
  description,
  tone = "dark",
}: {
  index: number;
  title: string;
  description: string;
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-t pt-6",
        tone === "dark" ? "border-ink/10" : "border-paper/15",
      )}
    >
      <span className="font-heading text-sm font-semibold text-gold-deep">
        {String(index).padStart(2, "0")}
      </span>
      <h3 className={cn("font-heading text-xl font-semibold", tone === "dark" ? "text-ink" : "text-paper")}>
        {title}
      </h3>
      <p className={cn("leading-relaxed", tone === "dark" ? "text-muted" : "text-paper/60")}>
        {description}
      </p>
    </div>
  );
}
