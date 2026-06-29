"use client";

import { useRef, type HTMLAttributes } from "react";
import Image, { type StaticImageData } from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import headshot from "@/assets/about/headshot.png";
import headshotBack from "@/assets/about/headshot-back.png";

gsap.registerPlugin(useGSAP);

type Variant = "hero" | "compact";

/**
 * One side of the coin — the gold→sakura ring around a circular portrait.
 * Front and back share this exact markup so the two faces overlay perfectly.
 */
function CoinFace({
  src,
  alt,
  imgClass,
  eager,
  className,
  ...rest
}: {
  src: StaticImageData;
  alt: string;
  imgClass: string;
  eager: boolean;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className} {...rest}>
      {/* Gold → sakura ring */}
      <div className="rounded-full bg-gradient-to-br from-gold via-accent to-gold p-[3px] shadow-[0_20px_60px_-20px_rgb(0_0_0/0.45)]">
        <div className="overflow-hidden rounded-full border-2 border-background/70">
          <Image
            src={src}
            alt={alt}
            width={224}
            height={224}
            quality={90}
            placeholder="blur"
            priority={false}
            fetchPriority={eager ? "high" : "auto"}
            loading={eager ? "eager" : "lazy"}
            sizes={eager ? "(max-width: 768px) 9rem, 14rem" : "(max-width: 768px) 6rem, 7rem"}
            className={`object-cover ${imgClass}`}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Marco's headshot, ringed in gold→sakura with a soft aura. Click it (or press
 * Enter/Space) and it flips like a tossed coin — a few fast rotations that
 * decelerate back to the front face, with the back of his head on the reverse.
 *
 * `variant="hero"` is the large, self-animating treatment (mount fade + idle
 * float). `variant="compact"` is a smaller, static photo for placing beside the
 * bio — it inherits its container's reveal and only animates on the flip.
 * Reduced motion: it appears static and the flip is a single calm turn.
 */
export function ProfilePortrait({ variant = "hero" }: { variant?: Variant }) {
  const ref = useRef<HTMLDivElement>(null);
  const coin = useRef<HTMLDivElement>(null);
  const spinning = useRef(false);
  const isHero = variant === "hero";

  useGSAP(
    () => {
      // Compact stays static — its container (the bio washi card) supplies the
      // entrance reveal, and a free-floating photo inside a content card reads
      // as a glitch. Only the hero centerpiece gets the mount + idle float.
      if (!isHero) return;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced || !ref.current) return;

      gsap.from(ref.current, {
        autoAlpha: 0,
        scale: 0.86,
        y: 18,
        filter: "blur(12px)",
        duration: 1,
        ease: "power3.out",
        delay: 0.15,
      });

      gsap.to(ref.current, {
        y: -10,
        duration: 4.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.1,
      });
    },
    { scope: ref, dependencies: [isHero] },
  );

  // Coin flip: spins fast, then eases out to a stop on a multiple of 360° so it
  // always settles back on the headshot — its default state.
  function flip() {
    if (!coin.current || spinning.current) return;
    spinning.current = true;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.to(coin.current, {
      rotationY: reduced ? "+=360" : "+=1080",
      duration: reduced ? 1 : 1.8,
      ease: reduced ? "power2.out" : "power4.out",
      onComplete: () => {
        spinning.current = false;
        // Keep the accumulated angle tidy across repeated clicks.
        const angle = gsap.getProperty(coin.current, "rotationY") as number;
        gsap.set(coin.current, { rotationY: angle % 360 });
      },
    });
  }

  const imgClass = isHero
    ? "h-36 w-36 md:h-56 md:w-56"
    : "h-24 w-24 md:h-28 md:w-28";
  const auraClass = isHero
    ? "-inset-5 bg-accent/25 blur-2xl"
    : "-inset-3 bg-accent/20 blur-xl";

  return (
    // Perspective lives on the wrapper so the inner coin reads as 3D. The mount
    // + float tweens transform this same element without flattening the flip.
    <div ref={ref} className="relative w-fit [perspective:1000px]">
      {/* Aura */}
      <span
        aria-hidden
        className={`absolute rounded-full ${auraClass}`}
      />

      {/* Coin: two faces sharing one 3D box. Click / Enter / Space to flip. */}
      <div
        ref={coin}
        role="button"
        tabIndex={0}
        aria-label="Flip Marco's portrait"
        title="Flip me"
        onClick={flip}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            flip();
          }
        }}
        className="relative cursor-pointer rounded-full [transform-style:preserve-3d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {/* Front — the headshot, in flow so it defines the coin's box size */}
        <CoinFace
          src={headshot}
          alt="Marco Hope"
          imgClass={imgClass}
          eager={isHero}
          className="[backface-visibility:hidden]"
        />
        {/* Back — back of the head, pre-flipped 180° and overlaid */}
        <CoinFace
          src={headshotBack}
          alt=""
          aria-hidden
          imgClass={imgClass}
          eager={false}
          className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]"
        />
      </div>
    </div>
  );
}
