import { Link } from "react-router-dom";
import PageHero from "@/components/feature/PageHero";
import { team } from "@/mocks/team";
import Words from "@/components/base/Words";
import Reveal from "@/components/base/Reveal";

const GROUP_IMAGE =
  "/media/team-leaders-arms-crossed.webp";

const STAFF_IMAGE =
  "/media/team-full-staff-wall.webp";

function MemberCard({ slug, name, title, image, group }: { slug: string; name: string; title: string; image: string; group: string }) {
  return (
    <Link
      to={`/team/${slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden bg-background-100 border border-background-200 card-lift cursor-pointer h-full"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-background-200">
        <img
          src={image}
          alt={`${name}, ${title} at Ssemu Cleaning Services`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="p-5">
        <h3 className="t-h3 text-foreground-950">{name}</h3>
        <p className="t-card mt-1.5 text-foreground-600">{title}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700">
          View profile
          <i className="ri-arrow-right-line transition-transform group-hover:translate-x-0.5"></i>
        </span>
      </div>
    </Link>
  );
}

export default function TeamPage() {
  const technical = team.filter((m) => m.group === "technical");
  const field = team.filter((m) => m.group === "field");

  return (
    <>
      <PageHero
        eyebrow="Our team"
        titleLines={[
          { text: "The people behind" },
          { text: "the spotless spaces.", accent: true },
        ]}
        intro="A dynamic, professional and supervised team serving Kampala and beyond."
        image="/media/hf_20261019_151310_a3c3f2ee-022a-4d07-8754-94e010b3af7a.webp"
        imageAlt="Ssemu crew preparing gloves and cleaning equipment"
        primaryLabel="Book Now"
        secondaryLabel="Our services"
        secondaryTo="/services"
      />

      <section className="section-xl bg-background-50">
        <div className="site-container">
          <div className="mb-14">
            <div className="t-label stack-label inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background-100 border border-background-200 text-foreground-700">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
              Technical staff
            </div>
            <Words
              lines={[{ text: "Leadership & management" }]}
              className="t-h2 text-foreground-950"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid-gap">
            {technical.map((m, i) => (
              <Reveal key={m.slug} delay={i * 100} className="h-full">
                <MemberCard slug={m.slug} name={m.name} title={m.title} image={m.image} group={m.group} />
              </Reveal>
            ))}
          </div>

          <div className="mt-16 md:mt-24 mb-14">
            <div className="t-label stack-label inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background-100 border border-background-200 text-foreground-700">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
              Field staff
            </div>
            <Words
              lines={[{ text: "On site, every day" }]}
              className="t-h2 text-foreground-950"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid-gap">
            {field.map((m, i) => (
              <Reveal key={m.slug} delay={i * 100} className="h-full">
                <MemberCard slug={m.slug} name={m.name} title={m.title} image={m.image} group={m.group} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-md bg-background-100">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 grid-gap">
            <Reveal>
            <div className="rounded-2xl overflow-hidden bg-background-50 border border-background-200">
              <img src={GROUP_IMAGE} alt="Ssemu leadership team" loading="lazy" decoding="async" className="w-full aspect-[16/9] object-cover object-[center_30%]" />
              <div className="p-6">
                <h3 className="t-h3 text-foreground-950">Leadership group</h3>
                <p className="t-card mt-2 text-foreground-600">
                  Our directors and supervisors set the standards and check every job before we consider it done.
                </p>
              </div>
            </div>
            </Reveal>
            <Reveal delay={100}>
            <div className="rounded-2xl overflow-hidden bg-background-50 border border-background-200">
              <img src={STAFF_IMAGE} alt="The full Ssemu Cleaning Services team" loading="lazy" decoding="async" className="w-full aspect-[16/9] object-cover object-[center_30%]" />
              <div className="p-6">
                <h3 className="t-h3 text-foreground-950">Full staff</h3>
                <p className="t-card mt-2 text-foreground-600">
                  Trained, uniformed and supervised teams for cleaning, fumigation, waste and high-rise work.
                </p>
              </div>
            </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}