"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studyAbroadEligibilityFormSchema, type StudyAbroadEligibilityFormSchema } from "@/lib/validation";
import { FormField, Honeypot, ConsentField, FormStatusMessage } from "@/components/forms/FormPrimitives";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const destinations = [{ value: "south-korea", label: "South Korea" }];
const pathways = [
  { value: "university-degree", label: "University Degree Pathway" },
  { value: "korean-language-to-degree", label: "Korean Language to Degree Pathway" },
  { value: "career-focused", label: "Career-Focused Study Pathway" },
  { value: "not-sure", label: "Not sure yet" },
];
const englishLevels = [
  { value: "none", label: "No formal test taken" },
  { value: "ielts", label: "IELTS" },
  { value: "toefl", label: "TOEFL" },
  { value: "other", label: "Other English qualification" },
];

export function StudyAbroadEligibilityForm() {
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StudyAbroadEligibilityFormSchema>({
    resolver: zodResolver(studyAbroadEligibilityFormSchema),
    defaultValues: { destination: "south-korea" },
  });

  const onSubmit = async (data: StudyAbroadEligibilityFormSchema) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "study-abroad-eligibility", data }),
      });
      if (!res.ok) throw new Error("Request failed");
      trackEvent("study_abroad_form_submitted", { pathway: data.pathway, destination: data.destination });
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
        <FormField id="destination" label="Destination" required error={errors.destination?.message}>
          <Controller
            name="destination"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="destination" aria-invalid={Boolean(errors.destination)}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>
        <FormField id="pathway" label="Pathway of interest" required error={errors.pathway?.message}>
          <Controller
            name="pathway"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="pathway" aria-invalid={Boolean(errors.pathway)}>
                  <SelectValue placeholder="Select a pathway" />
                </SelectTrigger>
                <SelectContent>
                  {pathways.map((option) => (
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

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="highestEducation" label="Highest education level" required error={errors.highestEducation?.message}>
          <Input id="highestEducation" aria-invalid={Boolean(errors.highestEducation)} {...register("highestEducation")} />
        </FormField>
        <FormField id="englishProficiency" label="English proficiency" required error={errors.englishProficiency?.message}>
          <Controller
            name="englishProficiency"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="englishProficiency" aria-invalid={Boolean(errors.englishProficiency)}>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {englishLevels.map((option) => (
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

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="koreanProficiency" label="Korean proficiency (TOPIK level, if any)" error={errors.koreanProficiency?.message} hint="Optional">
          <Input id="koreanProficiency" aria-invalid={Boolean(errors.koreanProficiency)} {...register("koreanProficiency")} />
        </FormField>
        <FormField id="intendedIntake" label="Intended intake" error={errors.intendedIntake?.message} hint="Optional">
          <Input id="intendedIntake" aria-invalid={Boolean(errors.intendedIntake)} {...register("intendedIntake")} />
        </FormField>
      </div>

      <FormField id="message" label="Additional message" error={errors.message?.message} hint="Optional">
        <Textarea id="message" aria-invalid={Boolean(errors.message)} {...register("message")} />
      </FormField>

      <ConsentField id="consent" control={control} error={errors.consent?.message} />

      <FormStatusMessage
        status={status}
        successMessage="Thank you — your eligibility assessment request has been received. Our study-abroad team will contact you shortly."
        errorMessage="Something went wrong. Please try again or contact us directly by phone or WhatsApp."
      />

      <Button type="submit" size="lg" variant="primary" disabled={isSubmitting} className="self-start">
        {isSubmitting ? "Submitting…" : "Submit Eligibility Assessment"}
      </Button>
    </form>
  );
}
