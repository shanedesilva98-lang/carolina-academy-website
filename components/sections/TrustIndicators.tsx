import { TrustBadge } from "@/components/cards/TrustBadge";
import { trustIndicators } from "@/content/organisation";

export function TrustIndicators() {
  return (
    <section className="border-b border-border bg-surface-off py-10">
      <div className="container grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {trustIndicators.map((item) => (
          <TrustBadge key={item.label} label={item.label} detail={item.detail} />
        ))}
      </div>
    </section>
  );
}
