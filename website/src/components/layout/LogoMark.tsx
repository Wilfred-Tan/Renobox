import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 112 112"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <rect x="8" y="8" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="8" />
      <rect x="40" y="40" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="8" />
    </svg>
  );
}
