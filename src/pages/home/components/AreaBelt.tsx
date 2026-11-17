import { useEffect, useRef } from "react";
import { clients } from "@/mocks/clients";
import Reveal from "@/components/base/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const BASE_SPEED = -42; // px per second, drifting left

export default function AreaBelt() {
  const items = [...clients, ...clients];
  const trackRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    const track = trackRef.current;
    if (!track) return undefined;

    let offset = 0;
    let smoothVelocity = 0;
    let lastY = window.scrollY;
    let lastT = performance.now();
    let half = track.scrollWidth / 2;
    let raf = 0;

    const measure = () => {
      half = track.scrollWidth / 2;
    };
    measure();

    const tick = (now: number) => {
      const dt = Math.min(0.064, (now - lastT) / 1000) || 0.016;
      const y = window.scrollY;
      const velocity = (y - lastY) / dt; // px per second
      lastY = y;
      lastT = now;

      // Smooth the raw scroll velocity so direction changes stay gentle.
      // The strip speeds up while scrolling, briefly reverses on scroll-up,
      // then the smoothing settles it back to BASE_SPEED.
      smoothVelocity += (velocity - smoothVelocity) * 0.12;
      const boost = Math.max(-700, Math.min(700, -smoothVelocity * 0.8));
      const speed = BASE_SPEED + boost;

      offset += speed * dt;
      if (half > 0) {
        while (offset <= -half) offset += half;
        while (offset > 0) offset -= half;
      }

      track.style.transform = `translate3d(${offset}px, 0, 0)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", measure);
    const ro =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    ro?.observe(track);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      ro?.disconnect();
    };
  }, [reduced]);

  return (
    <section className="py-5 sm:py-7 md:py-9 border-y border-background-200 bg-background-100 overflow-hidden">
      <div className="site-container">
        <Reveal>
          <p className="t-label mx-auto mb-4 text-center text-foreground-500">
            Trusted by leading organisations across Uganda
          </p>
        </Reveal>
      </div>
      <div className="edge-fade-x overflow-hidden">
        <div
          ref={trackRef}
          className="flex items-center gap-3 sm:gap-4 md:gap-8 whitespace-nowrap will-change-transform"
        >
          {items.map((name, idx) => (
            <div key={`${name}-${idx}`} className="flex items-center gap-3 sm:gap-4 md:gap-8 text-foreground-800">
              <i className="ri-checkbox-circle-fill text-accent-500"></i>
              <span className="font-heading text-base sm:text-xl md:text-2xl font-semibold tracking-tight">
                {name}
              </span>
              <span className="text-background-400">·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}