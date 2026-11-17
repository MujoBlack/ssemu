import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Small round white back-to-top button, bottom left.
 * Fades in once the hero has been scrolled past; the quick contact launcher
 * keeps the bottom-right corner. Desktop only — on phones the sticky
 * "Book Now" bar owns that space.
 */
export default function BackToTop() {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const threshold = pathname === "/" ? 600 + window.innerHeight : 400;
      setVisible(window.scrollY > threshold);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`hidden lg:flex fixed left-6 bottom-6 z-40 w-11 h-11 items-center justify-center rounded-full bg-background-100 border border-background-200 text-foreground-800 hover:bg-background-50 hover:text-accent-700 btn-motion cursor-pointer hdr-focus ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
      }`}
      style={{
        boxShadow: "0 8px 30px rgba(11,11,11,0.08)",
        transitionProperty: "opacity, transform, background-color, color, border-color, box-shadow",
        transitionDuration: "0.4s",
        transitionTimingFunction: "cubic-bezier(0.165,0.84,0.44,1)",
      }}
    >
      <i className="ri-arrow-up-line text-lg"></i>
    </button>
  );
}