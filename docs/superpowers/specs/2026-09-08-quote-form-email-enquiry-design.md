# QuoteForm Email Delivery — Design

## Problem

`QuoteForm` ([src/components/forms/QuoteForm.tsx](../../../src/components/forms/QuoteForm.tsx)) simulates a successful submission with a `setTimeout` and never actually sends the enquiry anywhere. Now that the site is live, this is the main functional gap: real customer enquiries submitted through the form are silently discarded.

## Goals

- Enquiries submitted through `QuoteForm` are delivered as an email notification, including any reference files uploaded on the bespoke-furniture path.
- The team notification lands at `william@renobox.com.sg`, with a BCC to `wilfredtanwy@gmail.com`.
- Server-side validation guards against malformed/incomplete submissions regardless of client-side `required` attributes.
- The form gives honest feedback on failure instead of always showing the success state.
- Basic spam mitigation with no added friction for real users.

## Non-goals (deferred)

- No confirmation/auto-reply email to the customer (the existing on-screen "Enquiry received" message covers that for v1).
- No CAPTCHA or third-party bot-detection.
- No persistence layer (database/CRM) — email is the only delivery channel for v1.

## Architecture

**New route handler**: `src/app/api/enquiry/route.ts`, `POST` only.

- Accepts `multipart/form-data` (required because of the optional file upload — a JSON body can't carry files).
- Parses the incoming `FormData`, validates required fields server-side: `name`, `phone`, `email`, `projectType`, `budget`, `timeline`, `message`. Missing/empty required field → `400` with a JSON error body.
- Honeypot check: a hidden `company` field that real users never see or fill. If it arrives non-empty, respond `200` (so the bot's client sees "success" and doesn't retry) but skip sending the email entirely.
- Reads any uploaded files (`referenceFiles`) into buffers for attachment. Enforces a combined size cap of 8MB across all attachments — files exceeding this are rejected with a `400` (this is also checked client-side before submit, so the common case never reaches the server).
- Sends one email via Resend (`resend.emails.send()`):
  - `to`: `william@renobox.com.sg`
  - `bcc`: `wilfredtanwy@gmail.com`
  - `from`: a `renobox.sg` address (e.g. `enquiries@renobox.sg`) once the domain is verified in Resend; falls back to Resend's shared `onboarding@resend.dev` sender until DNS verification is complete, via an environment variable so the switch doesn't require a code change.
  - `reply_to`: the customer's own submitted email, so replying from the inbox goes straight back to them.
  - `subject`: e.g. `New enquiry — {projectType} — {name}`.
  - `html`: a simple formatted summary of all submitted fields.
  - `attachments`: any uploaded reference files, base64-encoded per Resend's API shape.
- Returns `200` with `{ success: true }` on success, or a `4xx`/`5xx` with `{ error: string }` on failure (validation error vs. Resend API error are distinguished so the client can show an accurate message).

**Client changes**: `src/components/forms/QuoteForm.tsx`

- `handleSubmit` becomes `async`, builds a `FormData` from the form element via `new FormData(event.currentTarget)`, and `fetch`es `/api/enquiry`.
- Client-side pre-check: sum the sizes of any files in `referenceFiles` before submitting; if over 8MB, show an inline error immediately without hitting the network.
- New `submitError: string | null` state. On a non-2xx response or a network/fetch failure, set `submitError` to a user-facing message, re-enable the submit button (`setSubmitting(false)`), and do **not** show the success state.
- Error is displayed inline, above the submit button: *"Something went wrong — please try again, or reach us directly on WhatsApp."* with the existing WhatsApp link/number nearby.
- Add the hidden honeypot `company` input to the form markup (visually hidden via CSS, not `display:none`/`type=hidden`, so basic bots that skip hidden inputs still get caught — `sr-only`-style off-screen positioning with `tabIndex={-1}` and `autoComplete="off"`).
- Success path is unchanged (existing `submitted` state / "Enquiry received" panel).

## Data flow

1. User fills form, submits.
2. Client validates file size, builds `FormData`, `POST`s to `/api/enquiry`.
3. Route handler validates fields → honeypot check → builds attachments → calls Resend.
4. Resend delivers the email to `william@renobox.com.sg` (BCC `wilfredtanwy@gmail.com`).
5. Route handler responds; client shows success or inline error accordingly.

## Environment & deployment

- New dependency: `resend` (npm package).
- New environment variable: `RESEND_API_KEY`. Added to a new `.env.local` (gitignored) for local dev with a placeholder value and a comment explaining where to get a real key.
- New environment variable: `RESEND_FROM_ADDRESS` (defaults to `onboarding@resend.dev` if unset) so the sender can be flipped to a verified `renobox.sg` address later without a code change.
- Manual steps required from the site owner (outside this codebase, cannot be done by Claude Code):
  1. Create a Resend account.
  2. Add the DNS records Resend provides to verify `renobox.sg` as a sending domain.
  3. Generate an API key in Resend and set `RESEND_API_KEY` (and optionally `RESEND_FROM_ADDRESS` once verified) in GoDaddy's Node.js hosting environment-variables panel for production.
- Until domain verification completes, the feature works end-to-end using the shared `onboarding@resend.dev` sender.

## Error handling summary

| Failure | Behavior |
|---|---|
| Missing required field | `400` from route handler; client shows inline error |
| Attachment(s) over 8MB | Rejected client-side before submit; also re-checked server-side |
| Honeypot filled | `200` returned to client (looks like success), email not sent |
| Resend API error (bad key, network, etc.) | `502`-style response from route handler; client shows inline error, does not show success |

## Testing

No test suite exists in this project (per `CLAUDE.md`). Verification is manual:
- Submit the form in the local dev preview with a valid `RESEND_API_KEY` (or a test/sandbox key) and confirm the email arrives at both recipients.
- Submit with a required field blanked out via devtools (bypassing client `required`) and confirm the server rejects it.
- Submit the furniture path with an attached file and confirm it arrives as an email attachment.
- Submit with an oversized file and confirm the client-side check blocks it.
- Fill the honeypot field via devtools and confirm no email is sent but the client still shows success.
- Temporarily use an invalid API key and confirm the client shows the inline error state rather than a false success.
