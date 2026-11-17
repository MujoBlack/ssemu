import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import Words, { type WordLine } from "@/components/base/Words";
import Reveal from "@/components/base/Reveal";

const HERO_CLIP =
  "https://storage.helloreaddy.io/project_files/8e0e98b8-0e43-4f10-a7fa-e43fc189d217/748cde09-2635-4dca-9d0e-45d93572a316_hero-scroll.mp4";
const CLIP_START = 8;
const CLIP_END = 12;

interface CTASectionProps {
  eyebrow?: string;
  title?: ReactNode;
  titleLines?: WordLine[];
  subtitle?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  /** Near-black rounded panel with a muted looping crew clip behind the text. */
  cinematic?: boolean;
}

function CtaClip() {
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const park = () => {
      try {
        video.currentTime = CLIP_START;
      } catch {
        /* ignore seek edge cases */
      }
    };
    const onTime = () => {
      if (video.currentTime >= CLIP_END || video.currentTime < CLIP_START - 0.25) {
        park();
      }
    };

    video.addEventListener("loadedmetadata", park);
    video.addEventListener("timeupdate", onTime);
    return () => {
      video.removeEventListener("loadedmetadata", park);
      video.removeEventListener("timeupdate", onTime);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={`cta-clip absolute inset-0 w-full h-full object-cover ${loaded ? "is-loaded" : ""}`}
      src={HERO_CLIP}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      onLoadedData={() => setLoaded(true)}
    ></video>
  );
}

export default function CTASection({
  eyebrow = "Ready when you are",
  title,
  titleLines,
  subtitle,
  primaryLabel = "Book Now",
  primaryTo = "/contact#book",
  secondaryLabel = "WhatsApp us",
  secondaryTo = "#whatsapp",
  cinematic = false,
}: CTASectionProps) {
  const isExternalSecondary = secondaryLabel === "WhatsApp us";

  return (
    <section className="section-xl bg-background-50">
      <div className="site-container">
        <Reveal>
          <div
            className={
              cinematic
                ? "relative overflow-hidden rounded-3xl bg-primary-950 px-5 sm:px-8 md:px-14 py-14 sm:py-20 md:py-24"
                : "relative"
            }
          >
            {cinematic && (
              <>
                <CtaClip />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,11,0.72)_0%,rgba(11,11,11,0.78)_55%,rgba(11,11,11,0.86)_100%)]"></div>
              </>
            )}

            <div className="relative z-10 mx-auto text-center flex flex-col items-center">
              <div
                className={`t-label stack-label inline-flex items-center gap-2 px-3 py-1 rounded-full ${
                  cinematic
                    ? "bg-white/10 border border-white/20 text-white"
                    : "bg-background-100 border border-background-200 text-foreground-700"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
                {eyebrow}
              </div>

              {titleLines ? (
                <Words
                  lines={titleLines}
                  accentClassName="text-accent-400"
                  className={`t-h2 max-w-3xl ${
                    cinematic ? "text-white" : "text-foreground-950"
                  }`}
                />
              ) : (
                <h2
                  className={`t-h2 max-w-3xl ${
                    cinematic ? "text-white" : "text-foreground-950"
                  }`}
                >
                  {title}
                </h2>
              )}

              {subtitle && (
                <p
                  className={`t-intro stack-sub ${
                    cinematic ? "!text-background-200" : "text-foreground-600"
                  }`}
                >
                  {subtitle}
                </p>
              )}

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <Link
                  to={primaryTo}
                  className="group btn btn-primary"
                >
                  {primaryLabel}
                  <i className="ri-arrow-right-line btn-arrow text-[16px]"></i>
                </Link>
                {isExternalSecondary ? (
                  <a
                    href="https://wa.me/256779847822"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn ${
                      cinematic
                        ? "border border-white/30 text-white hover:bg-white/10"
                        : "btn-secondary"
                    }`}
                  >
                    <i className="ri-whatsapp-line text-[16px]"></i>
                    {secondaryLabel}
                  </a>
                ) : (
                  <Link
                    to={secondaryTo}
                    className={`group btn ${
                      cinematic
                        ? "border border-white/30 text-white hover:bg-white/10"
                        : "btn-secondary"
                    }`}
                  >
                    {secondaryLabel}
                    <i className="ri-arrow-right-line btn-arrow text-[16px]"></i>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}