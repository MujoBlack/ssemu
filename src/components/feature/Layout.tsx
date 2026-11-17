import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import MobileStickyCTA from "@/components/feature/MobileStickyCTA";
import QuickContactLauncher from "@/components/feature/QuickContactLauncher";
import BackToTop from "@/components/feature/BackToTop";
import PageTransition from "@/components/feature/PageTransition";
import TalkToSsemu from "@/components/feature/TalkToSsemu";

export default function Layout() {
  const { pathname, hash } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="min-h-screen bg-background-50 text-foreground-950 font-sans">
      <Navbar />
      <main className={`${isHome ? "" : "pt-24 md:pt-28"}`}>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <TalkToSsemu />
      <Footer />
      <MobileStickyCTA />
      <QuickContactLauncher />
      <BackToTop />
    </div>
  );
}