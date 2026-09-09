import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/data/site";

export const runtime = "nodejs";

const FROM_ADDRESS =
  process.env.RESEND_FROM_ADDRESS || "Reno Box <onboarding@resend.dev>";
const NOTIFICATION_BCC = "wilfredtanwy@gmail.com";
const MAX_ATTACHMENTS_BYTES = 8 * 1024 * 1024;
// Headroom above the attachment cap for the rest of the multipart body
// (text fields, boundaries). Best-effort only — Content-Length can be
// absent on chunked requests, so this is defense-in-depth, not a hard limit.
const MAX_BODY_BYTES = 12 * 1024 * 1024;

const REQUIRED_FIELDS = [
  "name",
  "phone",
  "email",
  "projectType",
  "budget",
  "timeline",
  "message",
] as const;

const FIELD_LABELS: Record<(typeof REQUIRED_FIELDS)[number], string> = {
  name: "Full Name",
  phone: "Phone Number",
  email: "Email",
  projectType: "Project Type",
  budget: "Estimated Budget",
  timeline: "Timeline",
  message: "Message",
};

const PROJECT_TYPE_LABELS: Record<string, string> = {
  commercial: "Commercial / F&B Fit-Out",
  residential: "Residential Renovation",
  "id-partnership": "Interior Design Firm Partnership",
  furniture: "Bespoke Furniture",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "Attachments are too large — please keep the total under 8MB." },
      { status: 413 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Malformed submission." }, { status: 400 });
  }

  // Honeypot: real users never see or fill this field. Bots that
  // autofill every field will fill it, so pretend success and drop it.
  // Named to avoid common browser autofill heuristics — "company" gets
  // filled by Chromium's saved address-profile autofill for real users.
  const honeypot = formData.get("website_confirm");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  const values: Record<string, string> = {};
  for (const field of REQUIRED_FIELDS) {
    const value = formData.get(field);
    if (typeof value !== "string" || value.trim() === "") {
      return NextResponse.json(
        { error: `${FIELD_LABELS[field]} is required.` },
        { status: 400 },
      );
    }
    values[field] = value;
  }

  if (!EMAIL_PATTERN.test(values.email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const projectTypeLabel = PROJECT_TYPE_LABELS[values.projectType];
  if (!projectTypeLabel) {
    return NextResponse.json({ error: "Please select a valid project type." }, { status: 400 });
  }

  const files = formData
    .getAll("referenceFiles")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  if (totalSize > MAX_ATTACHMENTS_BYTES) {
    return NextResponse.json(
      { error: "Attachments are too large — please keep the total under 8MB." },
      { status: 400 },
    );
  }

  const attachments = await Promise.all(
    files.map(async (file) => ({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()).toString("base64"),
    })),
  );

  const safeName = values.name.replace(/[\r\n]+/g, " ");

  const html = `
    <h2>New enquiry from renobox.sg</h2>
    <p><strong>${FIELD_LABELS.name}:</strong> ${escapeHtml(values.name)}</p>
    <p><strong>${FIELD_LABELS.phone}:</strong> ${escapeHtml(values.phone)}</p>
    <p><strong>${FIELD_LABELS.email}:</strong> ${escapeHtml(values.email)}</p>
    <p><strong>${FIELD_LABELS.projectType}:</strong> ${escapeHtml(projectTypeLabel)}</p>
    <p><strong>${FIELD_LABELS.budget}:</strong> ${escapeHtml(values.budget)}</p>
    <p><strong>${FIELD_LABELS.timeline}:</strong> ${escapeHtml(values.timeline)}</p>
    <p><strong>${FIELD_LABELS.message}:</strong></p>
    <p>${escapeHtml(values.message).replace(/\n/g, "<br />")}</p>
  `;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set.");
    return NextResponse.json(
      { error: "Failed to send enquiry. Please try again or contact us directly." },
      { status: 502 },
    );
  }

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: site.email,
    bcc: NOTIFICATION_BCC,
    replyTo: values.email,
    subject: `New enquiry — ${projectTypeLabel} — ${safeName}`,
    html,
    attachments: attachments.length > 0 ? attachments : undefined,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send enquiry. Please try again or contact us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true, id: data?.id });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
