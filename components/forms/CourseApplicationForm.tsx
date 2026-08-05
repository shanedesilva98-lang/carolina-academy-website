"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseApplicationFormSchema, type CourseApplicationFormSchema } from "@/lib/validation";
import { FormField, Honeypot, ConsentField, FormStatusMessage } from "@/components/forms/FormPrimitives";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { courses } from "@/content/courses";
import { trackEvent } from "@/lib/analytics";

export function CourseApplicationForm({ defaultCourseSlug }: { defaultCourseSlug?: string }) {
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CourseApplicationFormSchema>({
    resolver: zodResolver(courseApplicationFormSchema),
    defaultValues: { courseSlug: defaultCourseSlug ?? "" },
  });

  React.useEffect(() => {
    trackEvent("course_application_started", { courseSlug: defaultCourseSlug });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: CourseApplicationFormSchema) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "course-application", data }),
      });
      if (!res.ok) throw new Error("Request failed");
      trackEvent("course_application_completed", { courseSlug: data.courseSlug });
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <Honeypot register={register} />

      <FormField id="courseSlug" label="Course" required error={errors.courseSlug?.message}>
        <Controller
          name="courseSlug"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="courseSlug" aria-invalid={Boolean(errors.courseSlug)}>
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course.slug} value={course.slug}>
                    {course.shortTitle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </FormField>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="fullName" label="Full name" required error={errors.fullName?.message}>
          <Input id="fullName" autoComplete="name" aria-invalid={Boolean(errors.fullName)} {...register("fullName")} />
        </FormField>
        <FormField id="dateOfBirth" label="Date of birth" required error={errors.dateOfBirth?.message}>
          <Input id="dateOfBirth" type="date" aria-invalid={Boolean(errors.dateOfBirth)} {...register("dateOfBirth")} />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="nic" label="NIC / Passport number" required error={errors.nic?.message}>
          <Input id="nic" aria-invalid={Boolean(errors.nic)} {...register("nic")} />
        </FormField>
        <FormField id="highestEducation" label="Highest education level" required error={errors.highestEducation?.message}>
          <Input id="highestEducation" aria-invalid={Boolean(errors.highestEducation)} {...register("highestEducation")} />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="email" label="Email" required error={errors.email?.message}>
          <Input id="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} {...register("email")} />
        </FormField>
        <FormField id="telephone" label="Telephone" required error={errors.telephone?.message}>
          <Input id="telephone" type="tel" autoComplete="tel" aria-invalid={Boolean(errors.telephone)} {...register("telephone")} />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="whatsappNumber" label="WhatsApp number" error={errors.whatsappNumber?.message} hint="Optional, if different from telephone">
          <Input id="whatsappNumber" type="tel" aria-invalid={Boolean(errors.whatsappNumber)} {...register("whatsappNumber")} />
        </FormField>
        <FormField id="preferredIntake" label="Preferred intake" error={errors.preferredIntake?.message} hint="Optional">
          <Input id="preferredIntake" aria-invalid={Boolean(errors.preferredIntake)} {...register("preferredIntake")} />
        </FormField>
      </div>

      <FormField id="address" label="Address" required error={errors.address?.message}>
        <Textarea id="address" aria-invalid={Boolean(errors.address)} {...register("address")} />
      </FormField>

      <FormField id="message" label="Additional message" error={errors.message?.message} hint="Optional">
        <Textarea id="message" aria-invalid={Boolean(errors.message)} {...register("message")} />
      </FormField>

      <ConsentField id="consent" control={control} error={errors.consent?.message} />

      <FormStatusMessage
        status={status}
        successMessage="Thank you — your application has been received. Our admissions team will contact you shortly."
        errorMessage="Something went wrong. Please try again or contact us directly by phone or WhatsApp."
      />

      <Button type="submit" size="lg" variant="primary" disabled={isSubmitting} className="self-start">
        {isSubmitting ? "Submitting…" : "Submit Application"}
      </Button>
    </form>
  );
}
