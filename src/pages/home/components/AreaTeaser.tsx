import { Link } from "react-router-dom";
import { areas } from "@/mocks/area";
import Words from "@/components/base/Words";
import Reveal from "@/components/base/Reveal";

export default function AreaTeaser() {
  return (
    <section className="section-md bg-background-100">
      <div className="site-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <div>
            <Reveal>
              <div className="t-label stack-label inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background-50 border border-background-200 text-foreground-700">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
                Where we work
              </div>
            </Reveal>
            <Words
              lines={[
                { text: "Serving Kampala and beyond.", accentWords: ["Kampala"] },
              ]}
              className="t-h2 text-foreground-950 max-w-3xl"
            />
          </div>
          <Reveal delay={140} className="self-start md:self-end">
            <Link
              to="/contact"
              className="group btn btn-secondary"
            >
              Talk to us
              <i className="ri-arrow-right-line arrow-nudge"></i>
            </Link>
          </Reveal>
        </div>

        <div className="peek-row scroll-clean -mx-5 px-5 md:mx-0 md:px-0">
          {areas.map((a, i) => (
            <Reveal key={a.name} delay={i * 100} className="h-full">
              <div className="group relative rounded-2xl overflow-hidden border border-background-200 bg-background-50 h-full card-lift">
                <div className="relative aspect-[4/3] md:aspect-[3/4] overflow-hidden">
                  <img
                    src={a.image}
                    alt={`${a.name} — an area served by Ssemu Cleaning Services in Uganda`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-5">
                  <p className="t-h3 text-foreground-950">{a.name}</p>
                  <p className="t-card mt-1 text-foreground-600">{a.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}