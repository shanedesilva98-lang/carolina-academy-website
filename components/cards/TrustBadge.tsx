import { ShieldCheck } from "lucide-react";

export function TrustBadge({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-white px-5 py-4 shadow-soft">
      <ShieldCheck className="h-6 w-6 shrink-0 text-royal" aria-hidden="true" />
      <div>
        <p className="font-heading text-sm font-bold text-navy">{label}</p>
        <p className="text-xs text-ink-muted">{detail}</p>
      </div>
    </div>
  );
}
