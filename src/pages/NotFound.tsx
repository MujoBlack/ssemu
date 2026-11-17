import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="py-24 md:py-40 bg-background-50 min-h-[60vh] flex items-center">
      <div className="site-container">
        <div className="max-w-xl mx-auto text-center">
          <div className="t-label stack-label inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background-100 border border-background-200 text-foreground-700">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
            404 — page not found
          </div>
          <h1 className="t-h1 text-foreground-950">
            This page is spotless — it doesn't exist.
          </h1>
          <p className="t-body stack-sub mx-auto text-foreground-600">Let's get you back somewhere useful.</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="press inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-primary-950 text-white text-sm font-semibold hover:bg-primary-900 transition-colors cursor-pointer whitespace-nowrap"
            >
              Back home
              <i className="ri-arrow-right-line"></i>
            </Link>
            <Link
              to="/contact#book"
              className="btn btn-secondary"
            >
              Request a quote
              <i className="ri-arrow-right-up-line"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}