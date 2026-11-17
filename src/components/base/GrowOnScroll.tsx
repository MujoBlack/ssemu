import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface GrowOnScrollProps {
  children: ReactNode;
  className?: string;
}

/**
 * Large photos ease from 0.92 to 1 as they travel from the bottom of the
 * viewport up to the middle, and back down again on scroll-up.
 * The 0.4s transform transition does the smoothing.
 */
export default function GrowOnScroll({ children, className = "" }: GrowOnScrollProps) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const box = boxRef.current;
    const frame = frameRef.current;
    if (!box || !frame) return undefined;

    if (reduced) {
      frame.style.transform = "none";
      return undefined;
    }

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = box.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const start = vh; // top edge at the bottom of the screen
      const end = vh / 2; // top edge at the middle of the screen
      const raw = (start - rect.top) / Math.max(1, start - end);
      const progress = Math.min(1, Math.max(0, raw));
      frame.style.transform = `scale(${(0.92 + 0.08 * progress).toFixed(4)})`;
    };

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  return (
    <div ref={boxRef} className={className}>
      <div ref={frameRef} className="grow-scroll">
        {children}
      </div>
    </div>
  );
}