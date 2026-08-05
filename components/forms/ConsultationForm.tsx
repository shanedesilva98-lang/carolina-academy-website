"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { consultationFormSchema, type ConsultationFormSchema } from "@/lib/validation";
import { FormField, Honeypot, ConsentField, FormStatusMessage } from "@/components/forms/FormPrimitives";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const consultationTypes = [
  { value: "vocational-course", label: "Vocational Course" },
  { value: "study-abroad", label: "Study Abroad" },
  { value: "not-sure", label: "Not sure yet" },
];
const contactMethods = [
  { value: "phone", label: "Phone Call" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "Email" },
];

export function ConsultationForm() {
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationFormSchema>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: { consultationType: "not-sure", preferredContactMethod: "whatsapp" },
  });

  const onSubmit = async (data: ConsultationFormSchema) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "consultation", data }),
      });
      if (!res.ok) throw new Error("Request failed");
      trackEvent("consultation_booking", { consultationType: data.consultationType });
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <Honeypot register={register} />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="fullName" label="Full name" required error={errors.fullName?.message}>
          <Input id="fullName" autoComplete="name" aria-invalid={Boolean(errors.fullName)} {...register("fullName")} />
        </FormField>
        <FormField id="email" label="Email" required error={errors.email?.message}>
          <Input id="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} {...register("email")} />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="telephone" label="Telephone" required error={errors.telephone?.message}>
          <Input id="telephone" type="tel" autoComplete="tel" aria-invalid={Boolean(errors.telephone)} {...register("telephone")} />
        </FormField>
        <FormField id="whatsappNumber" label="WhatsApp number" error={errors.whatsappNumber?.message} hint="Optional">
          <Input id="whatsappNumber" type="tel" aria-invalid={Boolean(errors.whatsappNumber)} {...register("whatsappNumber")} />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="consultationType" label="Consultation type" required error={errors.consultationType?.message}>
          <Controller
            name="consultationType"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="consultationType" aria-invalid={Boolean(errors.consultationType)}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {consultationTypes.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>
        <FormField id="preferredContactMethod" label="Preferred contact method" required error={errors.preferredContactMethod?.message}>
          <Controller
            name="preferredContactMethod"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="preferredContactMethod" aria-invalid={Boolean(errors.preferredContactMethod)}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {contactMethods.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>
      </div>

      <FormField id="preferredDate" label="Preferred date" error={errors.preferredDate?.message} hint="Optional — we'll confirm availability with you">
        <Input id="preferredDate" type="date" aria-invalid={Boolean(errors.preferredDate)} {...register("preferredDate")} />
      </FormField>

      <FormField id="message" label="What would you like to discuss?" error={errors.message?.message} hint="Optional">
        <Textarea id="message" aria-invalid={Boolean(errors.message)} {...register("message")} />
      </FormField>

      <ConsentField id="consent" control={control} error={errors.consent?.message} />

      <FormStatusMessage
        status={status}
        successMessage="Thank you — your consultation request has been received. Our team will contact you shortly to confirm a time."
        errorMessage="Something went wrong. Please try again or contact us directly by phone or WhatsApp."
      />

      <Button type="submit" size="lg" variant="primary" disabled={isSubmitting} className="self-start">
        {isSubmitting ? "Booking…" : "Book Free Consultation"}
      </Button>
    </form>
  );
}
