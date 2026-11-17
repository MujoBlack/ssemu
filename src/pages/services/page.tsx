import { Link } from "react-router-dom";
import PageHero from "@/components/feature/PageHero";
import { services } from "@/mocks/services";
import { company } from "@/mocks/company";
import Words from "@/components/base/Words";
import Reveal from "@/components/base/Reveal";
import CheckList from "@/components/base/CheckList";
import GrowOnScroll from "@/components/base/GrowOnScroll";

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        titleLines={[
          { text: "Everything you need," },
          { text: "under one team.", accent: true },
        ]}
        intro="Cleaning, fumigation, waste and high-rise window cleaning across Kampala."
        image="/media/stock-ssemu-services-hero-01.webp"
        imageAlt="Ssemu cleaning team working in a bright modern lobby"
        primaryLabel="Request a quote"
        secondaryLabel="Talk to us"
        secondaryTo="/contact"
      />

      <section className="section-md bg-background-50">
        <div className="site-container">
          <div className="flex flex-col gap-16 md:gap-24">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 100}>
              <div id={s.id} className="group grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
                <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <GrowOnScroll>
                    <div className="relative rounded-2xl overflow-hidden bg-background-200 card-lift">
                      <img
                        src={s.image}
                        alt={s.imageAlt}
                        loading="lazy"
                        decoding="async"
                        className="w-full aspect-[4/3] object-cover object-center"
                      />
                      <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[12px] text-foreground-800 uppercase tracking-[0.06em]">
                        <i className={`${s.icon} text-accent-600`}></i>
                        {s.tag}
                      </div>
                    </div>
                  </GrowOnScroll>
                </div>
                <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="t-label stack-label inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background-100 border border-background-200 text-foreground-600">
                    Service {String(i + 1).padStart(2, "0")}
                  </div>
                  <Words
                    lines={[{ text: s.title }]}
                    className="t-h2 text-foreground-950"
                  />
                  <p className="t-body mt-5 text-foreground-600">{s.description}</p>

                  <p className="t-label mt-6 text-foreground-500">What's included</p>
                  <CheckList items={s.includes} />

                  <Link
                    to={`/contact?service=${encodeURIComponent(s.quote)}#book`}
                    className="group btn btn-primary mt-8"
                  >
                    Request a quote
                    <i className="ri-arrow-right-line btn-arrow text-[16px]"></i>
                  </Link>
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-md bg-background-100">
        <div className="site-container">
          <Reveal>
          <div className="rounded-2xl border border-background-200 bg-background-50 p-6 sm:p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6">
            <span className="w-14 h-14 flex items-center justify-center rounded-2xl bg-accent-500 text-[#0B0B0B] shrink-0">
              <i className="ri-shield-check-line text-2xl"></i>
            </span>
            <div className="flex-1">
              <h3 className="t-h3 text-foreground-950">
                Qualified, insured and registered
              </h3>
              <p className="t-body mt-2 text-foreground-600">
                {company.licence}. Our crews are trained in safe working at height,
                chemical handling and pest control, and every job is supervised.
              </p>
            </div>
            <a
              href={`tel:${company.primaryPhone.tel}`}
              className="btn btn-dark shrink-0"
            >
              <i className="ri-phone-line text-[16px]"></i>
              {company.primaryPhone.label}
            </a>
          </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}