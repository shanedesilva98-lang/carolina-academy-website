import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";
import { submitLead } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

function getClientIdentifier(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: NextRequest) {
  const identifier = getClientIdentifier(request);
  const { allowed, retryAfterMs } = checkRateLimit(`contact:${identifier}`);
  if (!allowed) {
    return NextResponse.json(
      { success: false, message: "Too many submissions. Please try again shortly." },
      { status: 429, headers: retryAfterMs ? { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) } : undefined }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Please check the form and try again.", errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // Honeypot: if filled, silently pretend success without sending anything.
  if (parsed.data.companyWebsite) {
    return NextResponse.json({ success: true, message: "Thank you." });
  }

  const result = await submitLead({ kind: "contact", data: parsed.data });
  return NextResponse.json(result, { status: result.success ? 200 : 500 });
}
