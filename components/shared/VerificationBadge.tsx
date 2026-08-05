import { CheckCircle2, Clock3, ShieldCheck, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Kind =
  | "verified"
  | "requires-confirmation"
  | "upcoming"
  | "active"
  | "applications-open"
  | "applications-closed"
  | "official-source";

const config: Record<Kind, { label: string; icon: typeof CheckCircle2; variant: "success" | "warning" | "soft" | "gold" | "outline" }> = {
  verified: { label: "Verified Information", icon: ShieldCheck, variant: "success" },
  "requires-confirmation": { label: "Requires Confirmation", icon: HelpCircle, variant: "warning" },
  upcoming: { label: "Upcoming Programme", icon: Clock3, variant: "gold" },
  active: { label: "Active Programme", icon: CheckCircle2, variant: "success" },
  "applications-open": { label: "Applications Open", icon: CheckCircle2, variant: "success" },
  "applications-closed": { label: "Applications Closed", icon: Clock3, variant: "outline" },
  "official-source": { label: "Official Source", icon: ShieldCheck, variant: "soft" },
};

export function VerificationBadge({ kind, className }: { kind: Kind; className?: string }) {
  const { label, icon: Icon, variant } = config[kind];
  return (
    <Badge variant={variant} className={cn(className)}>
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </Badge>
  );
}
