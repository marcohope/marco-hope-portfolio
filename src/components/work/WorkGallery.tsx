"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

/**
 * Swipeable photo carousel for a project. Shows one image at a time
 * (object-contain so screenshots and portrait newsletters are both fully
 * visible) with arrows + dots when there's more than one.
 */
export function WorkGallery({
  images,
  title,
}: {
  images: readonly StaticImageData[];
  title: string;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  if (!images.length) return null;
  const many = images.length > 1;

  return (
    <div className="relative">
      <Carousel
        setApi={setApi}
        opts={{ loop: many }}
        className="overflow-hidden rounded-xl"
      >
        <CarouselContent>
          {images.map((img, i) => (
            <CarouselItem key={i}>
              <div className="relative aspect-[16/10] bg-elevated/50 ring-1 ring-inset ring-border/70">
                <Image
                  src={img}
                  alt={`${title} — view ${i + 1} of ${images.length}`}
                  fill
                  sizes="(max-width: 1024px) 92vw, 36rem"
                  placeholder="blur"
                  className="object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {many && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => api?.scrollPrev()}
            className="absolute left-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-border/70 bg-background/70 text-foreground backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => api?.scrollNext()}
            className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-border/70 bg-background/70 text-foreground backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="mt-3 flex items-center justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                aria-current={selected === i}
                onClick={() => api?.scrollTo(i)}
                className={cn(
                  "h-1.5 rounded-full transition-[width,background-color] duration-300",
                  selected === i
                    ? "w-5 bg-accent"
                    : "w-1.5 bg-foreground/30 hover:bg-foreground/50",
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
