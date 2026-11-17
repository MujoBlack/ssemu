import { useEffect, useState } from "react";
import { testimonials } from "@/mocks/testimonials";
import { company } from "@/mocks/company";
import Words from "@/components/base/Words";
import Reveal from "@/components/base/Reveal";

export default function Testimonial() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const t = testimonials[idx];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced || paused) return undefined;
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(id);
  }, [reduced, paused]);

  return (
    <section className="section-md bg-background-50">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-foreground-950"></span>
              <Words
                as="div"
                lines={[{ text: "What our clients say" }]}
                className="t-label text-foreground-700"
              />
            </div>
            <Reveal delay={80}>
              <blockquote className="relative rounded-2xl border border-background-200 bg-background-100 p-6 md:p-8">
                <i className="ri-double-quotes-l text-3xl md:text-4xl text-accent-500 leading-none"></i>
                <p className="mt-3 text-xl sm:text-2xl md:text-3xl font-heading font-medium tracking-tight leading-[1.25] text-foreground-950">
                  {t.quote}
                </p>
              </blockquote>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div>
                  <p className="text-base font-semibold text-foreground-950">{t.name}</p>
                  <p className="text-xs text-foreground-600">{t.role}</p>
                </div>
                <span className="w-px h-8 bg-background-300"></span>
                <a
                  href={company.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background-100 border border-background-200 text-xs text-foreground-800 hover:border-accent-500 transition-colors cursor-pointer"
                >
                  <i className="ri-youtube-fill text-red-600 text-base"></i>
                  Watch more on YouTube
                </a>
              </div>
            </Reveal>
            <div className="mt-8 flex items-center gap-2">
              {testimonials.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => setIdx(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === i ? "w-8 bg-accent-500" : "w-2 bg-background-300 hover:bg-background-400"
                  }`}
                />
              ))}
            </div>
          </div>

          <Reveal delay={120}>
            <div className="w-full rounded-2xl overflow-hidden bg-accent-100">
              <img
                src="https://static.readdy.ai/image/a640633edfbdf1109c1b0b3486e64127/42fe5f628bce6984a080fa807b627bbe.jpeg"
                alt="Ssemu Cleaning Services leadership team standing with arms crossed in Kampala"
                className="w-full aspect-[3/2] object-cover object-center"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}