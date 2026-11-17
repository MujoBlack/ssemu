import PageHero from "@/components/feature/PageHero";
import { company } from "@/mocks/company";
import Words from "@/components/base/Words";
import Reveal from "@/components/base/Reveal";
import GrowOnScroll from "@/components/base/GrowOnScroll";

const coreValues = [
  {
    icon: "ri-heart-3-line",
    title: "The fear of God",
    body: "The fear of God in all our transactions.",
  },
  {
    icon: "ri-scales-3-line",
    title: "Integrity & transparency",
    body: "Integrity and transparency in business relationships.",
  },
  {
    icon: "ri-user-heart-line",
    title: "Respect for stakeholders",
    body: "Respect to all our stakeholders.",
  },
  {
    icon: "ri-award-line",
    title: "Quality service",
    body: "Delivery of quality service at no extra cost to our clients.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        titleLines={[
          { text: "A Ugandan team," },
          { text: "built on trust.", accent: true },
        ]}
        intro="A professional cleaning and facilities company based in Kampala, Uganda."
        image="https://d8j0ntlcm91z4.cloudfront.net/user_3HAwmNr1wDyIvlf27Ibx2ykuA9i/hf_20261019_151309_34f413b9-7e80-4f2a-9721-aedba5f5eb85.png"
        imageAlt="Ssemu cleaning crew arriving at an office in Kampala"
        primaryLabel="Request a quote"
        secondaryLabel="Our services"
        secondaryTo="/services"
      />

      <section className="section-md bg-background-50">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <Reveal>
                <div className="t-label stack-label inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background-100 border border-background-200 text-foreground-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
                  Who we are
                </div>
              </Reveal>
              <Words
                lines={[{ text: "Wealth of experience, dynamic workforce, quality services." }]}
                className="t-h2 text-foreground-950"
              />
              <p className="t-body mt-5 text-foreground-600">
                {company.name} is a service company based in Kampala, Uganda. Our
                objective is to put to use our wealth of experience and dynamic
                professional workforce and quality services to meet and exceed the
                expectation of our clients.
              </p>
              <p className="t-body mt-4 text-foreground-600">
                Ssemu is dedicated to deliver 101% result on the investment of our
                clients by combining hard work, excellence and dedication. We lead
                in cleaning services, integrated waste management, scaffolding,
                fumigation and pest control through our exclusive representations.
              </p>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2">
              <Reveal delay={120}>
                <GrowOnScroll>
                  <div className="rounded-2xl overflow-hidden bg-background-200 aspect-[2/1] w-full">
                    <img
                      src="https://storage.helloreaddy.io/project_files/8e0e98b8-0e43-4f10-a7fa-e43fc189d217/4d63c789-31d5-43d6-a724-8124b6205e52_compressed_team-full-staff-wall.webp"
                      alt="The full Ssemu Cleaning Services staff team outside the Kampala office"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </GrowOnScroll>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section-md bg-background-100">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 grid-gap">
            <Reveal>
            <div className="rounded-2xl border border-background-200 bg-background-50 p-7 md:p-9">
              <span className="w-12 h-12 flex items-center justify-center rounded-xl bg-accent-500 text-[#0B0B0B]">
                <i className="ri-eye-line text-xl"></i>
              </span>
              <h3 className="t-h3 mt-5 text-foreground-950">Our Vision</h3>
              <p className="t-body mt-3 text-foreground-600">
                To be the leading service provider for quality cleaning and
                maintenance services among the rest.
              </p>
            </div>
            </Reveal>
            <Reveal delay={100}>
            <div className="rounded-2xl border border-background-200 bg-background-50 p-7 md:p-9">
              <span className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary-950 text-white">
                <i className="ri-flag-2-line text-xl"></i>
              </span>
              <h3 className="t-h3 mt-5 text-foreground-950">Our Mission</h3>
              <p className="t-body mt-3 text-foreground-600">
                To constantly surpass the expectation of our clients through the
                use of quality products to deliver impeccable cleaning and
                renovation/maintenance services.
              </p>
            </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-md bg-background-50">
        <div className="site-container">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <div className="t-label stack-label inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background-100 border border-background-200 text-foreground-700">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
              Our core values
            </div>
            <Words
              lines={[
                { text: "The values behind" },
                { text: "every job we do.", accent: true },
              ]}
              className="t-h2 text-foreground-950"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid-gap">
            {coreValues.map((v, i) => (
              <Reveal key={v.title} delay={i * 100} className="h-full">
              <div className="p-6 rounded-2xl bg-background-100 border border-background-200 hover:border-accent-500 transition-colors h-full">
                <span className="w-11 h-11 flex items-center justify-center rounded-xl bg-secondary-100 text-accent-700">
                  <i className={`${v.icon} text-xl`}></i>
                </span>
                <h3 className="t-h3 mt-4 text-foreground-950">{v.title}</h3>
                <p className="t-card mt-2 text-foreground-600">{v.body}</p>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}