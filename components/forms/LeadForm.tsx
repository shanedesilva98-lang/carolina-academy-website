"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormField, Honeypot, FormStatusMessage } from "@/components/forms/FormPrimitives";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const quickLeadSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your name."),
  telephone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .regex(/^[0-9+\s()-]+$/, "Please enter a valid phone number."),
  message: z.string().trim().max(500).optional().or(z.literal("")),
  companyWebsite: z.string().max(0).optional().or(z.literal("")),
});
type QuickLeadValues = z.infer<typeof quickLeadSchema>;

/**
 * Compact quick-enquiry widget for CTA sections (e.g. homepage consultation
 * banner). For the full multi-field flows use ContactForm,
 * CourseApplicationForm, StudyAbroadEligibilityForm or ConsultationForm.
 */
export function LeadForm({ source = "lead-form", title = "Request a Callback" }: { source?: string; title?: string }) {
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuickLeadValues>({ resolver: zodResolver(quickLeadSchema) });

  const onSubmit = async (data: QuickLeadValues) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.fullName,
          telephone: data.telephone,
          email: "not-provided@carolinaacademy.lk",
          enquiryType: "general-enquiry",
          preferredContactMethod: "phone",
          message: data.message || "Quick callback request submitted from the website.",
          consent: true,
          companyWebsite: data.companyWebsite,
          source,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      trackEvent("consultation_booking", { source });
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <h3 className="font-heading text-lg font-bold text-navy">{title}</h3>
      <Honeypot register={register} />
      <FormField id="lead-fullName" label="Full name" required error={errors.fullName?.message}>
        <Input id="lead-fullName" autoComplete="name" aria-invalid={Boolean(errors.fullName)} {...register("fullName")} />
      </FormField>
      <FormField id="lead-telephone" label="Telephone" required error={errors.telephone?.message}>
        <Input id="lead-telephone" type="tel" autoComplete="tel" aria-invalid={Boolean(errors.telephone)} {...register("telephone")} />
      </FormField>
      <FormField id="lead-message" label="What are you interested in?" error={errors.message?.message} hint="Optional">
        <Textarea id="lead-message" rows={3} aria-invalid={Boolean(errors.message)} {...register("message")} />
      </FormField>
      <FormStatusMessage
        status={status}
        successMessage="Thank you — we'll call you back shortly."
        errorMessage="Something went wrong. Please try again or contact us directly."
      />
      <Button type="submit" size="lg" variant="gold" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Request Callback"}
      </Button>
      <p className="text-center text-xs text-ink-muted">
        By submitting, you agree to be contacted by Carolina Academy about your enquiry.
      </p>
    </form>
  );
}
