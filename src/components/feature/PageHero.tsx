import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import Words, { type WordLine } from "@/components/base/Words";

interface PageHeroProps {
  eyebrow: string;
  titleLines: WordLine[];
  intro: string;
  image: string;
  imageAlt: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  /** Focal point on phones — keeps faces to the right / top of the card. */
  focusMobile?: string;
  /** Focal point from tablet up — faces sit right of the text column. */
  focusDesktop?: string;
}

/**
 * The one hero used by every inner page (services, about, team, blog,
 * blog posts, contact). The text always sits on the photo inside a
 * rounded card; only the photo, eyebrow, title, subline and button
 * labels change between pages. The home page has its own hero.
 */
export default function PageHero({
  eyebrow,
  titleLines,
  intro,
  image,
  imageAlt,
  primaryLabel = "Book Now",
  primaryTo = "/contact#book",
  secondaryLabel,
  secondaryTo,
  focusMobile = "78% 16%",
  focusDesktop = "72% 36%",
}: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero-inner">
        <div
          className="page-hero-card"
          style={
            {
              "--ph-pos-m": focusMobile,
              "--ph-pos-d": focusDesktop,
            } as CSSProperties
          }
        >
          <img
            src={image}
            alt={imageAlt}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="page-hero-card-img"
          />
          <div aria-hidden="true" className="page-hero-card-shade"></div>

          <div className="page-hero-body">
            <span className="page-hero-pill">
              <span aria-hidden="true" className="page-hero-dot"></span>
              {eyebrow}
            </span>

            <Words
              as="h1"
              lines={titleLines}
              accentClassName="page-hero-accent"
              className="page-hero-h1"
            />

            <p className="page-hero-sub">{intro}</p>

            <div className="page-hero-actions">
              <Link to={primaryTo} className="group btn btn-primary press">
                {primaryLabel}
                <i className="ri-arrow-right-line btn-arrow text-[16px]"></i>
              </Link>
              {secondaryLabel && secondaryTo && (
                <Link to={secondaryTo} className="group btn page-hero-sec press">
                  {secondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}