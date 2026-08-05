interface Step {
  title: string;
  description: string;
}

export function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, index) => (
        <li
          key={index}
          className="relative rounded-2xl border border-border bg-white p-6 shadow-soft"
        >
          <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-navy font-heading text-sm font-bold text-white">
            {index + 1}
          </span>
          <h3 className="font-heading text-base font-bold text-navy">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
