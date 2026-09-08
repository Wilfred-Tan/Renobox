# QuoteForm Email Delivery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `QuoteForm` actually deliver enquiries by email via Resend, instead of simulating success.

**Architecture:** A new Next.js Route Handler (`src/app/api/enquiry/route.ts`) receives the form as `multipart/form-data`, validates it server-side, checks a honeypot field, and sends one email via Resend to `william@renobox.com.sg` (BCC `wilfredtanwy@gmail.com`) with any uploaded reference files as attachments. `QuoteForm.tsx` is updated to `fetch` this endpoint instead of faking a timeout, and to show a real error state on failure.

**Tech Stack:** Next.js 16 App Router Route Handlers, the `resend` npm package, React (client component) `FormData`/`fetch`.

## Global Constraints

- No test suite exists in this project — verification is via `npm run build` (must keep the `--webpack` flag), `npx tsc --noEmit`, `npm run lint`, and manual `curl`/browser checks. (Source: `CLAUDE.md`)
- Colors must use the project's semantic tokens (`ink`, `paper`, `muted`, `gold`, `destructive`, etc.) — never raw hex or arbitrary Tailwind palette colors. (Source: `CLAUDE.md`; `text-destructive` is the existing token for form errors, already used in `src/components/forms/ReviewForm.tsx:202`.)
- Recipient: `to` = `william@renobox.com.sg` (from `site.email` in `src/lib/data/site.ts`), `bcc` = `wilfredtanwy@gmail.com`. (Source: spec)
- Attachment cap: 8MB combined, enforced both client- and server-side. (Source: spec)
- Honeypot field name `company`, hidden from real users, silently drops the submission while still returning success. (Source: spec)
- No confirmation email to the customer, no CAPTCHA — out of scope for this plan. (Source: spec)
- Resend Node SDK uses camelCase parameters: `replyTo`, `bcc` accept `string | string[]`; `attachments` is `{ filename, content: base64string }[]`; total attachments must stay under Resend's 40MB per-email ceiling (our 8MB raw cap leaves ample margin after base64 inflation). (Source: Resend docs, verified via Context7 `/llmstxt/resend_llms_txt` and `/resend/resend-examples`)

---

### Task 1: Enquiry API route handler

**Files:**
- Create: `src/app/api/enquiry/route.ts`
- Create: `.env.example`
- Modify: `package.json`, `package-lock.json` (via `npm install`)

**Interfaces:**
- Produces: `POST /api/enquiry` — accepts `multipart/form-data` with fields `name`, `phone`, `email`, `projectType`, `budget`, `timeline`, `message` (all required strings), `company` (honeypot, must stay empty), and zero or more `referenceFiles` file entries.
  - Success: `200 { success: true, id?: string }`
  - Validation failure: `400 { error: string }`
  - Honeypot tripped: `200 { success: true }` (email not actually sent)
  - Resend/send failure: `502 { error: string }`
- Consumes: `site.email` from `src/lib/data/site.ts` (already exists — no changes needed there).

- [ ] **Step 1: Install the Resend SDK**

Run: `npm install resend`

Expected: `resend` added to `dependencies` in `package.json` and `package-lock.json` updated. No errors.

- [ ] **Step 2: Add environment variable documentation**

Create `.env.example`:

```
# Get this from https://resend.com/api-keys after creating a Resend account
# and verifying renobox.sg as a sending domain.
RESEND_API_KEY=re_your_api_key_here

# Optional. Defaults to Resend's shared onboarding sender if unset — use that
# default until the renobox.sg domain is verified in Resend, then switch this
# to a verified address such as "Reno Box <enquiries@renobox.sg>".
RESEND_FROM_ADDRESS=Reno Box <onboarding@resend.dev>
```

Create a local `.env.local` (this file is gitignored — see `.gitignore:11-13` — so it will never be committed) with the same two variables, using a placeholder value for `RESEND_API_KEY` for now:

```
RESEND_API_KEY=re_placeholder_replace_with_real_key
RESEND_FROM_ADDRESS=Reno Box <onboarding@resend.dev>
```

- [ ] **Step 3: Start the dev server and confirm the route doesn't exist yet**

Run: `npm run dev` (leave running in the background)

Then: `curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:3000/api/enquiry`

Expected: `404` (route not created yet).

- [ ] **Step 4: Write the route handler**

Create `src/app/api/enquiry/route.ts`:

```ts
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
```

- [ ] **Step 5: Verify validation — missing required field**

Run:

```bash
curl -s -w "\nHTTP %{http_code}\n" -X POST http://localhost:3000/api/enquiry \
  -F "phone=+6591234567" \
  -F "email=test@example.com" \
  -F "projectType=residential" \
  -F "budget=Under \$20,000" \
  -F "timeline=As soon as possible" \
  -F "message=Test enquiry"
```

