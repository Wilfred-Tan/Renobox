"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 5000;

export function ServiceSlideshow({
  images,
  label,
  priority = false,
}: {
  images: string[];
  label: string;
  priority?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const startTimer = () => {
    clearTimer();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, AUTOPLAY_MS);
  };

  useEffect(() => {
    startTimer();
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  const go = (direction: "prev" | "next") => {
    setIndex((i) => (direction === "next" ? (i + 1) % images.length : (i - 1 + images.length) % images.length));
    startTimer();
  };

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={clearTimer}
      onMouseLeave={startTimer}
    >
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`${label} — photo ${i + 1} of ${images.length}`}
          fill
          priority={priority && i === 0}
          sizes="(min-width: 768px) 50vw, 100vw"
          className={cn(
            "object-cover transition-opacity duration-700 ease-out",
            i === index ? "opacity-100" : "opacity-0",
          )}
        />
      ))}

      {images.length > 1 && (
        <>
          <div className="absolute right-4 bottom-4 z-10 flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                go("prev");
              }}
              aria-label="Previous photo"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-ink/50 text-paper backdrop-blur-sm transition-colors hover:bg-ink/70"
            >
              <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                go("next");
              }}
              aria-label="Next photo"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-ink/50 text-paper backdrop-blur-sm transition-colors hover:bg-ink/70"
            >
              <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5">
            {images.map((src, i) => (
              <span
                key={src}
                className={cn(
                  "h-1.5 rounded-full bg-paper transition-all duration-300",
                  i === index ? "w-5 opacity-100" : "w-1.5 opacity-50",
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
