import Header from "@/components/layout/Header";
import HeroCarousel from "@/components/home/HeroCarousel";
import FeatureGrid from "@/components/home/FeatureGrid";
import KacheriSection from "@/components/home/KacheriSection";
import QuestionsSection from "@/components/home/QuestionsSection";
import LearningPath from "@/components/home/LearningPath";
import OtherWebsites from "@/components/home/OtherWebsites";
import QuoteSection from "@/components/home/QuoteSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div role="main" className="flex-grow pb-32">
        <HeroCarousel />
        <QuoteSection />
        <FeatureGrid />
        <KacheriSection />
        <LearningPath />
        {/* <OtherWebsites /> */}
        <QuestionsSection />
      </div>
      <Footer />
    </div>
  );
}
