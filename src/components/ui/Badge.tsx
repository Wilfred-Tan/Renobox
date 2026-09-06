import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark" | "gold";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide",
        tone === "light" && "border-ink/15 text-ink/70",
        tone === "dark" && "border-paper/20 text-paper/80",
        tone === "gold" && "border-gold/40 bg-gold/10 text-gold-deep",
        className,
      )}
    >
      {children}
    </span>
  );
}
