import Image from "next/image";
import NextLink from "next/link";
import { CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/shared/FadeIn";
import { Button } from "@/components/ui/button";

const points = [
  "Hands-on practice in a working hospitality environment at Carolina Beach Resort",
  "Small-group, competency-based instruction",
  "Exposure to real kitchen and service operations alongside classroom learning",
  "Assessment aligned to national and industry standards",
];

export function PracticalTraining() {
  return (
    <section className="bg-navy py-16 text-white sm:py-20">
      <div className="container grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <FadeIn className="order-2 lg:order-1">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gold">Practical Training Experience</p>
          <h2 className="font-heading text-3xl font-extrabold sm:text-4xl">Learning by Doing</h2>
          <p className="mt-4 text-white/75">
            Carolina Academy&apos;s training model puts students in real working environments early. At Carolina Beach
            Resort, students practise the same routines and standards used in professional hospitality settings.
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-white/85">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                {point}
              </li>
            ))}
          </ul>
          <Button asChild size="lg" variant="gold" className="mt-8">
            <NextLink href="/facilities">View Our Facilities</NextLink>
          </Button>
        </FadeIn>
        <FadeIn delay={0.1} className="order-1 lg:order-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border-4 border-white/10">
            <Image
              src="/images/training-kitchen.svg"
              alt="Students practising in the training kitchen at Carolina Beach Resort"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
