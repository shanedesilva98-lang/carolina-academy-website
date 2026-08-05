import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { faqPageSchema } from "@/lib/schema";

interface FAQAccordionProps {
  items: { question: string; answer: string }[];
  includeSchema?: boolean;
}

/** Question-led FAQ block, wired up with FAQPage JSON-LD for AEO/GEO. */
export function FAQAccordion({ items, includeSchema = true }: FAQAccordionProps) {
  if (items.length === 0) return null;

  return (
    <div>
      {includeSchema ? <SchemaMarkup schema={faqPageSchema(items)} /> : null}
      <Accordion type="single" collapsible className="divide-y divide-border">
        {items.map((item, index) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger className="text-base sm:text-lg">{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
