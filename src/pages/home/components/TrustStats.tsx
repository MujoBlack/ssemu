import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { trustStats, checkPills } from "@/mocks/testimonials";
import { team } from "@/mocks/team";
import Words from "@/components/base/Words";
import Reveal from "@/components/base/Reveal";
import RollingNumber from "@/components/base/RollingNumber";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const md = team[0];
const EASE = "cubic-bezier(0.165,0.84,0.44,1)";

export default function TrustStats() {
  const reduced = useReducedMotion();
  const textColRef = useRef<HTMLDivElement | null>(null);
  const photoRef = useRef<HTMLDivElement | null>(null);

  // Scroll-linked split: photo scales 0.95 -> 1, text column slides in from
  // 100px to the left. Reverses on scroll-up, smoothed with a 0.4s transition.
  useEffect(() => {
    if (reduced) return undefined;
    let raf = 0;
    const tick = () => {
      const col = textColRef.current;
      if (col) {
        const rect = col.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.55)));
        col.style.transform = `translateX(${(1 - p) * -100}px)`;
        if (photoRef.current) {
          photoRef.current.style.transform = `scale(${0.95 + 0.05 * p})`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <section className="section-md bg-background-100 overflow-hidden">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div
            ref={textColRef}
            className="lg:col-span-7 will-change-transform"
            style={{
              transitionProperty: "transform",
              transitionDuration: "0.4s",
              transitionTimingFunction: EASE,
            }}
          >
            <Reveal>
              <div className="t-label stack-label inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background-50 border border-background-200 text-foreground-700">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
                Professional · Affordable · Dynamic
              </div>
            </Reveal>
            <Words
              lines={[
                {
                  text: "A dynamic team that delivers 101% on every job.",
                  accentWords: ["101%"],
                },
              ]}
              className="t-h2 text-foreground-950 max-w-2xl"
            />
            <Reveal delay={120}>
              <p className="t-body stack-sub text-foreground-600">
                Ssemu Cleaning Services Ltd puts a wealth of experience, a
                professional, supervised workforce and quality products to work to
                meet and exceed our clients' expectations. We are your perfect
                contractor!
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-background-300 pt-8">
              {trustStats.map((s, i) => (
                <Reveal
                  key={s.label}
                  delay={i * 100}
                  className={`pr-3 ${i < 2 ? "border-r border-background-300" : ""}`}
                >
                  <RollingNumber
                    value={s.value}
                    className="stat-number text-3xl md:text-5xl font-heading font-semibold text-accent-600 tracking-tight"
                  />
                  <div className="mt-2 text-[15px] leading-snug text-foreground-600">{s.label}</div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={160}>
              <div className="mt-8 flex flex-wrap gap-2">
                {checkPills.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background-50 border border-background-200 text-sm text-foreground-800"
                  >
                    <i className="ri-check-line text-accent-600"></i>
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <div
              ref={photoRef}
              className="relative rounded-2xl overflow-hidden bg-accent-100 origin-center will-change-transform"
              style={{
                transitionProperty: "transform",
                transitionDuration: "0.4s",
                transitionTimingFunction: EASE,
              }}
            >
              <img
                src="/media/a19bb50fedfcd34e0f1ccbddd1483973.webp"
                alt="Ssenyonjo Mubaraka, Managing Director of Ssemu Cleaning Services Ltd, in Kampala"
                className="w-full aspect-[5/6] object-cover object-top"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 flex items-center justify-center rounded-full bg-accent-500 text-[#0B0B0B] shrink-0">
                    <i className="ri-user-3-line text-lg"></i>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground-950 truncate">{md.name}</p>
                    <p className="text-sm text-foreground-600">Managing Director</p>
                  </div>
                  <Link
                    to="/team"
                    aria-label="Meet the team"
                    className="press ml-auto w-9 h-9 flex items-center justify-center rounded-full bg-primary-950 text-white hover:bg-primary-900 btn-motion cursor-pointer shrink-0"
                  >
                    <i className="ri-arrow-right-up-line"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}