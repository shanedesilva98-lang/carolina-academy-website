import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  courseApplicationFormSchema,
  studyAbroadEligibilityFormSchema,
  consultationFormSchema,
} from "@/lib/validation";
import { submitLead } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const payloadSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("course-application"), data: courseApplicationFormSchema }),
  z.object({ kind: z.literal("study-abroad-eligibility"), data: studyAbroadEligibilityFormSchema }),
  z.object({ kind: z.literal("consultation"), data: consultationFormSchema }),
]);

function getClientIdentifier(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: NextRequest) {
  const identifier = getClientIdentifier(request);
  const { allowed, retryAfterMs } = checkRateLimit(`applications:${identifier}`);
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

  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Please check the form and try again.", errors: parsed.error.flatten() },
      { status: 400 }
    );
  }

  if (parsed.data.data.companyWebsite) {
    return NextResponse.json({ success: true, message: "Thank you." });
  }

  const result = await submitLead(parsed.data);
  return NextResponse.json(result, { status: result.success ? 200 : 500 });
}
