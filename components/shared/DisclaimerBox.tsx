import { AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface DisclaimerBoxProps {
  title?: string;
  children: React.ReactNode;
  variant?: "warning" | "info";
  className?: string;
}

export function DisclaimerBox({ title = "Important disclaimer", children, variant = "warning", className }: DisclaimerBoxProps) {
  const Icon = variant === "warning" ? AlertTriangle : Info;
  return (
    <div
      role="note"
      className={cn(
        "flex gap-3 rounded-2xl border p-5",
        variant === "warning" ? "border-amber-200 bg-amber-50/70" : "border-royal/20 bg-surface-soft",
        className
      )}
    >
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", variant === "warning" ? "text-warning" : "text-royal")} aria-hidden="true" />
      <div className="text-sm leading-relaxed text-ink">
        <p className="mb-1 font-heading font-bold text-navy">{title}</p>
        <div className="text-ink-muted">{children}</div>
      </div>
    </div>
  );
}
