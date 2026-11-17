import { Link } from "react-router-dom";
import Words from "@/components/base/Words";
import Reveal from "@/components/base/Reveal";

const groups = [
  {
    title: "Offices & Banks",
    body: "Daily or weekly cleaning that keeps your workplace sharp.",
    icon: "ri-building-2-line",
    to: "/services#office-commercial-cleaning",
  },
  {
    title: "Homes",
    body: "Deep cleans and regular visits with safe sanitation chemicals.",
    icon: "ri-home-4-line",
    to: "/services#home-cleaning",
  },
  {
    title: "Schools & Institutions",
    body: "Large-scale cleaning, sanitation and fumigation for campuses.",
    icon: "ri-school-line",
    to: "/services#office-commercial-cleaning",
  },
  {
    title: "Hotels & Events",
    body: "Clean-as-you-go teams, hand-washing stations and post-event clean-up.",
    icon: "ri-hotel-line",
    to: "/services#event-cleaning-sanitation",
  },
];

export default function WhoWeServe() {
  return (
    <section className="section-lg bg-background-50 border-t border-background-200">
      <div className="site-container">
        <div className="mb-14 max-w-3xl">
          <Reveal>
            <div className="t-label stack-label inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background-100 border border-background-200 text-foreground-700">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
              Who we serve
            </div>
          </Reveal>
          <Words
            lines={[
              { text: "Cleaning for" },
              { text: "every kind of space.", accent: true },
            ]}
            className="t-h2 text-foreground-950"
          />
        </div>

        <div className="peek-row scroll-clean -mx-5 px-5 md:mx-0 md:px-0">
          {groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 100} className="h-full">
              <Link
                to={g.to}
                className="group flex flex-col h-full p-5 md:p-6 rounded-2xl bg-background-100 border border-background-200 card-lift cursor-pointer"
              >
                <span className="w-11 h-11 flex items-center justify-center rounded-full bg-accent-100 text-accent-700 shrink-0">
                  <i className={`${g.icon} text-lg`}></i>
                </span>
                <h3 className="t-h3 mt-4 text-foreground-950">
                  {g.title}
                </h3>
                <p className="t-card mt-2 text-foreground-600 flex-1">
                  {g.body}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700">
                  See service
                  <i className="ri-arrow-right-line arrow-nudge"></i>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}