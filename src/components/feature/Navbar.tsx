import { Fragment, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { company, navItems } from "@/mocks/company";
import ServicesMegaMenu from "@/components/feature/ServicesMegaMenu";
import MobileMenu from "@/components/feature/MobileMenu";

const LOGO_BLACK =
  "/media/ssemu-logo.webp";

const SOCIAL_LINKS = [
  { label: "Facebook", icon: "ri-facebook-fill", url: "https://www.facebook.com/" },
  { label: "Instagram", icon: "ri-instagram-line", url: "https://www.instagram.com/" },
  { label: "LinkedIn", icon: "ri-linkedin-fill", url: "https://www.linkedin.com/" },
];

const SKY = "#2CA9E3";
const SKY_DARK = "#1A9AD6";
const EASE = "cubic-bezier(0.165,0.84,0.44,1)";

/** Grows from the left on hover, sky-blue dot marks the active page. */
function NavUnderline({ isActive }: { isActive: boolean }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="nav-underline pointer-events-none absolute left-2.5 xl:left-3 right-2.5 xl:right-3 bottom-[2px] h-[2px] origin-center scale-x-0 group-hover:scale-x-100 rounded-full"
        style={{
          backgroundColor: SKY,
          transitionProperty: "transform",
          transitionDuration: "0.45s",
          transitionTimingFunction: "cubic-bezier(0.35,1.5,0.6,1)",
        }}
      ></span>
      <span
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 bottom-[6px] w-[4px] h-[4px] rounded-full"
        style={{ backgroundColor: SKY, opacity: isActive ? 1 : 0 }}
      ></span>
    </>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [merged, setMerged] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const mergedRef = useRef(false);
  const closeTimer = useRef<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  }, []);

  const openMenu = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setServicesOpen(true);
  };

  // 120ms hover intent so diagonal mouse moves don't flicker the panel shut.
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 120);
  };

  // Close on a click anywhere outside the panel / trigger.
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (target instanceof Element && target.closest("[data-services-menu]")) return;
      setServicesOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // Reads the exact same scroll position the hero video scrub uses (window.scrollY).
  // Merge fires on the first wheel click (> 60px) and only splits back below 20px,
  // so the 40px gap stops it flickering at the switch point.
  useEffect(() => {
    const MERGE_AT = 60;
    const SPLIT_AT = 20;
    let raf = 0;
    const tick = () => {
      const y = window.scrollY;
      const next = mergedRef.current ? y > SPLIT_AT : y > MERGE_AT;
      if (next !== mergedRef.current) {
        mergedRef.current = next;
        setMerged(next);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setServicesOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const bookNow = (extra: string) => (
    <Link
      to="/contact#book"
      className={`press group inline-flex items-center justify-center gap-1.5 rounded-full font-semibold text-[#0B0B0B] whitespace-nowrap hdr-fast hdr-focus cursor-pointer ${extra}`}
      style={{ backgroundColor: SKY }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = SKY_DARK;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = SKY;
      }}
    >
      Book Now
      <i className="ri-arrow-right-line text-[15px] btn-arrow"></i>
    </Link>
  );

  return (
    <header className="fixed top-3 lg:top-4 inset-x-0 z-50 pointer-events-none">
      {/* Page dims behind the open services panel */}
      <div
        aria-hidden="true"
        onMouseDown={() => setServicesOpen(false)}
        className="hidden lg:block fixed inset-0"
        style={{
          backgroundColor: "rgba(11,11,11,0.25)",
          opacity: servicesOpen ? 1 : 0,
          pointerEvents: servicesOpen ? "auto" : "none",
          transitionProperty: "opacity",
          transitionDuration: servicesOpen ? "0.28s" : "0.2s",
          transitionTimingFunction: EASE,
        }}
      ></div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:block">
        <div className="mx-auto w-full max-w-[1240px] px-4 md:px-6 lg:px-8 xl:px-3">
          <div
            className={`relative pointer-events-auto flex items-center justify-between h-16 rounded-full hdr-anim ${
              merged
                ? "bg-white/85 shadow-[0_8px_30px_rgba(11,11,11,0.08)]"
                : "bg-transparent shadow-none"
            }`}
            style={{
              backdropFilter: merged ? "saturate(1.8) blur(20px)" : "none",
              WebkitBackdropFilter: merged ? "saturate(1.8) blur(20px)" : "none",
            }}
          >
            {/* Left pill — logo + divider + socials */}
            <div
              className={`flex items-center gap-3 h-16 pl-4 pr-3 rounded-full shrink-0 hdr-anim ${
                merged
                  ? "bg-transparent shadow-none"
                  : "bg-white/90 shadow-[0_8px_30px_rgba(11,11,11,0.08)]"
              }`}
            >
              <Link
                to="/"
                aria-label={`${company.name} home`}
                className="flex items-center shrink-0 hdr-focus rounded-md cursor-pointer"
              >
                <img src={LOGO_BLACK} alt={`${company.name} logo`} className="h-8 w-auto" />
              </Link>

              <span
                aria-hidden="true"
                className="w-px h-5 shrink-0"
                style={{ backgroundColor: "rgba(11,11,11,0.14)" }}
              ></span>

              <div className="flex items-center gap-0.5">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-7 h-7 flex items-center justify-center rounded-full text-[13px] hdr-fast hdr-focus cursor-pointer text-[#0B0B0B] hover:bg-[#0B0B0B]/[0.06]"
                  >
                    <i className={s.icon}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Right pill — nav + phone + book now */}
            <div
              className={`flex items-center gap-1.5 h-16 pl-3 pr-2 rounded-full shrink-0 hdr-anim ${
                merged
                  ? "bg-transparent shadow-none"
                  : "bg-white/90 shadow-[0_8px_30px_rgba(11,11,11,0.08)]"
              }`}
            >
              <nav className="flex items-center" aria-label="Main navigation">
                {navItems.map((item) =>
                  item.label === "Services" ? (
                    <Fragment key={item.to}>
                    <div
                      data-services-menu
                      onMouseEnter={openMenu}
                      onMouseLeave={scheduleClose}
                      onFocus={openMenu}
                      onBlur={(e) => {
                        const next = e.relatedTarget as Node | null;
                        if (next && next instanceof Element && next.closest("[data-services-menu]")) return;
                        setServicesOpen(false);
                      }}
                    >
                      <NavLink
                        to={item.to}
                        onClick={(e) => {
                          e.preventDefault();
                          openMenu();
                        }}
                        aria-haspopup="true"
                        aria-expanded={servicesOpen}
                        className={({ isActive }) =>
                          `group relative inline-flex items-center gap-1 px-2.5 xl:px-3 py-2 text-[13px] font-medium whitespace-nowrap hdr-fast hdr-focus cursor-pointer text-[#0B0B0B] ${
                            isActive ? "opacity-100" : "opacity-75 hover:opacity-100"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {item.label}
                            <i
                              aria-hidden="true"
                              className="ri-arrow-down-s-line text-[14px]"
                              style={{
                                transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                                transitionProperty: "transform",
                                transitionDuration: "0.3s",
                                transitionTimingFunction: EASE,
                              }}
                            ></i>
                            <NavUnderline isActive={isActive} />
                          </>
                        )}
                      </NavLink>
                    </div>

                    {/* Panel sits right after the trigger so Tab walks the tiles.
                        Same width as the pill. */}
                    <div
                      data-services-menu
                      className="absolute inset-x-0 top-full pointer-events-none"
                      onBlur={(e) => {
                        const next = e.relatedTarget as Node | null;
                        if (next && next instanceof Element && next.closest("[data-services-menu]")) return;
                        setServicesOpen(false);
                      }}
                    >
                      <ServicesMegaMenu
                        open={servicesOpen}
                        onClose={() => setServicesOpen(false)}
                        onEnter={openMenu}
                        onLeave={scheduleClose}
                      />
                    </div>
                    </Fragment>
                  ) : (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === "/"}
                      className={({ isActive }) =>
                        `group relative px-2.5 xl:px-3 py-2 text-[13px] font-medium whitespace-nowrap hdr-fast hdr-focus cursor-pointer text-[#0B0B0B] ${
                          isActive ? "opacity-100" : "opacity-75 hover:opacity-100"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {item.label}
                          <NavUnderline isActive={isActive} />
                        </>
                      )}
                    </NavLink>
                  )
                )}
              </nav>

              <a
                href={`tel:${company.primaryPhone.tel}`}
                className="inline-flex items-center gap-1.5 px-3.5 h-9 rounded-full text-[13px] font-medium whitespace-nowrap hdr-fast hdr-focus cursor-pointer text-[#0B0B0B] border border-[#0B0B0B]/20 hover:bg-[#F4F9FC]"
              >
                <i className="ri-phone-line text-[14px]"></i>
                {company.primaryPhone.label}
              </a>

              {bookNow("px-4 h-10 text-[13px]")}
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="lg:hidden px-3">
        <div className="relative pointer-events-auto">
          <div
            className={`relative z-10 flex items-center justify-between h-14 pl-4 pr-2 hdr-fast ${
              open ? "rounded-t-[22px]" : "rounded-full"
            }`}
            style={{ backgroundColor: open ? "#0B0B0B" : "rgba(11,11,11,0.92)" }}
          >
            <Link
              to="/"
              aria-label={`${company.name} home`}
              className="flex items-center shrink-0 hdr-focus rounded-md cursor-pointer py-1"
              onClick={() => setOpen(false)}
            >
              <span className="font-heading font-extrabold text-white text-[19px] tracking-tight">
                SSEMU
              </span>
            </Link>

            <div className="flex items-center gap-1.5">
              {bookNow("px-3 h-9 text-xs")}
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="press w-11 h-11 flex items-center justify-center rounded-full hdr-focus cursor-pointer"
              >
                <span className="relative block w-5 h-4" aria-hidden="true">
                  <span
                    className={`absolute left-0 top-1/2 -mt-[0.75px] block w-5 h-[1.5px] bg-white rounded-full ${
                      open ? "translate-y-0 rotate-45" : "-translate-y-[6px] rotate-0"
                    }`}
                    style={{
                      transitionProperty: "transform, opacity",
                      transitionDuration: "0.3s",
                      transitionTimingFunction: EASE,
                    }}
                  ></span>
                  <span
                    className={`absolute left-0 top-1/2 -mt-[0.75px] block w-5 h-[1.5px] bg-white rounded-full ${
                      open ? "opacity-0" : "opacity-100"
                    }`}
                    style={{
                      transitionProperty: "transform, opacity",
                      transitionDuration: "0.3s",
                      transitionTimingFunction: EASE,
                    }}
                  ></span>
                  <span
                    className={`absolute left-0 top-1/2 -mt-[0.75px] block w-5 h-[1.5px] bg-white rounded-full ${
                      open ? "translate-y-0 -rotate-45" : "translate-y-[6px] rotate-0"
                    }`}
                    style={{
                      transitionProperty: "transform, opacity",
                      transitionDuration: "0.3s",
                      transitionTimingFunction: EASE,
                    }}
                  ></span>
                </span>
              </button>
            </div>
          </div>

          <MobileMenu open={open} onClose={() => setOpen(false)} />
        </div>
      </div>
    </header>
  );
}