import { useId } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export function PlaceholderImage({
  label,
  aspect = "aspect-[4/3]",
  className,
}: {
  label: string;
  aspect?: string;
  className?: string;
}) {
  const gridId = useId();

  return (
    <div
      className={cn(
        "relative isolate flex items-end overflow-hidden bg-gradient-to-br from-ink-soft via-ink to-ink-elevated",
        aspect,
        className,
      )}
    >
      <svg className="absolute inset-0 h-full w-full opacity-[0.08]" aria-hidden="true">
        <defs>
          <pattern id={gridId} width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${gridId})`} className="text-paper" />
      </svg>
      <PhotoIcon
        className="absolute top-1/2 left-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 text-paper/15"
        aria-hidden="true"
      />
      <span className="relative z-10 m-4 rounded-full border border-paper/20 bg-ink/40 px-3 py-1 text-[11px] font-medium tracking-wide text-paper/70 uppercase backdrop-blur-sm">
        {label}
      </span>
    </div>
  );
}
