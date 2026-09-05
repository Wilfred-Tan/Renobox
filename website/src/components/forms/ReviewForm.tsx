"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  CheckCircleIcon,
  StarIcon as StarIconOutline,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-lg border border-ink/15 bg-paper px-4 py-3 text-ink placeholder:text-muted/60 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

const MAX_PHOTOS = 6;
const MAX_PHOTO_MB = 8;

export function ReviewForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Derived from `photos`, not synced state — createObjectURL is cheap and
  // idempotent-enough here given the small MAX_PHOTOS cap; only the cleanup
  // (revoking) needs to be an effect.
  const photoPreviews = useMemo(() => photos.map((file) => URL.createObjectURL(file)), [photos]);
  useEffect(() => {
    return () => {
      photoPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [photoPreviews]);

  function addPhotos(files: FileList | null) {
    if (!files || files.length === 0) return;
    setPhotoError(null);

    const incoming = Array.from(files);
    const oversized = incoming.some((f) => f.size > MAX_PHOTO_MB * 1024 * 1024);
    if (oversized) {
      setPhotoError(`Each photo must be under ${MAX_PHOTO_MB}MB.`);
    }

    setPhotos((current) => {
      const combined = [...current, ...incoming.filter((f) => f.size <= MAX_PHOTO_MB * 1024 * 1024)];
      if (combined.length > MAX_PHOTOS) {
        setPhotoError(`Up to ${MAX_PHOTOS} photos — the rest weren't added.`);
      }
      return combined.slice(0, MAX_PHOTOS);
    });
  }

  function handlePhotoInput(event: ChangeEvent<HTMLInputElement>) {
    addPhotos(event.target.files);
    event.target.value = "";
  }

  function removePhoto(index: number) {
    setPhotos((current) => current.filter((_, i) => i !== index));
    setPhotoError(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // No backend is wired up yet — connect this to a Route Handler
    // (e.g. src/app/api/reviews/route.ts) plus an email/database service
    // before launch. Submissions (including attached photos, which need
    // uploading to storage — e.g. S3 or Vercel Blob — not just emailed as
    // attachments) must land somewhere our team can read them and manually
    // approve before they're added to src/lib/data/testimonials.ts — there
    // is no auto-publish path, by design.
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 border border-ink/10 bg-paper-dim px-8 py-16 text-center">
        <CheckCircleIcon className="h-12 w-12 text-gold-deep" aria-hidden="true" />
        <h3 className="font-heading text-2xl font-semibold text-ink">Review received</h3>
        <p className="max-w-sm text-muted">
          Thank you for taking the time. Our team reads every submission and approves it before
          it&apos;s published, so this won&apos;t appear on the site immediately.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <p className="text-sm text-muted sm:col-span-2">
        Submissions are reviewed by our team before publishing — we don&apos;t auto-post anything.
      </p>
      <Field label="Full Name" htmlFor="name">
        <input id="name" name="name" type="text" required autoComplete="name" className={inputClass} />
      </Field>
      <Field label="Email" htmlFor="email">
        <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
        <p className="mt-1.5 text-xs text-muted/70">
          For us to verify the project — never published alongside your review.
        </p>
      </Field>
      <Field label="Project Type" htmlFor="projectType">
        <select id="projectType" name="projectType" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Select one
          </option>
          <option value="commercial">Commercial / F&amp;B Fit-Out</option>
          <option value="residential">Residential Renovation</option>
          <option value="id-partnership">Interior Design Firm Partnership</option>
          <option value="furniture">Bespoke Furniture</option>
        </select>
      </Field>
      <Field label="Rating" htmlFor="rating-1">
        <div className="flex h-[calc(2.75rem+2px)] items-center gap-1" onMouseLeave={() => setHoverRating(0)}>
          {[1, 2, 3, 4, 5].map((value) => {
            const filled = value <= (hoverRating || rating);
            const StarIcon = filled ? StarIconSolid : StarIconOutline;
            return (
              <button
                key={value}
                id={value === 1 ? "rating-1" : undefined}
                type="button"
                onClick={() => setRating(value)}
                onMouseEnter={() => setHoverRating(value)}
                aria-label={`${value} star${value > 1 ? "s" : ""}`}
                aria-pressed={rating === value}
                className={cn(
                  "cursor-pointer transition-colors",
                  filled ? "text-gold" : "text-ink/20 hover:text-gold/60",
                )}
              >
                <StarIcon className="h-7 w-7" aria-hidden="true" />
              </button>
            );
          })}
          <input type="hidden" name="rating" value={rating} required />
        </div>
      </Field>
      <Field label="Your Review" htmlFor="message" className="sm:col-span-2">
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={inputClass}
          placeholder="What was the project, and how did it go?"
        />
      </Field>
      <Field label="Photos (optional)" htmlFor="photos" className="sm:col-span-2">
        <input
          ref={fileInputRef}
          id="photos"
          name="photos"
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoInput}
          className="sr-only"
        />
        <div className="flex flex-wrap gap-3">
          {photos.map((photo, i) => (
            <div key={`${photo.name}-${photo.lastModified}`} className="group relative h-20 w-20 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element -- transient blob: preview, next/image can't optimize it */}
              <img
                src={photoPreviews[i]}
                alt={`Selected photo ${i + 1}`}
                className="h-full w-full rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={() => removePhoto(i)}
                aria-label={`Remove photo ${i + 1}`}
                className="absolute -top-2 -right-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-ink text-paper transition-colors hover:bg-destructive"
              >
                <XMarkIcon className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          ))}
          {photos.length < MAX_PHOTOS && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-20 w-20 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-ink/25 text-muted transition-colors hover:border-gold hover:text-gold-deep"
            >
              <PhotoIcon className="h-6 w-6" aria-hidden="true" />
              <span className="text-[11px] font-medium">Add</span>
            </button>
          )}
        </div>
        <p className="mt-1.5 text-xs text-muted/70">
          Up to {MAX_PHOTOS} photos, {MAX_PHOTO_MB}MB each.
        </p>
        {photoError && <p className="mt-1.5 text-xs text-destructive">{photoError}</p>}
      </Field>
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={submitting || rating === 0}>
          {submitting ? "Sending…" : "Submit Review"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
    </div>
  );
}
