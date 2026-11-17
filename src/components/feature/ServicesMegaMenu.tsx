import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { company } from "@/mocks/company";
import { services } from "@/mocks/services";

interface ServicesMegaMenuProps {
  open: boolean;
  onClose: () => void;
  onEnter: () => void;
  onLeave: () => void;
}

const EASE = "cubic-bezier(0.165,0.84,0.44,1)";

const TRUST_POINTS = [
  "Free site visit",
  "Quote within 24 hours",
  "Trained, supervised staff",
];

export default function ServicesMegaMenu({
  open,
  onClose,
  onEnter,
  onLeave,
}: ServicesMegaMenuProps) {
  // The 30ms tile stagger only runs on open — afterwards delays are cleared so
  // hover colours stay instant.
  const [staggered, setStaggered] = useState(false);

  useEffect(() => {
    if (!open) {
      setStaggered(false);
      return undefined;
    }
    const timer = window.setTimeout(() => setStaggered(true), 420);
    return () => window.clearTimeout(timer);
  }, [open]);

  return (
    <div
      className={`mega-panel relative ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      style={{
        paddingTop: "8px",
        transformOrigin: "top center",
        opacity: open ? 1 : 0,
        transform: open ? "translateY(0)" : "translateY(-8px)",
        transitionProperty: "opacity, transform",
        transitionDuration: open ? "0.28s" : "0.2s",
        transitionTimingFunction: EASE,
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      inert={!open}
    >
      <div
        role="region"
        aria-label="Services menu"
        className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-3 rounded-[24px] bg-white p-3"
        style={{ boxShadow: "0 24px 70px rgba(11,11,11,0.16)" }}
      >
        {/* Tile grid — 3 x 2 */}
        <div className="flex flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-1">
          {services.map((s, i) => (
            <Link
              key={s.id}
              to={`/services#${s.id}`}
              onClick={onClose}
              className="mega-tile group relative flex flex-col gap-2 rounded-2xl p-4 pr-12 outline-none transition-colors duration-200 hover:bg-[#E9F4FB] focus-visible:bg-[#E9F4FB] cursor-pointer"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(6px)",
                transitionProperty: "opacity, transform, background-color",
                transitionDuration: "0.28s",
                transitionDelay: open && !staggered ? `${i * 30}ms` : "0ms",
                transitionTimingFunction: EASE,
              }}
            >
              <span
                aria-hidden="true"
                className="w-9 h-9 flex items-center justify-center rounded-full"
                style={{ backgroundColor: "rgba(44,169,227,0.12)", color: "#1A9AD6" }}
              >
                <i className={`${s.icon} text-[16px]`}></i>
              </span>

              <span className="block text-[16px] font-semibold leading-snug text-[#0B0B0B]">
                {s.title}
              </span>
              <span className="block text-[15px] leading-snug text-[#5B6670] line-clamp-1">
                {s.description}
              </span>

              <span
                aria-hidden="true"
                className="absolute right-3 top-3 w-8 h-8 flex items-center justify-center rounded-full border border-[#0B0B0B]/15 bg-white transition-colors duration-200 group-hover:border-[#0B0B0B] group-hover:bg-[#0B0B0B]"
              >
                <i className="ri-arrow-right-up-line text-[15px] text-[#0B0B0B] transition-transform duration-200 group-hover:text-white group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"></i>
              </span>
            </Link>
          ))}
          </div>

          <Link
            to="/services"
            onClick={onClose}
            className="group press mt-1 inline-flex items-center gap-1.5 self-start px-4 py-2 rounded-full text-[13px] font-semibold text-[#0B0B0B] hover:text-[#1A9AD6] transition-colors duration-200 cursor-pointer"
          >
            View all services
            <i className="ri-arrow-right-line arrow-nudge text-[14px]"></i>
          </Link>
        </div>

        {/* Quote card */}
        <div
          className="flex flex-col justify-between rounded-[20px] p-5"
          style={{ backgroundColor: "#0B0B0B" }}
        >
          <div>
            <p className="text-[20px] font-semibold leading-tight text-white">
              Get a free quote
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-white/70">
              We visit, assess and quote within 24 hours.
            </p>

            <ul className="mt-4 flex flex-col gap-2">
              {TRUST_POINTS.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-[15px] leading-snug text-white/80"
                >
                  <i className="ri-check-line text-[15px] text-accent-400 mt-0.5 shrink-0"></i>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5">
            <Link
              to="/contact#book"
              onClick={onClose}
              className="group btn btn-primary w-full"
            >
              Book a site visit
              <i className="ri-arrow-right-line btn-arrow text-[16px]"></i>
            </Link>

            <a
              href={`https://wa.me/${company.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-2 w-full text-white hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.45)" }}
            >
              <i className="ri-whatsapp-line text-[16px]"></i>
              WhatsApp us
            </a>

            <a
              href={`tel:${company.primaryPhone.tel}`}
              className="press mt-3 flex items-center justify-center gap-1.5 text-[15px] font-medium text-white/70 hover:text-white transition-colors duration-200 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-phone-line text-[14px]"></i>
              {company.primaryPhone.label}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}