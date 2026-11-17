import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { company, navItems } from "@/mocks/company";
import { services } from "@/mocks/services";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const EASE = "cubic-bezier(0.165,0.84,0.44,1)";

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [servicesOpen, setServicesOpen] = useState(false);

  // Lock the page behind the sheet: freeze the body in place, remember the
  // scroll offset, and put the page back exactly where it was on close.
  useEffect(() => {
    if (!open) return undefined;
    const body = document.body;
    const scrollY = window.scrollY;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    body.classList.add("menu-open");

    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      body.classList.remove("menu-open");

      const html = document.documentElement;
      const previousBehaviour = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      window.scrollTo(0, scrollY);
      html.style.scrollBehavior = previousBehaviour;
    };
  }, [open]);

  useEffect(() => {
    if (!open) setServicesOpen(false);
  }, [open]);

  return (
    <>
      {/* Dim layer behind the sheet */}
      <div
        aria-hidden="true"
        onMouseDown={onClose}
        className="mobile-sheet-dim fixed inset-0 lg:hidden"
        style={{
          backgroundColor: "rgba(11,11,11,0.35)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transitionProperty: "opacity",
          transitionDuration: open ? "0.4s" : "0.25s",
          transitionTimingFunction: EASE,
        }}
      ></div>

      {/* Solid white sheet sliding down from under the header pill */}
      <div
        className={`mobile-sheet fixed left-3 right-3 bottom-0 lg:hidden overflow-y-auto scroll-clean rounded-b-[22px] bg-white ${
          open ? "" : "pointer-events-none"
        }`}
        style={{
          top: "68px",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-14px)",
          transitionProperty: "opacity, transform",
          transitionDuration: open ? "0.4s" : "0.25s",
          transitionTimingFunction: EASE,
          boxShadow: open ? "0 24px 60px rgba(11,11,11,0.22)" : "none",
        }}
        aria-hidden={!open}
        inert={!open}
      >
        <nav className="px-5 pt-2 pb-6" aria-label="Mobile navigation">
          {navItems.map((item, i) => {
            const delay = open ? `${i * 40}ms` : "0ms";
            const anim = {
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(8px)",
              transitionProperty: "opacity, transform",
              transitionDuration: "0.4s",
              transitionDelay: delay,
              transitionTimingFunction: EASE,
            };

            if (item.label === "Services") {
              return (
                <div key={item.to} style={anim}>
                  <div className="flex items-center h-14 border-b border-[#0B0B0B]/10">
                    <NavLink
                      to={item.to}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `relative flex-1 flex items-center h-14 pl-3 text-[20px] font-semibold transition-colors duration-200 ${
                          isActive
                            ? "text-[#1A9AD6] bg-gradient-to-r from-[rgba(44,169,227,0.10)] to-transparent"
                            : "text-[#0B0B0B]"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span
                            aria-hidden="true"
                            className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-full bg-[#2CA9E3] transition-opacity duration-200 ${
                              isActive ? "opacity-100" : "opacity-0"
                            }`}
                          ></span>
                          Services
                        </>
                      )}
                    </NavLink>
                    <button
                      type="button"
                      aria-label={servicesOpen ? "Hide services" : "Show services"}
                      aria-expanded={servicesOpen}
                      onClick={() => setServicesOpen((v) => !v)}
                      className="press w-10 h-10 flex items-center justify-center rounded-full text-[#0B0B0B] hover:bg-[#F4F9FC] cursor-pointer"
                    >
                      <i
                        className="ri-arrow-down-s-line text-[20px]"
                        style={{
                          display: "inline-block",
                          transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transitionProperty: "transform",
                          transitionDuration: "0.3s",
                          transitionTimingFunction: EASE,
                        }}
                      ></i>
                    </button>
                  </div>

                  <div
                    className="overflow-hidden"
                    style={{
                      maxHeight: servicesOpen ? "460px" : "0px",
                      opacity: servicesOpen ? 1 : 0,
                      transitionProperty: "max-height, opacity",
                      transitionDuration: "0.35s",
                      transitionTimingFunction: EASE,
                    }}
                  >
                    <div className="py-2">
                      {services.map((s) => (
                        <Link
                          key={s.id}
                          to={`/services#${s.id}`}
                          onClick={onClose}
                          className="flex items-center gap-3 py-2.5 px-1 rounded-xl hover:bg-[#F4F9FC] cursor-pointer"
                        >
                          <span
                            className="w-8 h-8 flex items-center justify-center rounded-full shrink-0"
                            style={{ backgroundColor: "rgba(44,169,227,0.12)", color: "#1A9AD6" }}
                          >
                            <i className={`${s.icon} text-[15px]`}></i>
                          </span>
                          <span className="text-[15px] font-medium text-[#0B0B0B] leading-snug">
                            {s.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={onClose}
                style={anim}
                className={({ isActive }) =>
                  `relative flex items-center h-14 pl-3 text-[20px] font-semibold border-b border-[#0B0B0B]/10 transition-colors duration-200 ${
                    isActive
                      ? "text-[#1A9AD6] bg-gradient-to-r from-[rgba(44,169,227,0.10)] to-transparent"
                      : "text-[#0B0B0B]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-full bg-[#2CA9E3] transition-opacity duration-200 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    ></span>
                    {item.label}
                  </>
                )}
              </NavLink>
            );
          })}

          {/* Bottom actions */}
          <div
            className="mt-6 flex items-stretch gap-2"
            style={{
              opacity: open ? 1 : 0,
              transitionProperty: "opacity",
              transitionDuration: "0.4s",
              transitionDelay: open ? "280ms" : "0ms",
              transitionTimingFunction: EASE,
            }}
          >
            <a
              href={`tel:${company.primaryPhone.tel}`}
              onClick={onClose}
              className="btn btn-secondary flex-1"
              style={{ height: "48px", minHeight: "48px" }}
            >
              Call us
            </a>
            <Link
              to="/contact#book"
              onClick={onClose}
              className="group btn btn-primary flex-1"
              style={{ height: "48px", minHeight: "48px" }}
            >
              Book Now
              <i className="ri-arrow-right-line btn-arrow text-[16px]"></i>
            </Link>
          </div>

          <div className="mt-5 flex flex-col gap-2 text-sm leading-relaxed text-[#6B757D]">
            <a
              href={`https://wa.me/${company.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-[#0B0B0B] transition-colors duration-200 cursor-pointer"
            >
              <i className="ri-whatsapp-line text-[16px]"></i>
              WhatsApp {company.whatsappLabel}
            </a>
            <p className="flex items-start gap-2">
              <i className="ri-map-pin-line text-[16px] mt-0.5 shrink-0"></i>
              <span>
                {company.offices[0].lines[0]}
                <br />
                {company.offices[0].lines[1]}
              </span>
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}