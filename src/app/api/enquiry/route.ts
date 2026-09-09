import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/data/site";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS =
  process.env.RESEND_FROM_ADDRESS || "Reno Box <onboarding@resend.dev>";
const NOTIFICATION_BCC = "wilfredtanwy@gmail.com";
const MAX_ATTACHMENTS_BYTES = 8 * 1024 * 1024;

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

export async function POST(request: Request) {
  const formData = await request.formData();

  // Honeypot: real users never see or fill this field. Bots that
  // autofill every field will fill it, so pretend success and drop it.
  const honeypot = formData.get("company");
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

  const html = `
    <h2>New enquiry from renobox.sg</h2>
    <p><strong>${FIELD_LABELS.name}:</strong> ${escapeHtml(values.name)}</p>
    <p><strong>${FIELD_LABELS.phone}:</strong> ${escapeHtml(values.phone)}</p>
    <p><strong>${FIELD_LABELS.email}:</strong> ${escapeHtml(values.email)}</p>
    <p><strong>${FIELD_LABELS.projectType}:</strong> ${escapeHtml(values.projectType)}</p>
    <p><strong>${FIELD_LABELS.budget}:</strong> ${escapeHtml(values.budget)}</p>
    <p><strong>${FIELD_LABELS.timeline}:</strong> ${escapeHtml(values.timeline)}</p>
    <p><strong>${FIELD_LABELS.message}:</strong></p>
    <p>${escapeHtml(values.message).replace(/\n/g, "<br />")}</p>
  `;

  const { data, error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: site.email,
    bcc: NOTIFICATION_BCC,
    replyTo: values.email,
    subject: `New enquiry — ${values.projectType} — ${values.name}`,
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
