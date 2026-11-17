import TiltCard from "@/components/base/TiltCard";
import Words from "@/components/base/Words";
import Reveal from "@/components/base/Reveal";
import { useInView } from "@/hooks/useInView";

const steps = [
  {
    num: "01",
    title: "Tell us what you need",
    body: "Send the booking form or WhatsApp us with a few photos.",
    icon: "ri-message-3-line",
  },
  {
    num: "02",
    title: "Free assessment & quote",
    body: "We visit or call to assess the space and send a clear, free quote.",
    icon: "ri-file-list-3-line",
  },
  {
    num: "03",
    title: "We clean & check",
    body: "Our supervised team cleans, and we check the work with you before we leave.",
    icon: "ri-shield-check-line",
  },
];

function StepCard({
  step,
  delay,
}: {
  step: (typeof steps)[number];
  delay: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal reveal-right h-full ${inView ? "is-in" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <TiltCard className="rounded-2xl h-full" rotation={8} scale={1.02}>
        <div className="group relative flex flex-col p-6 rounded-2xl bg-background-100 border border-background-200 hover:border-accent-500 transition-colors duration-300 h-full">
          <div className="flex items-center justify-between">
            <span
              className={`text-4xl md:text-5xl font-heading font-semibold tracking-tight leading-none transition-colors duration-500 ${
                inView ? "text-accent-500" : "text-foreground-200"
              }`}
            >
              {step.num}
            </span>
            <span className="w-11 h-11 flex items-center justify-center rounded-full bg-primary-950 text-white group-hover:bg-accent-500 group-hover:text-[#0B0B0B] transition-colors">
              <i className={`${step.icon} text-lg`}></i>
            </span>
          </div>
          <h3 className="t-h3 mt-8 text-foreground-950">{step.title}</h3>
          <p className="t-card mt-2 text-foreground-600">{step.body}</p>
        </div>
      </TiltCard>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="section-md bg-background-50">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="t-label stack-label inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background-100 border border-background-200 text-foreground-700">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
                How it works
              </div>
            </Reveal>
            <Words
              lines={[
                { text: "Three simple steps" },
                { text: "to a spotless space.", accent: true },
              ]}
              className="t-h2 text-foreground-950"
            />
            <Reveal delay={120}>
              <p className="t-body stack-sub text-foreground-600">
                Booking a cleaning team shouldn't be a hassle. Here's what happens
                after you get in touch.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 grid-gap">
            {steps.map((s, i) => (
              <StepCard key={s.num} step={s} delay={i * 100} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}