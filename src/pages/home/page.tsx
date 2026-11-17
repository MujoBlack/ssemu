import Hero from "./components/Hero";
import AreaBelt from "./components/AreaBelt";
import ServicesPreview from "./components/ServicesPreview";
import WhoWeServe from "./components/WhoWeServe";
import TrustStats from "./components/TrustStats";
import HowItWorks from "./components/HowItWorks";
import WhySsemu from "./components/WhySsemu";
import PricingSnapshot from "./components/PricingSnapshot";
import Testimonial from "./components/Testimonial";
import AreaTeaser from "./components/AreaTeaser";
import FAQ from "./components/FAQ";
import LatestFromBlog from "./components/LatestFromBlog";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Everything below sits above the fixed hero and slides up to hide it */}
      <div className="relative z-10 bg-background-100">
        <AreaBelt />
        <ServicesPreview />
        <WhoWeServe />
        <TrustStats />
        <HowItWorks />
        <WhySsemu />
        <PricingSnapshot />
        <Testimonial />
        <AreaTeaser />
        <FAQ />
        <LatestFromBlog />
      </div>
    </>
  );
}