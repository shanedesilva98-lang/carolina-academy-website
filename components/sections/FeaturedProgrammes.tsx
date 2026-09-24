import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { VerificationBadge } from "@/components/shared/VerificationBadge";
import { FadeIn } from "@/components/shared/FadeIn";
import { Card, CardContent } from "@/components/ui/card";

const featured = [
  {
    title: "Pastry & Bakery NVQ Level 3/4",
    description: "Carolina Academy's flagship hands-on programme, trained at Carolina Beach Resort.",
    href: "/courses/pastry-bakery-nvq-level-3-4",
    image: {
      src: "/images/courses/pastry-bakery-training.png",
      alt: "Carolina Academy pastry and bakery trainees reviewing a plated selection of finished baked goods with their trainer",
    },
    status: "active" as const,
  },
  {
    title: "Hospitality Programmes",
    description: "Food & beverage service, housekeeping, cookery and steward training.",
    href: "/courses/hospitality",
    image: { src: "/images/hospitality-training.svg", alt: "Hospitality practical training" },
    status: "upcoming" as const,
  },
  {
    title: "Welding Training",
    description: "Electric arc, gas, MIG and TIG welding within our growing Technology faculty.",
    href: "/courses/technology",
    image: { src: "/images/welding-training.svg", alt: "Welding and technical training" },
    status: "upcoming" as const,
  },
  {
    title: "Health Science Programmes",
    description: "Caregiver and nurse assistant training, currently in development.",
    href: "/courses/health-sciences",
    image: { src: "/images/health-sciences-training.svg", alt: "Health sciences training" },
    status: "under-development" as const,
  },
  {
    title: "Korean Language & Study Pathways",
    description: "Language preparation pathways toward Korean-medium degree study.",
    href: "/study-abroad/south-korea#korean-language",
    image: { src: "/images/korean-language-training.svg", alt: "Korean language programme" },
    status: "upcoming" as const,
  },
  {
    title: "Undergraduate Study in South Korea",
    description: "Guidance for Sri Lankan students pursuing bachelor's degrees in South Korea.",
    href: "/study-abroad/south-korea#undergraduate",
    image: { src: "/images/south-korea-campus.svg", alt: "South Korea university undergraduate study" },
    status: "upcoming" as const,
  },
];

const statusBadge = {
  active: "active",
  upcoming: "upcoming",
  "under-development": "requires-confirmation",
} as const;

export function FeaturedProgrammes() {
  return (
    <section className="bg-surface-off py-16 sm:py-20">
      <div className="container">
        <SectionHeading
          eyebrow="Featured Programmes"
          title="Where Students Start"
          description="A snapshot of Carolina Academy's vocational and study-abroad programmes. Status is always shown clearly."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item, index) => (
            <FadeIn key={item.href} delay={index * 0.05}>
              <Card className="group relative isolate flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lift">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-soft">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
                  />
                  <div className="absolute left-3 top-3">
                    <VerificationBadge kind={statusBadge[item.status]} />
                  </div>
                </div>
                <CardContent className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="font-heading text-lg font-bold text-navy">
                    <Link href={item.href} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {item.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-ink-muted">{item.description}</p>
                  {item.status !== "active" ? (
                    <p className="mt-auto text-xs font-semibold text-warning">Upcoming – Details subject to confirmation</p>
                  ) : null}
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
