import Link from "next/link";
import Image from "next/image";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { mainNav, coursesMenu, studyAbroadMenu } from "@/components/layout/nav-data";
import { whatsappMessages } from "@/lib/whatsapp";

const simpleLinks = mainNav.filter((item) => !["Courses", "Study Abroad"].includes(item.label));

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-white/95 backdrop-blur">
      <AnnouncementBar />
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Carolina Academy home">
          <Image src="/logos/carolina-academy-icon.png" alt="" width={44} height={44} priority />
          <Image
            src="/logos/carolina-academy-wordmark.png"
            alt="Carolina Academy"
            width={190}
            height={54}
            priority
            className="hidden h-7 w-auto sm:block"
          />
        </Link>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {simpleLinks.slice(0, 2).map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    className="rounded-full px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-surface-soft"
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
            <MegaMenu label="Courses" items={coursesMenu} />
            <MegaMenu label="Study Abroad" items={studyAbroadMenu} />
            {simpleLinks.slice(2).map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    className="rounded-full px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-surface-soft"
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <WhatsAppButton
            variant="icon"
            message={whatsappMessages.general}
            source="header"
            label="Chat with Carolina Academy on WhatsApp"
            className="hidden sm:inline-flex"
          />
          <Button asChild variant="gold" className="hidden sm:inline-flex">
            <Link href="/apply">Apply Now</Link>
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
