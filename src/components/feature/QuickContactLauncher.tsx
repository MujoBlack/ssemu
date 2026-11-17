import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { company } from "@/mocks/company";
import { team } from "@/mocks/team";

const SKY = "#2CA9E3";
const SKY_DARK = "#1A9AD6";
const EASE = "cubic-bezier(0.165,0.84,0.44,1)";

/**
 * Quick contact launcher — replaces the plain floating WhatsApp button.
 * Round sky-blue button bottom right; opens a small white card above it.
 */
export default function QuickContactLauncher() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <div
      ref={wrapRef}
      className="hidden lg:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3 pointer-events-none"
    >
      <div
        role="dialog"
        aria-label="Quick contact"
        aria-hidden={!open}
        className={`w-[288px] rounded-2xl bg-background-50 border border-background-200 p-2 shadow-[0_18px_50px_rgba(11,11,11,0.16)] origin-bottom-right ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
        style={{
          transitionProperty: "opacity, transform",
          transitionDuration: open ? "300ms" : "200ms",
          transitionTimingFunction: EASE,
        }}
      >
        <div className="flex items-center gap-2.5 px-3 pt-2.5 pb-3 mb-1 border-b border-background-200">
          <div className="flex -space-x-2 shrink-0">
            <img
              src={team[0].image}
              alt={`${team[0].name}, ${team[0].title}`}
              className="w-8 h-8 rounded-full object-cover object-top ring-2 ring-background-50"
            />
            <img
              src={team[1].image}
              alt={`${team[1].name}, ${team[1].title}`}
              className="w-8 h-8 rounded-full object-cover object-top ring-2 ring-background-50"
            />
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-foreground-950 leading-tight">
              Talk to our team
            </p>
            <p className="mt-0.5 text-[12px] text-foreground-600 leading-tight">
              We reply the same working day.
            </p>
          </div>
        </div>
        <a
          href={`https://wa.me/${company.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
          className="press flex items-center gap-3 px-3 py-3 rounded-xl text-[15px] font-medium text-foreground-900 hover:bg-secondary-100 transition-colors cursor-pointer"
        >
          <span className="w-9 h-9 flex items-center justify-center rounded-full bg-[#25D366]/10 text-[#1B9E4B] shrink-0">
            <i className="ri-whatsapp-line text-lg"></i>
          </span>
          <span className="whitespace-nowrap">WhatsApp us</span>
        </a>
        <a
          href={`tel:${company.primaryPhone.tel}`}
          onClick={close}
          className="press flex items-center gap-3 px-3 py-3 rounded-xl text-[15px] font-medium text-foreground-900 hover:bg-secondary-100 transition-colors cursor-pointer"
        >
          <span className="w-9 h-9 flex items-center justify-center rounded-full bg-accent-100 text-accent-700 shrink-0">
            <i className="ri-phone-line text-lg"></i>
          </span>
          <span className="whitespace-nowrap">Call {company.primaryPhone.label}</span>
        </a>
        <Link
          to="/contact#book"
          onClick={close}
          className="press flex items-center gap-3 px-3 py-3 rounded-xl text-[15px] font-medium text-foreground-900 hover:bg-secondary-100 transition-colors cursor-pointer"
        >
          <span className="w-9 h-9 flex items-center justify-center rounded-full bg-primary-950 text-white shrink-0">
            <i className="ri-file-list-3-line text-base"></i>
          </span>
          <span className="whitespace-nowrap">Request a quote</span>
        </Link>
      </div>

      <button
        type="button"
        aria-label={open ? "Close quick contact" : "Open quick contact"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="press relative w-14 h-14 flex items-center justify-center rounded-full text-[#0B0B0B] cursor-pointer btn-motion pointer-events-auto"
        style={{ backgroundColor: open ? SKY_DARK : SKY }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = SKY_DARK;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = open ? SKY_DARK : SKY;
        }}
      >
        <span className="relative block w-6 h-6" aria-hidden="true">
          <i
            className="ri-chat-3-line absolute inset-0 flex items-center justify-center text-2xl"
            style={{
              opacity: open ? 0 : 1,
              transitionProperty: "opacity",
              transitionDuration: "0.4s",
              transitionTimingFunction: EASE,
            }}
          ></i>
          <i
            className="ri-close-line absolute inset-0 flex items-center justify-center text-2xl"
            style={{
              opacity: open ? 1 : 0,
              transitionProperty: "opacity",
              transitionDuration: "0.4s",
              transitionTimingFunction: EASE,
            }}
          ></i>
        </span>
      </button>
    </div>
  );
}