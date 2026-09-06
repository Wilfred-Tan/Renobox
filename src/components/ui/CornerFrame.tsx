import { cn } from "@/lib/utils";

export function CornerFrame({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none", className)} aria-hidden="true">
      <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="none">
        <path d="M0 20 V2 H18" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M82 2 H100 V20" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M100 80 V98 H82" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M18 98 H0 V80" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
