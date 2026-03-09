import Header from "@/components/layout/Header";
import HeroCarousel from "@/components/home/HeroCarousel";
import FeatureGrid from "@/components/home/FeatureGrid";
import LearningPath from "@/components/home/LearningPath";
import OtherWebsites from "@/components/home/OtherWebsites";
import QuoteSection from "@/components/home/QuoteSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pb-32">
        <HeroCarousel />
        <QuoteSection />
        <FeatureGrid />
        <LearningPath />
        <OtherWebsites />
        <Footer />
      </main>

    </div>
  );
}
