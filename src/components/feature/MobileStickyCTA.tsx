import { Link, useLocation } from "react-router-dom";
import { company } from "@/mocks/company";

export default function MobileStickyCTA() {
  const { pathname } = useLocation();
  if (pathname === "/contact") return null;
  return (
    <div className="mobile-sticky-cta lg:hidden fixed bottom-3 left-3 right-3 z-40">
      <div className="flex items-center gap-2 p-2 rounded-2xl bg-primary-950/95 backdrop-blur-md border border-primary-800/60">
        <a
          href={`https://wa.me/${company.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message Ssemu Cleaning Services on WhatsApp"
          className="press w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-[#25D366] hover:bg-white/15 transition-colors cursor-pointer"
        >
          <i className="ri-whatsapp-fill text-xl"></i>
        </a>
        <a
          href={`tel:${company.primaryPhone.tel}`}
          aria-label="Call Ssemu Cleaning Services"
          className="press w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/15 transition-colors cursor-pointer"
        >
          <i className="ri-phone-fill text-lg"></i>
        </a>
        <Link
          to="/contact#book"
          className="group flex-1 btn btn-primary"
          style={{ height: "48px", minHeight: "48px" }}
        >
          Book Now
          <i className="ri-arrow-right-line btn-arrow"></i>
        </Link>
      </div>
    </div>
  );
}