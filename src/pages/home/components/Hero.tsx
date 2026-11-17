import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { heroServiceCards } from "@/mocks/services";
import Words from "@/components/base/Words";

const HERO_VIDEO_DESKTOP =
  "https://storage.helloreaddy.io/project_files/8e0e98b8-0e43-4f10-a7fa-e43fc189d217/748cde09-2635-4dca-9d0e-45d93572a316_hero-scroll.mp4";
const HERO_VIDEO_MOBILE =
  "https://storage.helloreaddy.io/project_files/8e0e98b8-0e43-4f10-a7fa-e43fc189d217/99ae82ea-2652-45e6-bbc1-de8c391fdbae_hero-scroll-mobile-portrait-allkey.mp4";
const HERO_POSTER =
  "https://storage.helloreaddy.io/project_files/8e0e98b8-0e43-4f10-a7fa-e43fc189d217/f4b5949b-3368-407a-9e7f-33e538d9f8f7_compressed_hero-poster.webp";

const VIDEO_ASPECT = 716 / 1280;
const PLATFORM_TRAVEL = 0.416;

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

// Video-time -> how far the platform has descended (measured from the footage)
const PLATFORM: Array<[number, number]> = [
  [0, 0],
  [0.5, 0.118],
  [1, 0.231],
  [1.5, 0.362],
  [2, 0.497],
  [2.5, 0.632],
  [3, 0.762],
  [3.5, 0.866],
  [4, 0.946],
  [4.5, 0.983],
  [5, 1],
];

function platformProgress(t: number) {
  if (t <= 0) return 0;
  if (t >= 5) return 1;
  for (let i = 0; i < PLATFORM.length - 1; i += 1) {
    const [t0, p0] = PLATFORM[i];
    const [t1, p1] = PLATFORM[i + 1];
    if (t <= t1) return p0 + (p1 - p0) * ((t - t0) / (t1 - t0));
  }
  return 1;
}

function targetTime(y: number, vh: number, duration: number) {
  let t: number;
  if (y <= 500) t = (y / 500) * 5;
  else if (y <= 600) t = 5 + ((y - 500) / 100) * 3;
  else t = 8 + ((y - 600) / vh) * (duration - 8);
  return clamp(t, 0, duration);
}

const MOBILE_MAX_WIDTH = 768;
const LERP = 0.15;
const MIN_SEEK_DELTA = 1 / 24;

