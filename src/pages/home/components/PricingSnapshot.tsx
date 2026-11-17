import { Link } from "react-router-dom";
import { priceRows } from "@/mocks/pricing";
import { company } from "@/mocks/company";
import Words from "@/components/base/Words";
import Reveal from "@/components/base/Reveal";

export default function PricingSnapshot() {
  return (
    <section className="section-xl bg-background-100">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="t-label stack-label inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background-50 border border-background-200 text-foreground-700">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
                Our service menu
              </div>
            </Reveal>
            <Words
              lines={[
                { text: "Every job," },
                { text: "clearly quoted.", accent: true },
              ]}
              className="t-h2 text-foreground-950"
            />
            <Reveal delay={120}>
              <p className="t-body stack-sub text-foreground-600">
                We quote every job for free, based on the size of the space and the
                work needed — so there are never any surprises.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact#book"
                  className="group btn btn-primary"
                >
                  Request a Quote
                  <i className="ri-arrow-right-up-line arrow-nudge"></i>
                </Link>
                <a
                  href={`tel:${company.primaryPhone.tel}`}
                  className="btn btn-secondary"
                >
                  <i className="ri-phone-fill text-accent-600"></i> Call us
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="lg:col-span-7">
            <div className="rounded-2xl bg-background-50 border border-background-200 overflow-hidden">
              <div className="t-label hidden sm:flex px-5 md:px-7 py-4 text-foreground-500 border-b border-background-200">
                <div className="flex-1">Service</div>
                <div className="w-28 text-right">Price</div>
              </div>
              {priceRows.map((r) => (
                <div
                  key={r.service}
                  className="flex items-center gap-3 px-4 sm:px-5 md:px-7 py-4 sm:py-5 border-b border-background-200 last:border-b-0 hover:bg-background-100 transition-colors"
                >
                  <span className="w-9 h-9 flex items-center justify-center rounded-full bg-background-100 text-accent-700 shrink-0">
                    <i className={`${r.icon}`}></i>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="t-card font-semibold text-foreground-950">{r.service}</p>
                    <p className="mt-0.5 text-xs md:text-[15px] text-foreground-600 leading-snug">{r.note}</p>
                  </div>
                  <div className="shrink-0 w-24 sm:w-28 text-right">
                    <span className="text-sm sm:text-base md:text-lg font-heading font-semibold text-accent-700 whitespace-nowrap">
                      {r.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-foreground-500 leading-relaxed">
              Every quote is free and based on the size of the space and the work
              needed.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}