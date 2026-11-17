import { useState } from "react";
import Words from "@/components/base/Words";
import Reveal from "@/components/base/Reveal";

const faqs = [
  {
    q: "Do you give free quotes?",
    a: "Yes, every quote is free. We visit or call to assess the space and the work needed, then send you a clear, itemised quote with no obligation.",
  },
  {
    q: "Do you supply your own equipment and chemicals?",
    a: "Yes. Our teams arrive with professional equipment, cleaning chemicals and materials, and we use safe, quality products suited to each surface and space.",
  },
  {
    q: "Are your fumigation products safe for children and pets?",
    a: "Our trained fumigators use premium, approved products and will advise you on safe re-entry times after treatment. Tell us about children, pets or allergies and we'll plan around them.",
  },
  {
    q: "Can you clean outside working hours or at weekends?",
    a: "Absolutely. Many of our office and commercial clients prefer early morning, evening or weekend cleaning so business is never disrupted. We'll schedule around you.",
  },
  {
    q: "Do you offer monthly cleaning contracts?",
    a: "Yes, we offer flexible daily, weekly and monthly contracts for offices, institutions, hotels and homes — with a signed checklist and a supervisor on every job.",
  },
  {
    q: "Which areas do you cover?",
    a: "We are based at Original Shauriyako Building in Kampala Central with a branch in Lweza, and we serve Wakiso, Mukono and upcountry projects across Uganda on request.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section-md bg-background-50">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="t-label stack-label inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background-100 border border-background-200 text-foreground-700">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
                FAQ
              </div>
            </Reveal>
            <Words
              lines={[
                { text: "Quick answers," },
                { text: "no hassle.", accent: true },
              ]}
              className="t-h2 text-foreground-950"
            />
            <Reveal delay={80}>
              <p className="t-body stack-sub text-foreground-600">
                Something not listed here? Send a message or WhatsApp us and we'll
                get back to you quickly.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <div className="rounded-2xl bg-background-100 border border-background-200 overflow-hidden">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <Reveal key={f.q} delay={i * 100}>
                    <div className={i === faqs.length - 1 ? "" : "border-b border-background-200"}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-5 md:px-7 py-5 text-left cursor-pointer hover:bg-background-50 transition-colors"
                    >
                      <span className="t-h3 faq-q text-foreground-950">
                        {f.q}
                      </span>
                      <span
                        className={`w-9 h-9 flex items-center justify-center rounded-full bg-background-50 text-foreground-800 transition-transform shrink-0 ${
                          isOpen ? "rotate-45 bg-accent-500 text-[#0B0B0B]" : ""
                        }`}
                      >
                        <i className="ri-add-line text-lg"></i>
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
                        isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="t-body px-5 md:px-7 pb-6 text-foreground-600">
                        {f.a}
                      </p>
                    </div>
                  </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}