import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the top of the element is about 80px inside the bottom
 * of the viewport. Everything animates only opacity and transform.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }

    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (done) return;
        if (entries.some((e) => e.isIntersecting)) {
          done = true;
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, inView };
}