Expected: `{"error":"Full Name is required."}` followed by `HTTP 400`.

- [ ] **Step 6: Verify the honeypot path**

Run:

```bash
curl -s -w "\nHTTP %{http_code}\n" -X POST http://localhost:3000/api/enquiry \
  -F "name=Bot" -F "phone=123" -F "email=bot@example.com" \
  -F "projectType=residential" -F "budget=Under \$20,000" \
  -F "timeline=As soon as possible" -F "message=spam" \
  -F "company=I am a bot"
```

Expected: `{"success":true}` followed by `HTTP 200`. Check the terminal running `npm run dev` — there should be **no** Resend request logged/attempted for this call.

- [ ] **Step 7: Verify a valid submission reaches Resend**

Run:

```bash
curl -s -w "\nHTTP %{http_code}\n" -X POST http://localhost:3000/api/enquiry \
  -F "name=Test User" -F "phone=+6591234567" -F "email=test@example.com" \
  -F "projectType=residential" -F "budget=Under \$20,000" \
  -F "timeline=As soon as possible" -F "message=Test enquiry"
```

Expected right now (placeholder API key in `.env.local`): `HTTP 502` with `{"error":"Failed to send enquiry. Please try again or contact us directly."}` — this confirms validation passed and the request reached Resend's API, which then rejected the placeholder key. This is the correct result until a real `RESEND_API_KEY` is added (see Task 3).

- [ ] **Step 8: Verify the server-side attachment size cap**

Create a 9MB dummy file and submit it as an attachment:

```bash
head -c 9000000 /dev/urandom > /tmp/big.bin
curl -s -w "\nHTTP %{http_code}\n" -X POST http://localhost:3000/api/enquiry \
  -F "name=Test User" -F "phone=+6591234567" -F "email=test@example.com" \
  -F "projectType=furniture" -F "budget=e.g. \$3,000" \
  -F "timeline=As soon as possible" -F "message=Test enquiry" \
  -F "referenceFiles=@/tmp/big.bin"
```

Expected: `{"error":"Attachments are too large — please keep the total under 8MB."}` followed by `HTTP 400`.

- [ ] **Step 9: Type-check and lint**

Run: `npx tsc --noEmit && npm run lint`

Expected: no errors.

- [ ] **Step 10: Commit**

```bash
git add package.json package-lock.json .env.example src/app/api/enquiry/route.ts
git commit -m "$(cat <<'EOF'
Add /api/enquiry route handler to send QuoteForm submissions via Resend

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

(`.env.local` is gitignored and must NOT be committed — confirm with `git status` that it does not appear as staged/untracked-to-be-added.)

---

### Task 2: Wire QuoteForm to the new endpoint

**Files:**
- Modify: `src/components/forms/QuoteForm.tsx`

**Interfaces:**
- Consumes: `POST /api/enquiry` from Task 1 — request is `FormData` built directly from the `<form>` element (field names already match: `name`, `phone`, `email`, `projectType`, `budget`, `timeline`, `message`, `referenceFiles`), response is `{ success: true }` or `{ error: string }` per Task 1.
- Consumes: `whatsappHref` from `src/lib/data/site.ts` (already exported there).

- [ ] **Step 1: Add the error state and the honeypot field**

Modify `src/components/forms/QuoteForm.tsx`. Update the imports and add a constant near the top (after the existing `fileInputClass` constant, src/components/forms/QuoteForm.tsx:26):

```tsx
import { whatsappHref } from "@/lib/data/site";
```

```tsx
const MAX_ATTACHMENTS_BYTES = 8 * 1024 * 1024;
```

- [ ] **Step 2: Replace the simulated `handleSubmit` with a real submission**

Replace the current `handleSubmit` (src/components/forms/QuoteForm.tsx:34-44) and add `submitError` state (next to the existing `useState` calls at src/components/forms/QuoteForm.tsx:29-32):

```tsx
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
```

- [ ] **Step 3: Add the honeypot field and the error message to the form markup**

Modify the `<form>` opening (src/components/forms/QuoteForm.tsx:60) to add the hidden honeypot field as its first child:

```tsx
<form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
  <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
    <label htmlFor="company">Leave this field empty</label>
    <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
  </div>
```

Then, immediately before the final submit-button `<div>` (currently src/components/forms/QuoteForm.tsx:157-161), add the error message:

```tsx
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
```

- [ ] **Step 4: Type-check and lint**

Run: `npx tsc --noEmit && npm run lint`

Expected: no errors.

- [ ] **Step 5: Verify in the browser**

With `npm run dev` running, open `http://localhost:3000/contact` (or wherever `QuoteForm` is rendered — confirm with `grep -rn "QuoteForm" src/app` if unsure), fill in all required fields, and submit.

