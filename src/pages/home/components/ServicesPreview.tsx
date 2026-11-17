import { Link } from "react-router-dom";
import { services } from "@/mocks/services";
import TiltCard from "@/components/base/TiltCard";
import Words from "@/components/base/Words";
import Reveal from "@/components/base/Reveal";

export default function ServicesPreview() {
  return (
    <section className="section-xl bg-background-50">
      <div className="site-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <div className="flex flex-col items-start">
            <Reveal>
              <div className="t-label stack-label inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background-100 border border-background-200 text-foreground-700">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
                What we do
              </div>
            </Reveal>
            <Words
              lines={[
                { text: "Spotless spaces, delivered" },
                { text: "safely and professionally.", accent: true },
              ]}
              className="t-h2 text-foreground-950"
            />
            <Reveal delay={120}>
              <p className="t-body stack-sub text-foreground-600">
                Offices, homes, institutions, hotels and events across Kampala and Uganda.
              </p>
            </Reveal>
          </div>
          <Reveal delay={200} className="self-start md:self-end">
            <Link
              to="/services"
              className="group btn btn-secondary"
            >
              See all services
              <i className="ri-arrow-right-line arrow-nudge"></i>
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-gap">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 100} className="h-full">
              <TiltCard className="rounded-2xl h-full" rotation={6} scale={1.015}>
                <article className="group relative flex flex-col rounded-2xl overflow-hidden bg-background-100 border border-background-200 card-lift h-full">
                  <div className="relative aspect-[4/3] overflow-hidden bg-background-200">
                    <img
                      src={s.image}
                      alt={s.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[12px] text-foreground-800 uppercase tracking-[0.06em]">
                      <i className={`${s.icon} text-accent-600`}></i>
                      {s.tag}
                    </div>
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-accent-500 text-[#0B0B0B] text-xs font-semibold whitespace-nowrap">
                      Free quote
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="t-h3 text-foreground-950">{s.title}</h3>
                    <p className="t-card mt-2 text-foreground-600">{s.description}</p>
                    <div className="mt-5 flex items-center justify-between">
                      <Link
                        to="/contact#book"
                        className="group/btn press inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 hover:text-accent-800 btn-motion cursor-pointer whitespace-nowrap"
                      >
                        Request a quote
                        <i className="ri-arrow-right-line arrow-nudge"></i>
                      </Link>
                      <Link
                        to="/services"
                        aria-label={`Learn more about ${s.title}`}
                        className="press w-8 h-8 flex items-center justify-center rounded-full bg-background-200 text-foreground-800 hover:bg-accent-500 hover:text-[#0B0B0B] btn-motion cursor-pointer shrink-0"
                      >
                        <i className="ri-arrow-right-up-line"></i>
                      </Link>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}