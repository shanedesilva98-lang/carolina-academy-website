"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormSchema } from "@/lib/validation";
import { FormField, Honeypot, ConsentField, FormStatusMessage } from "@/components/forms/FormPrimitives";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const enquiryOptions = [
  { value: "course-application", label: "Course Application" },
  { value: "study-abroad-consultation", label: "Study Abroad Consultation" },
  { value: "general-enquiry", label: "General Enquiry" },
  { value: "brochure-request", label: "Brochure Request" },
  { value: "partnership-enquiry", label: "Partnership Enquiry" },
];

const contactMethods = [
  { value: "phone", label: "Phone Call" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "Email" },
];

interface ContactFormProps {
  defaultEnquiryType?: ContactFormSchema["enquiryType"];
  defaultCourseOrDestination?: string;
}

export function ContactForm({ defaultEnquiryType, defaultCourseOrDestination }: ContactFormProps) {
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      enquiryType: defaultEnquiryType ?? "general-enquiry",
      preferredContactMethod: "whatsapp",
      courseOrDestination: defaultCourseOrDestination ?? "",
    },
  });

  const onSubmit = async (data: ContactFormSchema) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      trackEvent("study_abroad_form_submitted", { form: "contact", enquiryType: data.enquiryType });
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
        <FormField id="whatsappNumber" label="WhatsApp number" error={errors.whatsappNumber?.message} hint="Optional, if different from telephone">
          <Input id="whatsappNumber" type="tel" aria-invalid={Boolean(errors.whatsappNumber)} {...register("whatsappNumber")} />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="enquiryType" label="Enquiry type" required error={errors.enquiryType?.message}>
          <Controller
            name="enquiryType"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="enquiryType" aria-invalid={Boolean(errors.enquiryType)}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {enquiryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>
        <FormField id="courseOrDestination" label="Course or destination" error={errors.courseOrDestination?.message} hint="e.g. Pastry & Bakery, South Korea">
          <Input id="courseOrDestination" aria-invalid={Boolean(errors.courseOrDestination)} {...register("courseOrDestination")} />
        </FormField>
      </div>

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

      <FormField id="message" label="Message" required error={errors.message?.message}>
        <Textarea id="message" aria-invalid={Boolean(errors.message)} {...register("message")} />
      </FormField>

      <ConsentField id="consent" control={control} error={errors.consent?.message} />

      <FormStatusMessage
        status={status}
        successMessage="Thank you — your message has been sent. Our team will contact you shortly."
        errorMessage="Something went wrong. Please try again or contact us directly by phone or WhatsApp."
      />

      <Button type="submit" size="lg" variant="primary" disabled={isSubmitting} className="self-start">
        {isSubmitting ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
