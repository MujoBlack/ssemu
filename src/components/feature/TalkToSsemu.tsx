import { Link } from "react-router-dom";
import { company } from "@/mocks/company";
import Reveal from "@/components/base/Reveal";

export default function TalkToSsemu() {
  return (
    <section className="relative z-10 bg-background-50 pt-8 md:pt-12 pb-4 md:pb-6">
      <div className="site-container">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-[#0B0B0B] text-white px-6 sm:px-10 md:px-16 py-12 sm:py-16 md:py-24">
            <span className="t-label inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-400"></span>
              Talk to Ssemu
            </span>

            <h2 className="t-h1 mt-6 md:mt-8 max-w-4xl text-white">
              Let&rsquo;s make your space{" "}
              <span className="text-accent-400">spotless.</span>
            </h2>

            <p className="t-body mt-5 md:mt-6 max-w-xl !text-background-300">
              Tell us about the space and we&rsquo;ll come back with a free,
              clear quote — usually the same day.
            </p>

            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link to="/contact#book" className="group btn btn-primary btn-lg">
                Book a site visit
                <i className="ri-arrow-right-line btn-arrow text-[16px]"></i>
              </Link>
              <a
                href={`https://wa.me/${company.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg border border-white/30 text-white hover:bg-white/10"
              >
                <i className="ri-whatsapp-line text-[17px]"></i>
                WhatsApp us
              </a>
            </div>

            <div className="mt-10 md:mt-14 pt-8 md:pt-10 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
              <div>
                <p className="t-label text-background-400">Call us</p>
                <a
                  href={`tel:${company.primaryPhone.tel}`}
                  className="mt-2 inline-flex items-center gap-2 font-heading font-semibold text-2xl md:text-3xl text-white hover:text-accent-400 transition-colors cursor-pointer"
                >
                  {company.primaryPhone.label}
                </a>
              </div>
              <div>
                <p className="t-label text-background-400">Email us</p>
                <a
                  href={`mailto:${company.email}`}
                  className="mt-2 inline-flex items-center gap-2 font-heading font-semibold text-xl sm:text-2xl md:text-3xl text-white hover:text-accent-400 transition-colors break-all cursor-pointer"
                >
                  {company.email}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}