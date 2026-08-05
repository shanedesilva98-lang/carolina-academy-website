"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Subtle scroll-triggered fade/slide-up wrapper. Respects
 * prefers-reduced-motion automatically via Framer Motion's reduced-motion
 * handling combined with our global CSS override.
 */
export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