export default function Hero() {
  const [reduced, setReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= MOBILE_MAX_WIDTH,
  );

  const mobileRef = useRef(isMobile);
  const layerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const durationRef = useRef(14);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      const mobile = window.innerWidth <= MOBILE_MAX_WIDTH;
      mobileRef.current = mobile;
      setReduced(motionQuery.matches);
      setIsMobile(mobile);
    };
    sync();
    motionQuery.addEventListener("change", sync);
    window.addEventListener("resize", sync);
    return () => {
      motionQuery.removeEventListener("change", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  useEffect(() => {
    if (reduced) return;
    const video = videoRef.current;
    if (video) {
      const onMeta = () => {
        if (video.duration && Number.isFinite(video.duration)) {
          durationRef.current = video.duration;
        }
      };
      const prime = () => {
        // Prime the decoder so the first frame renders and seeking is smooth on mobile.
        video.pause();
        video.currentTime = 0.01;
      };
      video.addEventListener("loadedmetadata", onMeta);
      video.addEventListener("loadeddata", prime);
      return () => {
        video.removeEventListener("loadedmetadata", onMeta);
        video.removeEventListener("loadeddata", prime);
      };
    }
    return undefined;
  }, [reduced, isMobile]);

  // iOS Safari only repaints a paused video after a user gesture has started
  // playback once. Play then pause immediately on the first touch or scroll.
  useEffect(() => {
    if (reduced) return undefined;
    const video = videoRef.current;
    if (!video || !mobileRef.current) return undefined;

    let unlocked = false;
    const unlock = () => {
      if (unlocked) return;
      unlocked = true;
      try {
        const attempt = video.play();
        if (attempt && typeof attempt.catch === "function") {
          attempt.catch(() => {
            /* autoplay may still be blocked — scroll seeking still works */
          });
        }
        video.pause();
      } catch {
        /* ignore playback edge cases */
      }
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("scroll", unlock);
    };

    window.addEventListener("touchstart", unlock, { passive: true });
    window.addEventListener("scroll", unlock, { passive: true });
    return () => {
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("scroll", unlock);
    };
  }, [reduced, isMobile]);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const tick = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const mobile = mobileRef.current;
      const duration = durationRef.current;
      const target = targetTime(y, vh, duration);
      const video = videoRef.current;

      if (video) {
        const next = video.currentTime + (target - video.currentTime) * LERP;
        // Never queue a seek while the last one is still resolving, and skip
        // sub-frame changes so the decoder is not hammered on every tick.
        if (!video.seeking && Math.abs(next - video.currentTime) > MIN_SEEK_DELTA) {
          try {
            video.currentTime = next;
          } catch {
            /* ignore seek edge cases */
          }
        }
      }

      const t = video ? video.currentTime : target;

      if (textRef.current) {
        if (mobile) {
          // Portrait framing moves differently, so the copy stays put and only
          // fades out between 100px and 220px of scroll.
          textRef.current.style.transform = "none";
          const fadeMobile = clamp((y - 100) / 120, 0, 1);
          textRef.current.style.opacity = String(1 - fadeMobile);
        } else {
          // Text rides the descent of the platform.
          const objectH = Math.max(vh, window.innerWidth * VIDEO_ASPECT);
          const offset = -PLATFORM_TRAVEL * objectH * platformProgress(t);
          textRef.current.style.transform = `translateY(${offset}px)`;
          // Fade the copy out between 150px and 300px of scroll (0:01.5 - 0:03 of
          // video time), while the text is still fully on screen.
          const fade = clamp((y - 150) / 150, 0, 1);
          textRef.current.style.opacity = String(1 - fade);
        }
      }

      // Cards fade and sink between 0:00 and 0:02.
      if (cardsRef.current) {
        const p = clamp(t / 2, 0, 1);
        cardsRef.current.style.opacity = String(1 - p);
        cardsRef.current.style.transform = `translateY(${p * 24}px)`;
      }

      // Scroll hint: fades over the first 80px, and only shows when there is
      // enough room between the hero buttons and the cards (desktop only).
      if (indicatorRef.current) {
        const hint = indicatorRef.current;
        if (y > 80) {
          hint.style.opacity = "0";
          hint.style.visibility = "hidden";
        } else {
          const btn = buttonsRef.current;
          const cards = cardsRef.current;
          const desktop = window.innerWidth >= 1024;
          const space =
            btn && cards
              ? cards.getBoundingClientRect().top - btn.getBoundingClientRect().bottom
              : 0;
          const fits = desktop && space >= 140;
          const o = fits ? 1 - y / 80 : 0;
          hint.style.opacity = String(o);
          hint.style.visibility = o > 0.01 ? "visible" : "hidden";
        }
      }

      // Once the next section fully covers the screen, hide the fixed layer.
      const endScroll = 600 + vh;
      if (layerRef.current) {
        layerRef.current.style.visibility = y >= endScroll ? "hidden" : "visible";
      }
      if (video && y >= endScroll) video.pause();

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const textBlock = (withHint: boolean) => (
    <div ref={textRef} className="will-change-transform">
      {/* Phones: the white wash over the footage is light, so the copy gets its
          own soft white backdrop instead of a full-screen overlay. */}
      <div
        aria-hidden="true"
        className="md:hidden pointer-events-none absolute -left-5 -right-5 -top-6 -bottom-3"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.8) 58%, rgba(255,255,255,0.4) 82%, rgba(255,255,255,0) 100%)",
          filter: "blur(10px)",
        }}
      />
      <div className="relative z-10">
      <span className="t-label inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-accent-200 text-foreground-800">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
        Serving Kampala &amp; across Uganda
      </span>
      <Words
        as="h1"
        lines={[
          { text: "Keeping Uganda Clean," },
          { text: "From the Top Down.", accent: true },
        ]}
        accentClassName="text-accent-600"
        startDelay={0.25}
        className="t-h1 hero-h1 stack-sub text-foreground-950"
      />
      <p className="t-body stack-sub text-foreground-700 max-w-[52ch]">
        Kampala's trusted team for professional cleaning, fumigation, waste
        management and high-rise window cleaning.
      </p>
      <div
        ref={buttonsRef}
        className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
      >
        <Link to="/contact#book" className="group btn btn-primary w-full sm:w-auto">
          Book Now
          <i className="ri-arrow-right-up-line btn-arrow text-[16px]"></i>
        </Link>
        <Link to="/services" className="group btn btn-secondary w-full sm:w-auto">
          Our Services
          <i className="ri-arrow-right-line btn-arrow text-[16px]"></i>
        </Link>
      </div>

      {withHint ? (
        <div
          ref={indicatorRef}
          aria-hidden="true"
          className="hidden lg:flex mt-12 items-center gap-2.5 text-foreground-950/60 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <span className="relative w-[18px] h-7 flex justify-center pt-1.5 rounded-full border-[1.5px] border-foreground-950/40">
            <span className="scroll-dot w-[3px] h-[5px] rounded-full bg-foreground-950/60"></span>
          </span>
          <span className="text-[12px] uppercase tracking-[0.06em] leading-none">Scroll</span>
        </div>
      ) : null}
      </div>
    </div>
  );

  const cardsBlock = (
    <div
      ref={cardsRef}
      className="hero-cards flex gap-3 overflow-x-auto scroll-clean sm:grid sm:grid-cols-3 sm:overflow-visible will-change-transform"
    >
      {heroServiceCards.map((c) => (
        <Link
          key={c.id}
          to="/contact#book"
          className="group flex flex-col min-w-[250px] sm:min-w-0 rounded-2xl p-4 md:p-5 bg-white/80 backdrop-blur-md border border-white/70 hover:bg-white hero-card cursor-pointer"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-[12px] uppercase tracking-[0.06em] text-accent-700">
              <i className={`${c.icon} text-accent-600 text-sm`}></i>
              <span className="whitespace-nowrap">{c.tag}</span>
            </span>
            <i className="ri-arrow-right-up-line text-foreground-500 group-hover:text-accent-600 transition-colors"></i>
          </div>
          <h3 className="mt-3 text-base md:text-lg font-heading font-semibold text-foreground-950">
            {c.title}
          </h3>
          <p className="t-card mt-1 text-foreground-700">{c.subtitle}</p>
        </Link>
      ))}
    </div>
  );

  if (reduced) {
    return (
      <section className="relative w-full h-[100svh] min-h-[560px] overflow-hidden">
        <img
          src={HERO_POSTER}
          alt="Ssemu window cleaning crew on a gondola in front of a glass tower"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="md:hidden absolute inset-0 bg-gradient-to-b from-white/97 via-white/85 to-white/0"></div>
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-white/92 via-white/55 to-transparent"></div>
        <div className="relative z-10 h-full flex flex-col justify-between site-container pt-28 md:pt-36 pb-6 md:pb-8">
          <div className="max-w-[760px]">{textBlock(false)}</div>
          <div>{cardsBlock}</div>
        </div>
      </section>
    );
  }

  return (
    <>
      <div ref={layerRef} className="fixed inset-0 z-0">
        <video
          ref={(el) => {
            videoRef.current = el;
            // Legacy iOS attribute — React does not type it directly.
            if (el) el.setAttribute("webkit-playsinline", "true");
          }}
          key={isMobile ? "mobile" : "desktop"}
          className="absolute inset-0 w-full h-full object-cover"
          src={isMobile ? HERO_VIDEO_MOBILE : HERO_VIDEO_DESKTOP}
          poster={HERO_POSTER}
          muted
          playsInline
          preload="auto"
          style={isMobile ? { objectPosition: "center 40%" } : undefined}
        />
        {/* Phones keep the wash light (max 30%) so the footage movement reads. */}
        <div
          className="md:hidden absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0) 75%)",
          }}
        />
        <div
          className="hidden md:block absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.55) 30%, rgba(255,255,255,0) 62%)",
          }}
        />

        <div className="absolute inset-0">
          <div className="site-container h-full">
            <div className="relative h-full">
              <div className="absolute left-0 right-0 top-[120px] md:top-[132px] max-w-[760px]">
                {textBlock(true)}
              </div>

              <div className="absolute left-0 right-0 bottom-0 pb-6 md:pb-8">
                {cardsBlock}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Scroll distance: 5 wheel clicks (500px) to park, 1 click (100px) to start cleaning, then one screen to be covered.
          pointer-events-none keeps the fixed hero layer below clickable. */}
      <div
        style={{ height: "calc(600px + 100vh)" }}
        aria-hidden="true"
        className="relative z-0 pointer-events-none"
      />
    </>
  );
}