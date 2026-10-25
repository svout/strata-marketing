/**
 * POST /api/demo: receives the Request demo form (W5).
 *
 * Where requests go is still open, so delivery is a webhook you set:
 *   DEMO_FORM_WEBHOOK_URL=https://…   (Slack, Zapier, a CRM, your inbox relay)
 * The JSON body is forwarded as is.
 *
 * Without that variable:
 * - in development it answers 200 with { delivered: false } so the form
 *   and its success state can be tried locally;
 * - in production it answers 503, so a visitor is never told their
 *   request was sent when it went nowhere.
 *
 * Nothing personal is logged: only counts and status codes.
 */
import { demoForm } from "@/constraints/demo";

type DemoRequest = {
  name: string;
  company: string;
  email: string;
  useCase: string;
  message?: string;
  website?: string; // honeypot: real people leave it empty
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { name: 120, company: 160, email: 254, message: 2000 };

function validate(body: unknown): { ok: true; data: DemoRequest } | { ok: false; fields: string[] } {
  const b = (body ?? {}) as Record<string, unknown>;
  const str = (k: string) => (typeof b[k] === "string" ? (b[k] as string).trim() : "");
  const data: DemoRequest = {
    name: str("name"),
    company: str("company"),
    email: str("email"),
    useCase: str("useCase"),
    message: str("message"),
    website: str("website"),
  };
  const fields: string[] = [];
  if (!data.name || data.name.length > MAX.name) fields.push("name");
  if (!data.company || data.company.length > MAX.company) fields.push("company");
  if (!EMAIL.test(data.email) || data.email.length > MAX.email) fields.push("email");
  if (!demoForm.useCases.includes(data.useCase)) fields.push("useCase");
  if ((data.message ?? "").length > MAX.message) fields.push("message");
  return fields.length ? { ok: false, fields } : { ok: true, data };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const result = validate(body);
  if (!result.ok) return Response.json({ error: "invalid", fields: result.fields }, { status: 422 });

  // Bots fill every field; pretend success and drop it
  if (result.data.website) return Response.json({ ok: true });

  const { website: _honeypot, ...lead } = result.data;
  void _honeypot;
  const webhook = process.env.DEMO_FORM_WEBHOOK_URL;

  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[demo] DEMO_FORM_WEBHOOK_URL not set: request accepted but not delivered (dev only)");
      return Response.json({ ok: true, delivered: false });
    }
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, source: "strata-website", receivedAt: new Date().toISOString() }),
    });
    if (!res.ok) {
      console.error(`[demo] webhook responded ${res.status}`);
      return Response.json({ error: "delivery_failed" }, { status: 502 });
    }
  } catch {
    console.error("[demo] webhook unreachable");
    return Response.json({ error: "delivery_failed" }, { status: 502 });
  }

  return Response.json({ ok: true, delivered: true });
}