Expected (with the placeholder `RESEND_API_KEY` from Task 1 still in place): the button shows "Sending…", then an inline error appears above the button ("Failed to send enquiry...") with a working "Message us on WhatsApp" link — this is correct, since Resend will reject the placeholder key. This confirms the client correctly surfaces a real failure instead of always showing success.

Then, open the browser devtools, find the hidden `company` input, set its value to `"spam"`, and resubmit. Expected: the success panel ("Enquiry received") is shown, even though the honeypot dropped the email server-side — confirming the bot-facing behavior matches the design (bots see success, no email sent).

Finally, reload the page, select "Bespoke Furniture" as the project type (to reveal the file input), attach any file larger than 8MB, fill in the other required fields, and submit. Expected: the inline error ("Your attached files are too large...") appears immediately, the button never shows "Sending…", and no network request to `/api/enquiry` is made (check the Network tab) — confirming the client-side precheck short-circuits before hitting the server.

- [ ] **Step 6: Commit**

```bash
git add src/components/forms/QuoteForm.tsx
git commit -m "$(cat <<'EOF'
Wire QuoteForm to POST /api/enquiry with real error handling

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Real API key verification and documentation sync

**Files:**
- Modify: `.env.local` (not committed — gitignored)
- Modify: `CLAUDE.md`

**Interfaces:**
- None (this task closes out the feature — no new interfaces).

- [ ] **Step 1: Get a real Resend API key (manual, human step)**

This step cannot be performed by an agent — it requires creating a third-party account:
1. Go to https://resend.com and create an account (or log in if one already exists).
2. In the Resend dashboard, add `renobox.sg` as a domain and add the DNS records it provides wherever `renobox.sg`'s DNS is managed.
3. Once verified (can take up to a few hours for DNS propagation), generate an API key at https://resend.com/api-keys.
4. Update the local `.env.local` (created in Task 1) with the real key:

```
RESEND_API_KEY=<the real key>
RESEND_FROM_ADDRESS=Reno Box <enquiries@renobox.sg>
```

(Until domain verification completes, leave `RESEND_FROM_ADDRESS` unset or pointed at `onboarding@resend.dev` — sending from an unverified custom domain will fail.)

- [ ] **Step 2: Re-run the Task 1 curl check with the real key**

Restart the dev server (env vars are only read at process start: stop `npm run dev`, run it again), then re-run the Step 7 curl command from Task 1:

```bash
curl -s -w "\nHTTP %{http_code}\n" -X POST http://localhost:3000/api/enquiry \
  -F "name=Test User" -F "phone=+6591234567" -F "email=test@example.com" \
  -F "projectType=residential" -F "budget=Under \$20,000" \
  -F "timeline=As soon as possible" -F "message=Test enquiry"
```

Expected: `HTTP 200` with `{"success":true,"id":"..."}`, and the email actually arrives at `william@renobox.com.sg` and `wilfredtanwy@gmail.com`.

- [ ] **Step 3: Verify the furniture path with an attachment end-to-end**

In the browser, submit the form with "Bespoke Furniture" as the project type and attach a small image file. Confirm the notification email arrives with the image attached.

- [ ] **Step 4: Update CLAUDE.md to reflect the completed feature**

Modify the "Remaining placeholder content" section of `CLAUDE.md`. Replace this bullet:

```
- The `QuoteForm` (`src/components/forms/QuoteForm.tsx`) still has **no backend** — it simulates success with a timeout. Now that the site is live, this is the main functional gap: it needs a route handler (e.g. `src/app/api/enquiry/route.ts`) + an email service before real enquiries can actually reach anyone.
```

with:

```
- The `QuoteForm` (`src/components/forms/QuoteForm.tsx`) now sends real enquiries through `src/app/api/enquiry/route.ts` via Resend, to `william@renobox.com.sg` (BCC `wilfredtanwy@gmail.com`). Requires `RESEND_API_KEY` (and, once the `renobox.sg` sending domain is verified in Resend, `RESEND_FROM_ADDRESS`) set in the environment — see `.env.example`. The `ReviewForm` (`src/components/forms/ReviewForm.tsx`) still only simulates success and has the same gap.
```

- [ ] **Step 5: Set the production environment variable**

In GoDaddy's Node.js Hosting dashboard for this site, add `RESEND_API_KEY` (and `RESEND_FROM_ADDRESS` once verified) as environment variables, then trigger a redeploy so the running server picks them up.

- [ ] **Step 6: Final full verification gate**

Run: `npm run build && npx tsc --noEmit && npm run lint`

Expected: all three succeed with no errors (build must use the `--webpack` flag already configured in `package.json` — do not change it).

- [ ] **Step 7: Commit the documentation update**

```bash
git add CLAUDE.md
git commit -m "$(cat <<'EOF'
Document QuoteForm's new Resend-backed enquiry delivery

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```
