"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface HeroSlide {
  src: string;
  alt: string;
}

const SLIDE_DURATION_MS = 6000;

/**
 * Auto-advancing hero image slideshow. Crossfades between slides, pauses on
 * hover/focus and when the tab is hidden, exposes manual dot controls for
 * accessibility, and skips the autoplay timer entirely when the visitor has
 * requested reduced motion (first slide is shown as a static image instead).
 */
export function HeroSlideshow({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % slides.length) + slides.length) % slides.length);
    },
    [slides.length]
  );

  useEffect(() => {
    if (prefersReducedMotion || isPaused || slides.length <= 1) return;

    timerRef.current = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, SLIDE_DURATION_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [prefersReducedMotion, isPaused, slides.length]);

  useEffect(() => {
    const handleVisibility = () => setIsPaused(document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  if (slides.length === 0) return null;

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border-4 border-white/10 shadow-lift"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Carolina Academy photo highlights"
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={slides[index].src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0"
          aria-live="polite"
        >
          <Image
            src={slides[index].src}
            alt={slides[index].alt}
            fill
            priority={index === 0}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Bottom gradient keeps dot controls legible over any photo */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-navy/70 to-transparent" aria-hidden="true" />

      {slides.length > 1 && (
        <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(slideIndex)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
                slideIndex === index ? "w-6 bg-gold" : "w-2.5 bg-white/50 hover:bg-white/80"
              )}
              aria-label={`Show photo ${slideIndex + 1} of ${slides.length}`}
              aria-current={slideIndex === index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
