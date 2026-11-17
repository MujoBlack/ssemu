import { Link } from "react-router-dom";
import { blogPosts } from "@/mocks/blog";
import Words from "@/components/base/Words";
import Reveal from "@/components/base/Reveal";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function LatestFromBlog() {
  const posts = blogPosts.slice(0, 3);

  return (
    <section className="section-md bg-background-100">
      <div className="site-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <Reveal>
              <div className="t-label stack-label inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background-50 border border-background-200 text-foreground-700">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
                Tips &amp; news
              </div>
            </Reveal>
            <Words
              lines={[{ text: "Cleaning tips from our team.", accentWords: ["our", "team."] }]}
              className="t-h2 text-foreground-950"
            />
          </div>
          <Reveal delay={140} className="self-start md:self-end">
            <Link
              to="/blog"
              className="group btn btn-secondary"
            >
              All articles
              <i className="ri-arrow-right-line arrow-nudge"></i>
            </Link>
          </Reveal>
        </div>

        <div className="flex gap-4 overflow-x-auto scroll-clean snap-x pb-2 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0">
          {posts.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={i * 100}
              className="min-w-[280px] sm:min-w-[320px] md:min-w-0 snap-start h-full"
            >
              <Link
                to={`/blog/${p.slug}`}
                className="group flex flex-col h-full rounded-2xl overflow-hidden bg-background-50 border border-background-200 card-lift cursor-pointer"
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
                  <h3 className="t-h3 mt-3 text-foreground-950">
                    {p.title}
                  </h3>
                  <div className="mt-4 flex items-center justify-between gap-3 text-xs text-foreground-500">
                    <span className="whitespace-nowrap">{formatDate(p.date)}</span>
                    <span className="inline-flex items-center gap-1.5 font-semibold text-accent-700 whitespace-nowrap">
                      Read more
                      <i className="ri-arrow-right-line arrow-nudge"></i>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}