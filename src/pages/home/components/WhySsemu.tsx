import { Link } from "react-router-dom";
import Words from "@/components/base/Words";
import Reveal from "@/components/base/Reveal";
import { useInView } from "@/hooks/useInView";

const rows = [
  {
    us: "Supervised, trained staff on every job",
    them: "Unsupervised casual workers",
  },
  {
    us: "Own professional equipment and chemicals",
    them: "You supply the materials",
  },
  {
    us: "Trained fumigators in full PPE",
    them: "Untrained, unprotected spraying",
  },
  {
    us: "Free, clear quote after a site visit",
    them: "Vague prices that change later",
  },
  {
    us: "We check the work with you before leaving",
    them: "Leave without a final check",
  },
];

export default function WhySsemu() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="section-md bg-background-100">
      <div className="site-container">
        <div className="max-w-3xl">
          <Reveal>
            <div className="t-label stack-label inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background-50 border border-background-200 text-foreground-700">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
              Why Ssemu
            </div>
          </Reveal>
          <Words
            lines={[
              { text: "The difference is" },
              { text: "in the details.", accent: true },
            ]}
            className="t-h2 text-foreground-950"
          />
        </div>

        <div
          ref={ref}
          className="stack-content grid grid-cols-1 md:grid-cols-2 grid-gap items-stretch"
        >
          {/* Ssemu column */}
          <div
            className="rounded-2xl p-5 md:p-7 text-white"
            style={{ backgroundColor: "#0B0B0B" }}
          >
            <div className="flex items-center gap-2.5 pb-4 border-b border-white/15">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-accent-500 text-[#0B0B0B] shrink-0">
                <i className="ri-sparkling-2-line text-[15px]"></i>
              </span>
              <h3 className="text-sm md:text-base font-heading font-semibold text-white">
                Ssemu Cleaning Services
              </h3>
            </div>

            <div>
              {rows.map((r, i) => (
                <div
                  key={r.us}
                  className={`stagger-item flex items-start gap-3 py-3.5 border-b border-white/10 last:border-b-0 ${
                    inView ? "is-in" : ""
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <i className="ri-check-line text-accent-400 text-lg mt-0.5 shrink-0"></i>
                  <span className="t-card text-white/90">
                    {r.us}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Typical cleaner column */}
          <div
            className="rounded-2xl p-5 md:p-7 border border-background-200"
            style={{ backgroundColor: "#F4F9FC" }}
          >
            <div className="flex items-center gap-2.5 pb-4 border-b border-background-300">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-background-200 text-foreground-500 shrink-0">
                <i className="ri-user-3-line text-[15px]"></i>
              </span>
              <h3 className="text-sm md:text-base font-heading font-semibold text-foreground-700">
                A typical cleaner
              </h3>
            </div>

            <div>
              {rows.map((r, i) => (
                <div
                  key={r.them}
                  className={`stagger-item flex items-start gap-3 py-3.5 border-b border-background-300 last:border-b-0 ${
                    inView ? "is-in" : ""
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <i className="ri-subtract-line text-foreground-400 text-lg mt-0.5 shrink-0"></i>
                  <span className="t-card text-foreground-500">
                    {r.them}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Reveal delay={120}>
          <div className="mt-8">
            <Link
              to="/contact#book"
              className="group btn btn-primary"
            >
              Request a free quote
              <i className="ri-arrow-right-line arrow-nudge"></i>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}