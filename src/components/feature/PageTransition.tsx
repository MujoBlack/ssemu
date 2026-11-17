import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const VEIL_LOGO =
  "/media/ssemu-logo.webp";

type Phase = "idle" | "cover" | "reveal" | "reset";

/** Cover the screen for 0.45s, swap the page underneath, then reveal. */
const COVER_MS = 470;
const HOLD_MS = 120;
const REVEAL_MS = 500;

export default function PageTransition({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const reduced = useReducedMotion();

  const [phase, setPhase] = useState<Phase>("idle");
  const busyRef = useRef(false);
  const firstPaintRef = useRef(true);
  const timersRef = useRef<number[]>([]);
  const isHome = pathname === "/";

  useEffect(() => {
    firstPaintRef.current = false;
  }, []);

  useEffect(
    () => () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
      busyRef.current = false;
    },
    []
  );

  const start = useCallback(
    (to: string) => {
      if (busyRef.current) return;
      busyRef.current = true;
      setPhase("cover");

      timersRef.current.push(
        window.setTimeout(() => {
          const html = document.documentElement;
          const previous = html.style.scrollBehavior;
          html.style.scrollBehavior = "auto";
          window.scrollTo(0, 0);
          html.style.scrollBehavior = previous;

          navigate(to);

          timersRef.current.push(
            window.setTimeout(() => {
              setPhase("reveal");
              timersRef.current.push(
                window.setTimeout(() => {
                  // Snap the veil back below the screen with no transition,
                  // then hand it back to the idle state.
                  setPhase("reset");
                  timersRef.current.push(
                    window.setTimeout(() => {
                      setPhase("idle");
                      busyRef.current = false;
                    }, 80)
                  );
                }, REVEAL_MS)
              );
            }, HOLD_MS)
          );
        }, COVER_MS)
      );
    },
    [navigate]
  );

  useEffect(() => {
    if (reduced) return undefined;

    const onClick = (event: MouseEvent) => {
      if (busyRef.current) return;
      if (event.defaultPrevented) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target && typeof target.closest === "function"
        ? (target.closest("a[href]") as HTMLAnchorElement | null)
        : null;
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href") || "";
      if (!href || href.startsWith("#")) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.protocol !== "http:" && url.protocol !== "https:") return;
      // Same page (including #anchor jumps) — let the router handle it.
      if (url.pathname === window.location.pathname) return;

      const base = __BASE_PATH__.replace(/\/+$/, "");
      const routePath =
        base && url.pathname.startsWith(base) ? url.pathname.slice(base.length) : url.pathname;
      const to = `${routePath || "/"}${url.search}${url.hash}`;

      event.preventDefault();
      start(to);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [reduced, start]);

  const enterClass = (() => {
    if (reduced) return firstPaintRef.current ? "" : "page-crossfade";
    if (phase !== "reveal") return "";
    return isHome ? "page-fade-only" : "page-rise";
  })();

  return (
    <>
      <div key={pathname} className={enterClass}>
        {children}
      </div>
      <div aria-hidden="true" className={`page-veil is-${phase}`}>
        <img src={VEIL_LOGO} alt="" className="page-veil-logo" />
      </div>
    </>
  );
}