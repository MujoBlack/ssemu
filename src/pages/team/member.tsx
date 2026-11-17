import { Link, useParams } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import { team } from "@/mocks/team";
import Words from "@/components/base/Words";
import Reveal from "@/components/base/Reveal";
import GrowOnScroll from "@/components/base/GrowOnScroll";

export default function TeamMemberPage() {
  const { slug } = useParams();
  const member = team.find((m) => m.slug === slug);
  if (!member) return <NotFound />;

  const others = team.filter((m) => m.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="section-lead bg-background-50">
        <div className="site-container">
          <Reveal>
            <Link
              to="/team"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground-700 hover:text-accent-700 transition-colors cursor-pointer hdr-focus"
            >
              <i className="ri-arrow-left-line"></i>
              All team members
            </Link>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
            <Reveal className="lg:col-span-5">
              <GrowOnScroll>
                <div className="rounded-2xl overflow-hidden bg-background-100">
                  <img
                    src={member.image}
                    alt={`${member.name}, ${member.title} at Ssemu Cleaning Services Ltd in Kampala`}
                    className="w-full aspect-[4/5] object-cover object-top"
                  />
                </div>
              </GrowOnScroll>
            </Reveal>

            <div className="lg:col-span-7">
              <Reveal>
                <span className="t-label inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-100 text-accent-800">
                  {member.group === "technical" ? "Technical staff" : "Field staff"}
                </span>
              </Reveal>

              <Words
                as="h1"
                lines={[{ text: member.name }]}
                className="t-h1 mt-5 text-foreground-950"
              />

              <Reveal delay={100}>
                <p className="mt-2 text-lg text-accent-700 font-medium">{member.title}</p>
              </Reveal>

              <Reveal delay={160}>
                <h2 className="t-label mt-8 text-foreground-500">
                  About
                </h2>
              </Reveal>

              <Reveal delay={220}>
                <p className="t-body mt-3 text-foreground-600">
                  {member.bio}
                </p>
              </Reveal>

              <Reveal delay={280}>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/contact#book"
                    className="group btn btn-primary"
                  >
                    Book Now
                    <i className="ri-arrow-right-line arrow-nudge"></i>
                  </Link>
                  <a
                    href="https://wa.me/256779847822"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    <i className="ri-whatsapp-line"></i>
                    WhatsApp us
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section-md bg-background-100">
        <div className="site-container">
          <Words
            lines={[{ text: "More of the team" }]}
            className="t-h3 text-foreground-950 mb-8"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 grid-gap">
            {others.map((m, i) => (
              <Reveal key={m.slug} delay={i * 100} className="h-full">
                <Link
                  to={`/team/${m.slug}`}
                  className="press group block rounded-2xl overflow-hidden bg-background-50 border border-background-200 hover:border-accent-500 transition-colors cursor-pointer h-full"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={m.image}
                      alt={`${m.name}, ${m.title} at Ssemu Cleaning Services Ltd in Kampala`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top transition-transform duration-[400ms] group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-4">
                    <p className="t-card font-semibold text-foreground-950">{m.name}</p>
                    <p className="t-card text-foreground-600">{m.title}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}