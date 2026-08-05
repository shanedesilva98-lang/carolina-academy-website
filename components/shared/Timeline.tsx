interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative border-l-2 border-surface-soft pl-6">
      {items.map((item, index) => (
        <li key={index} className="mb-10 last:mb-0">
          <span className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-4 border-white bg-royal" aria-hidden="true" />
          <p className="text-sm font-bold uppercase tracking-wide text-royal">{item.year}</p>
          <h3 className="mt-1 font-heading text-lg font-bold text-navy">{item.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-ink-muted">{item.description}</p>
        </li>
      ))}
    </ol>
  );
}
