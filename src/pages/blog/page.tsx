import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/feature/PageHero";
import { blogPosts, blogCategories } from "@/mocks/blog";
import Reveal from "@/components/base/Reveal";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function BlogPage() {
  const [active, setActive] = useState<string>("All");
  const cats = ["All", ...blogCategories];
  const posts = active === "All" ? blogPosts : blogPosts.filter((p) => p.category === active);

  return (
    <>
      <PageHero
        eyebrow="Blog"
        titleLines={[
          { text: "Tips, news and" },
          { text: "healthier spaces.", accent: true },
        ]}
        intro="Practical advice on cleaning, hygiene, pest control and waste management in Uganda."
        image="/media/hf_20261019_151310_40f4a318-f5c7-45f9-9327-ac83178f7116.webp"
        imageAlt="Freshly cleaned office reception in Kampala"
        primaryLabel="Book Now"
        secondaryLabel="Our services"
        secondaryTo="/services"
      />

      <section className="section-md bg-background-50">
        <div className="site-container">
          <Reveal>
          <div className="flex flex-wrap items-center gap-2 mb-14">
            {cats.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={`press px-4 py-2 rounded-full text-sm font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                  active === c
                    ? "bg-accent-500 text-[#0B0B0B] border-accent-500"
                    : "bg-background-100 text-foreground-700 border-background-200 hover:border-accent-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-gap">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100} className="h-full">
              <Link
                to={`/blog/${p.slug}`}
                className="group flex flex-col rounded-2xl overflow-hidden bg-background-100 border border-background-200 card-lift cursor-pointer h-full"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-background-200">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <span className="t-label inline-flex self-start items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-100 text-accent-800">
                    {p.category}
                  </span>
                  <h2 className="t-h3 mt-3 text-foreground-950">
                    {p.title}
                  </h2>
                  <p className="t-card mt-2 text-foreground-600 flex-1">{p.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-foreground-500">
                    <span>{formatDate(p.date)}</span>
                    <span className="inline-flex items-center gap-1.5 font-semibold text-accent-700">
                      Read more
                      <i className="ri-arrow-right-line transition-transform group-hover:translate-x-0.5"></i>
                    </span>
                  </div>
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