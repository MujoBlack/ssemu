import { Link, useParams } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import PageHero from "@/components/feature/PageHero";
import Words from "@/components/base/Words";
import Reveal from "@/components/base/Reveal";
import { blogPosts } from "@/mocks/blog";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/** Break a long headline into two balanced lines for the shared hero. */
function splitTitle(title: string): { text: string; accent?: boolean }[] {
  const words = title.split(" ").filter(Boolean);
  if (words.length < 5) return [{ text: title }];
  const mid = Math.ceil(words.length / 2);
  return [
    { text: words.slice(0, mid).join(" ") },
    { text: words.slice(mid).join(" "), accent: true },
  ];
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return <NotFound />;

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <article>
        <PageHero
          eyebrow={post.category}
          titleLines={splitTitle(post.title)}
          intro={post.excerpt}
          image={post.image}
          imageAlt={post.title}
          primaryLabel="Request a quote"
          secondaryLabel="All articles"
          secondaryTo="/blog"
        />

        <section className="section-md bg-background-50">
          <div className="site-container">
            <div className="max-w-3xl">
              <Reveal>
                <div className="flex flex-wrap items-center gap-3 text-sm text-foreground-500">
                  <span className="inline-flex items-center gap-1.5"><i className="ri-user-3-line"></i> {post.author}</span>
                  <span className="inline-flex items-center gap-1.5"><i className="ri-calendar-line"></i> {formatDate(post.date)}</span>
                </div>
              </Reveal>

              <div className="mt-8 space-y-5">
              {post.body.map((para, i) => (
                <Reveal key={i} delay={i === 0 ? 0 : 60}>
                  <p className="t-body text-foreground-700">
                    {para}
                  </p>
                </Reveal>
              ))}

              <Reveal delay={120}>
                <div className="pt-6 flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/contact#book"
                    className="group btn btn-primary"
                  >
                    Request a quote
                    <i className="ri-arrow-right-up-line transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></i>
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
      </article>

      <section className="section-md bg-background-100">
        <div className="site-container">
          <Words
            lines={[{ text: "More articles" }]}
            className="t-h3 text-foreground-950 mb-8"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 grid-gap">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100} className="h-full">
                <Link
                  to={`/blog/${p.slug}`}
                  className="press group flex flex-col h-full rounded-2xl overflow-hidden bg-background-50 border border-background-200 hover:border-accent-500 hover:shadow-[0_18px_44px_rgba(11,11,11,0.10)] transition-all duration-300 cursor-pointer"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top transition-transform duration-[400ms] group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-4">
                    <p className="t-label text-accent-700">{p.category}</p>
                    <p className="t-h3 mt-2 text-foreground-950">{p.title}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-700">
                      Read more
                      <i className="ri-arrow-right-line arrow-nudge"></i>
                    </span>
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