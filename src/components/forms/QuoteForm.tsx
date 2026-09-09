"use client";

import { useState, type FormEvent } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";
import { whatsappHref } from "@/lib/data/site";

const budgetRanges = [
  "Under $20,000",
  "$20,000 – $50,000",
  "$50,000 – $100,000",
  "$100,000 – $250,000",
  "Above $250,000",
];

const timelines = [
  "As soon as possible",
  "Within 1–3 months",
  "3–6 months",
  "Just exploring for now",
];

const inputClass =
  "w-full rounded-lg border border-ink/15 bg-paper px-4 py-3 text-ink placeholder:text-muted/60 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

const fileInputClass =
  "w-full rounded-lg border border-ink/15 bg-paper px-4 py-3 text-sm text-muted transition-colors file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-gold file:px-4 file:py-2 file:text-sm file:font-semibold file:text-ink file:transition-colors hover:file:bg-gold-bright focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

const MAX_ATTACHMENTS_BYTES = 8 * 1024 * 1024;

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [projectType, setProjectType] = useState("");
  const isFurniture = projectType === "furniture";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    const formData = new FormData(event.currentTarget);

    const files = formData
      .getAll("referenceFiles")
      .filter((entry): entry is File => entry instanceof File && entry.size > 0);
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > MAX_ATTACHMENTS_BYTES) {
      setSubmitError("Your attached files are too large — please keep the total under 8MB.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/enquiry", { method: "POST", body: formData });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Something went wrong.");
      }
      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 border border-ink/10 bg-paper-dim px-8 py-16 text-center">
        <CheckCircleIcon className="h-12 w-12 text-gold-deep" aria-hidden="true" />
        <h3 className="font-heading text-2xl font-semibold text-ink">Enquiry received</h3>
        <p className="max-w-sm text-muted">
          Thank you — a member of our team will get back to you within one business day. For
          anything urgent, reach us directly on WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label htmlFor="company">Leave this field empty</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <Field label="Full Name" htmlFor="name">
        <input id="name" name="name" type="text" required autoComplete="name" className={inputClass} />
      </Field>
      <Field label="Phone Number" htmlFor="phone">
        <input id="phone" name="phone" type="tel" required autoComplete="tel" className={inputClass} />
      </Field>
      <Field label="Email" htmlFor="email" className="sm:col-span-2">
        <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
      </Field>
      <Field label="Project Type" htmlFor="projectType">
        <select
          id="projectType"
          name="projectType"
          required
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
          className={inputClass}
        >
          <option value="" disabled>
            Select one
          </option>
          <option value="commercial">Commercial / F&amp;B Fit-Out</option>
          <option value="residential">Residential Renovation</option>
          <option value="id-partnership">Interior Design Firm Partnership</option>
          <option value="furniture">Bespoke Furniture</option>
        </select>
      </Field>
      <Field label="Estimated Budget" htmlFor="budget">
        {isFurniture ? (
          <input
            id="budget"
            name="budget"
            type="text"
            required
            placeholder="e.g. $3,000 – $6,000"
            className={inputClass}
          />
        ) : (
          <select id="budget" name="budget" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select a range
            </option>
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        )}
      </Field>
      <Field label="Timeline" htmlFor="timeline" className="sm:col-span-2">
        <select id="timeline" name="timeline" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            When are you looking to start?
          </option>
          {timelines.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Tell us about your project" htmlFor="message" className="sm:col-span-2">
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={inputClass}
          placeholder={
            isFurniture
              ? "What you'd like made (e.g. dining table, wardrobe, TV console), materials and finishes you have in mind, and dimensions if you know them…"
              : "Space type, size, what you're hoping to achieve…"
          }
        />
      </Field>
      {isFurniture && (
        <Field
          label="Reference Photos, Renders or Dimensions (optional)"
          htmlFor="referenceFiles"
          className="sm:col-span-2"
        >
          <input
            id="referenceFiles"
            name="referenceFiles"
            type="file"
            multiple
            accept="image/*,.pdf"
            className={fileInputClass}
          />
          <p className="mt-2 text-sm text-muted">
            Photos of pieces you like, or any renders and measured drawings you already have,
            help us quote accurately.
          </p>
        </Field>
      )}
      {submitError && (
        <div className="sm:col-span-2">
          <p className="text-sm text-destructive" role="alert">
            {submitError} Need it urgent?{" "}
            <a href={whatsappHref} className="underline">
              Message us on WhatsApp
            </a>
            .
          </p>
        </div>
      )}
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={submitting}>
          {submitting ? "Sending…" : "Send Enquiry"}
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
