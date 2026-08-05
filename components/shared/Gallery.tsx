"use client";

import * as React from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/shared/VisuallyHidden";

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

/** Responsive image grid with an accessible lightbox (Radix Dialog). */
export function Gallery({ images }: { images: GalleryImage[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {images.map((image, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <button
              type="button"
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
              />
            </button>
          </DialogTrigger>
          <DialogContent>
            <VisuallyHidden>
              <DialogTitle>{image.alt}</DialogTitle>
            </VisuallyHidden>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image src={image.src} alt={image.alt} fill sizes="90vw" className="object-cover" />
            </div>
            {image.caption ? <p className="p-4 text-sm text-ink-muted">{image.caption}</p> : null}
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
