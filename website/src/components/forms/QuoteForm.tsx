"use client";

import { useState, type FormEvent } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";

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

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // No backend is wired up yet — connect this to a Route Handler
    // (e.g. src/app/api/enquiry/route.ts) plus an email service such as
    // Resend before launch, then replace this simulated success state.
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
      <Field label="Estimated Budget" htmlFor="budget">
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
          placeholder="Space type, size, what you're hoping to achieve…"
        />
      </Field>
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
