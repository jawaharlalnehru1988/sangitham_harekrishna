import Header from "@/components/layout/Header";
import HeroCarousel from "@/components/home/HeroCarousel";
import FeatureGrid from "@/components/home/FeatureGrid";
import KacheriSection from "@/components/home/KacheriSection";
import PracticeSection from "@/components/home/PracticeSection";
import RagamSection from "@/components/home/RagamSection";
import MridangaSection from "@/components/home/MridangaSection";
import QuoteSection from "@/components/home/QuoteSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div role="main" className="flex-grow pb-32">
        <HeroCarousel />
        <QuoteSection />
        <PracticeSection />
        <MridangaSection />
        <RagamSection />
        <FeatureGrid />
        <KacheriSection />
      </div>
      <Footer />
    </div>
  );
}
