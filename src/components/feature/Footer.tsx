import { Link } from "react-router-dom";
import { company } from "@/mocks/company";

const LOGO_BLACK =
  "/media/ssemu-logo.webp";

const serviceLinks = [
  { label: "Office & commercial", to: "/services#office-commercial-cleaning" },
  { label: "Home cleaning", to: "/services#home-cleaning" },
  { label: "Fumigation & pest control", to: "/services#fumigation-pest-control" },
  { label: "Waste management", to: "/services#integrated-waste-management" },
  { label: "Scaffolding & high-rise", to: "/services#scaffolding-crane-high-rise" },
];

const companyLinks = [
  { label: "About us", to: "/about" },
  { label: "Our team", to: "/team" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
  { label: "Request a quote", to: "/contact#book" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 bg-background-50 pt-4 md:pt-6 pb-24 lg:pb-10">
      <div className="site-container">
        <div className="border-t border-background-200 pt-10 md:pt-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            <div className="sm:col-span-2 lg:col-span-4">
              <img
                src={LOGO_BLACK}
                alt={`${company.name} logo`}
                className="h-10 md:h-11 w-auto"
              />
              <p className="t-card mt-5 text-foreground-600 max-w-xs">
                {company.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                {company.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="press w-10 h-10 flex items-center justify-center rounded-full border border-background-200 text-foreground-700 hover:border-accent-500 hover:text-accent-700 transition-colors cursor-pointer"
                  >
                    <i className={`${s.icon} text-base`}></i>
                  </a>
                ))}
              </div>
            </div>

            <nav aria-label="Services" className="lg:col-span-3">
              <h4 className="t-label text-foreground-500">
                <Link to="/services" className="hover:text-accent-700 transition-colors cursor-pointer">Services</Link>
              </h4>
              <ul className="mt-4 space-y-2.5 t-card text-foreground-700">
                {serviceLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="hover:text-accent-700 transition-colors cursor-pointer"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Company" className="lg:col-span-2">
              <h4 className="t-label text-foreground-500">
                <Link to="/about" className="hover:text-accent-700 transition-colors cursor-pointer">Company</Link>
              </h4>
              <ul className="mt-4 space-y-2.5 t-card text-foreground-700">
                {companyLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="hover:text-accent-700 transition-colors cursor-pointer"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="lg:col-span-3">
              <h4 className="t-label text-foreground-500">
                <Link to="/contact" className="hover:text-accent-700 transition-colors cursor-pointer">Get in touch</Link>
              </h4>
              <ul className="mt-4 space-y-2.5 t-card text-foreground-700">
                <li>
                  <a
                    href={`tel:${company.primaryPhone.tel}`}
                    className="inline-flex items-center gap-2 hover:text-accent-700 transition-colors cursor-pointer"
                  >
                    <i className="ri-phone-line text-accent-700"></i>
                    {company.primaryPhone.label}
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${company.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-accent-700 transition-colors cursor-pointer"
                  >
                    <i className="ri-whatsapp-line text-accent-700"></i>
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${company.email}`}
                    className="inline-flex items-start gap-2 hover:text-accent-700 transition-colors cursor-pointer break-all"
                  >
                    <i className="ri-mail-line mt-0.5 text-accent-700"></i>
                    {company.email}
                  </a>
                </li>
                <li className="inline-flex items-start gap-2">
                  <i className="ri-mail-send-line mt-0.5 text-accent-700"></i>
                  {company.postal}
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 md:mt-14 pt-8 md:pt-10 border-t border-background-200 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
            {company.offices.map((o) => (
              <div key={o.name} className="flex items-start gap-3">
                <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-secondary-100 text-accent-700 shrink-0">
                  <i className="ri-map-pin-2-line"></i>
                </span>
                <div>
                  <p className="t-label text-foreground-500">{o.name}</p>
                  <p className="t-card mt-2 text-foreground-700">{o.lines.join(", ")}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 md:mt-10 pt-6 border-t border-background-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-foreground-500 text-center sm:text-left">
            <p>© 2026 {company.name}</p>
            <p className="inline-flex items-center gap-1.5">
              <i className="ri-check-line text-accent-600"></i>
              {company.tagline}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}