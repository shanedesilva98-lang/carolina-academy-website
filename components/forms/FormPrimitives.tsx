import * as React from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Controller, type Control, type FieldValues, type Path, type UseFormRegister } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

/** Label + control + accessible error message wrapper used by every form. */
export function FormField({
  id,
  label,
  error,
  required,
  children,
  hint,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>
        {label}
        {required ? <span className="text-destructive"> *</span> : null}
      </Label>
      {children}
      {hint && !error ? <p className="text-xs text-ink-muted">{hint}</p> : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-1.5 text-xs font-medium text-destructive">
          <AlertCircle className="h-3.5 w-3.5" /> {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Honeypot anti-spam field. Real users never see it (visually hidden and
 * removed from tab order); bots that fill every input trip the Zod
 * `companyWebsite` validator server-side.
 */
export function Honeypot<T extends FieldValues>({ register }: { register: UseFormRegister<T> }) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
      <label htmlFor="companyWebsite">Leave this field empty</label>
      <input id="companyWebsite" type="text" tabIndex={-1} autoComplete="off" {...register("companyWebsite" as Path<T>)} />
    </div>
  );
}

export function ConsentField<T extends FieldValues>({
  id,
  error,
  control,
  label,
}: {
  id: Path<T>;
  error?: string;
  control: Control<T>;
  label?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-start gap-3">
        <Controller
          name={id}
          control={control}
          render={({ field }) => (
            <Checkbox
              id={id}
              checked={Boolean(field.value)}
              onCheckedChange={(checked) => field.onChange(checked === true)}
              onBlur={field.onBlur}
              ref={field.ref}
              aria-describedby={error ? `${id}-error` : undefined}
              aria-invalid={Boolean(error)}
            />
          )}
        />
        <Label htmlFor={id} className="font-normal leading-snug">
          {label ??
            "I consent to Carolina Academy contacting me about this enquiry and understand my information will be handled in line with the Privacy Policy."}
        </Label>
      </div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-1.5 text-xs font-medium text-destructive">
          <AlertCircle className="h-3.5 w-3.5" /> {error}
        </p>
      ) : null}
    </div>
  );
}

export function FormStatusMessage({
  status,
  successMessage,
  errorMessage,
}: {
  status: "idle" | "success" | "error";
  successMessage: string;
  errorMessage: string;
}) {
  if (status === "idle") return null;

  return (
    <div
      role="status"
      className={cn(
        "flex items-start gap-2.5 rounded-xl p-4 text-sm",
        status === "success" ? "bg-green-50 text-success" : "bg-red-50 text-destructive"
      )}
    >
      {status === "success" ? (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
      ) : (
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      )}
      <p>{status === "success" ? successMessage : errorMessage}</p>
    </div>
  );
}
