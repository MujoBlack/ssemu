import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import PageHero from "@/components/feature/PageHero";
import Reveal from "@/components/base/Reveal";
import { company } from "@/mocks/company";
import { quoteOptions } from "@/mocks/services";

const FORM_ENDPOINT = "https://readdy.ai/api/form/db8vtkokk00l6eltrnbg";

export default function ContactPage() {
  const [params] = useSearchParams();
  const requested = params.get("service") || "";
  const preselected = quoteOptions.includes(requested) ? requested : quoteOptions[0];

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [formError, setFormError] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");
    const form = e.currentTarget;
    const fd = new FormData(form);

    const trap = String(fd.get("contact_alt") || "").trim();
    if (trap) {
      setStatus("success");
      form.reset();
      return;
    }
    fd.delete("contact_alt");

    const payload = new URLSearchParams();
    fd.forEach((value, key) => {
      payload.append(key, String(value));
    });

    try {
      setSubmitting(true);
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });
      const responseText = await response.text();
      let parsed: { code?: string; meta?: { message?: string; detail?: string }; message?: string } = {};
      try {
        parsed = JSON.parse(responseText);
      } catch {
        parsed = {};
      }
      const serverMsg = parsed?.meta?.message || parsed?.meta?.detail || parsed?.message || responseText || "";

      if (response.ok && parsed?.code === "OK") {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setFormError(
          serverMsg
            ? `Sorry — ${serverMsg}. Please try again or WhatsApp us.`
            : "Sorry — something went wrong sending your request. Please try again."
        );
      }
    } catch {
      setStatus("error");
      setFormError("Sorry — network issue. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        titleLines={[
          { text: "Let's get your space" },
          { text: "spotless.", accent: true },
        ]}
        intro="Call, WhatsApp or send the form below and we'll get back to you with a free quote."
        image="https://d8j0ntlcm91z4.cloudfront.net/user_3HAwmNr1wDyIvlf27Ibx2ykuA9i/hf_20261019_151311_bdfe5d83-422a-425b-9978-f914bf089678.png"
        imageAlt="Ssemu cleaner arriving at a client's office"
        primaryLabel="Send a request"
        primaryTo="#book"
        secondaryLabel="Our services"
        secondaryTo="/services"
      />

      <section className="section-md bg-background-50">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-10">
            <div className="lg:col-span-5 space-y-4 order-2 lg:order-1">
              <Reveal>
              <div className="p-5 sm:p-6 md:p-7 rounded-2xl bg-background-100 border border-background-200">
                <p className="t-label text-foreground-600">Talk to us</p>
                <div className="mt-5 space-y-3">
                  {company.phones.map((p) => (
                    <a
                      key={p.tel}
                      href={`tel:${p.tel}`}
                      className="press group flex items-center gap-4 p-4 rounded-xl bg-background-50 border border-background-200 hover:border-accent-500 transition-colors cursor-pointer"
                    >
                      <span className="w-11 h-11 flex items-center justify-center rounded-lg bg-primary-950 text-white group-hover:bg-accent-500 group-hover:text-[#0B0B0B] transition-colors shrink-0">
                        <i className="ri-phone-fill text-lg"></i>
                      </span>
                      <div>
                        <p className="text-xs text-foreground-600">Call / WhatsApp</p>
                        <p className="text-base font-semibold text-foreground-950">{p.label}</p>
                      </div>
                      <i className="ri-arrow-right-up-line ml-auto text-foreground-500"></i>
                    </a>
                  ))}
                  <a
                    href={`https://wa.me/${company.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="press group flex items-center gap-4 p-4 rounded-xl bg-background-50 border border-background-200 hover:border-accent-500 transition-colors cursor-pointer"
                  >
                    <span className="w-11 h-11 flex items-center justify-center rounded-lg bg-[#25D366] text-white shrink-0">
                      <i className="ri-whatsapp-line text-xl"></i>
                    </span>
                    <div>
                      <p className="text-xs text-foreground-600">WhatsApp</p>
                      <p className="text-base font-semibold text-foreground-950">Chat with us now</p>
                    </div>
                    <i className="ri-arrow-right-up-line ml-auto text-foreground-500"></i>
                  </a>
                  <a
                    href={`mailto:${company.email}`}
                    className="press group flex items-center gap-4 p-4 rounded-xl bg-background-50 border border-background-200 hover:border-accent-500 transition-colors cursor-pointer"
                  >
                    <span className="w-11 h-11 flex items-center justify-center rounded-lg bg-primary-950 text-white group-hover:bg-accent-500 group-hover:text-[#0B0B0B] transition-colors shrink-0">
                      <i className="ri-mail-line text-lg"></i>
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs text-foreground-600">Email</p>
                      <p className="text-sm font-semibold text-foreground-950 break-all">{company.email}</p>
                    </div>
                    <i className="ri-arrow-right-up-line ml-auto text-foreground-500 shrink-0"></i>
                  </a>
                </div>
              </div>
              </Reveal>

              <Reveal delay={100}>
              <div className="p-5 sm:p-6 rounded-2xl bg-background-100 border border-background-200">
                <p className="t-label text-foreground-600 mb-4">Our offices</p>
                <div className="space-y-5">
                  {company.offices.map((o) => (
                    <div key={o.name} className="flex items-start gap-3">
                      <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-secondary-100 text-accent-700 shrink-0">
                        <i className="ri-map-pin-2-line"></i>
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground-950">{o.name}</p>
                        {o.lines.map((line) => (
                          <p key={line} className="text-sm text-foreground-600">{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="flex items-start gap-3">
                    <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-secondary-100 text-accent-700 shrink-0">
                      <i className="ri-mail-send-line"></i>
                    </span>
                    <p className="text-sm text-foreground-600">{company.postal}</p>
                  </div>
                </div>
                <div className="mt-5 rounded-xl overflow-hidden border border-background-200">
                  <iframe
                    title="Ssemu head office in Kampala"
                    src="https://www.google.com/maps?q=Kampala%20Central%2C%20Uganda&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="240"
                    loading="lazy"
                    style={{ border: 0 }}
                  ></iframe>
                </div>
              </div>
              </Reveal>
            </div>

            <div id="book" className="lg:col-span-7 order-1 lg:order-2 scroll-mt-28">
              <Reveal delay={120}>
              {status === "success" ? (
                <div className="rounded-2xl bg-background-100 border border-background-200 p-6 sm:p-8 md:p-12 text-center fade-up">
                  <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-accent-500 text-[#0B0B0B]">
                    <i className="ri-check-line text-3xl"></i>
                  </div>
                  <h2 className="t-h2 text-foreground-950">
                    Thank you — your request is on its way!
                  </h2>
                  <p className="t-body mt-4 text-foreground-600">
                    One of our team will call or WhatsApp you shortly with a free
                    quote. For anything urgent, please call {company.primaryPhone.label}.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`tel:${company.primaryPhone.tel}`}
                      className="btn btn-dark"
                    >
                      <i className="ri-phone-line text-[16px]"></i> Call us now
                    </a>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="btn btn-secondary"
                    >
                      Send another request
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  id="cleaning-quote-booking-form"
                  data-readdy-form
                  onSubmit={handleSubmit}
                  className="rounded-2xl bg-background-50 border border-background-200 p-5 sm:p-6 md:p-10 space-y-6"
                >
                  <input
                    type="text"
                    name="contact_alt"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    readOnly
                    className="hp-field"
                  />

                  <div>
                    <h2 className="t-h2 text-foreground-950">
                      Request a free quote
                    </h2>
                    <p className="t-card mt-2 text-foreground-600">
                      Tell us what you need and we'll get back to you quickly.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="flex flex-col gap-2">
                      <span className="t-label text-foreground-600">Name</span>
                      <input
                        type="text"
                        name="name"
                        required
                        maxLength={80}
                        autoComplete="name"
                        placeholder="Your name"
                        className="px-4 py-3 rounded-xl bg-background-50 border border-background-200 text-sm text-foreground-950 focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-200 transition-all"
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="t-label text-foreground-600">Phone</span>
                      <input
                        type="tel"
                        name="phone"
                        required
                        maxLength={30}
                        autoComplete="tel"
                        placeholder="+256 …"
                        className="px-4 py-3 rounded-xl bg-background-50 border border-background-200 text-sm text-foreground-950 focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-200 transition-all"
                      />
                    </label>
                    <label className="flex flex-col gap-2 sm:col-span-2">
                      <span className="t-label text-foreground-600">Email</span>
                      <input
                        type="email"
                        name="email"
                        required
                        maxLength={120}
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="px-4 py-3 rounded-xl bg-background-50 border border-background-200 text-sm text-foreground-950 focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-200 transition-all"
                      />
                    </label>
                    <label className="flex flex-col gap-2 sm:col-span-2">
                      <span className="t-label text-foreground-600">Cleaning requirement</span>
                      <select
                        name="cleaning_requirement"
                        required
                        defaultValue={preselected}
                        className="px-4 py-3 rounded-xl bg-background-50 border border-background-200 text-sm text-foreground-950 focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-200 transition-all cursor-pointer"
                      >
                        {quoteOptions.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </label>
                    <label className="flex flex-col gap-2 sm:col-span-2">
                      <span className="t-label text-foreground-600">Message</span>
                      <textarea
                        name="message"
                        required
                        maxLength={500}
                        rows={5}
                        placeholder="Tell us about the space, when you need us, and anything else helpful."
                        className="px-4 py-3 rounded-xl bg-background-50 border border-background-200 text-sm text-foreground-950 focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-200 transition-all resize-none"
                      ></textarea>
                      <span className="text-[12px] text-foreground-500 text-right">Up to 500 characters</span>
                    </label>
                  </div>

                  {status === "error" && formError && (
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-800">
                      <i className="ri-error-warning-line text-lg mt-0.5"></i>
                      <p>{formError}</p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <p className="text-xs text-foreground-500 max-w-sm">
                      <i className="ri-shield-check-line mr-1 text-accent-700"></i>
                      Every quote is free. Your details won't be used for marketing.
                    </p>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group btn btn-primary"
                    >
                      {submitting ? (
                        <>
                          <i className="ri-loader-4-line animate-spin"></i> Sending…
                        </>
                      ) : (
                        <>
                          Send
                          <i className="ri-arrow-right-line btn-arrow text-[16px]"></i>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}