import Header from "@/components/layout/Header";
import HeroCarousel from "@/components/home/HeroCarousel";
import FeatureGrid from "@/components/home/FeatureGrid";
import LearningPath from "@/components/home/LearningPath";
import QuoteSection from "@/components/home/QuoteSection";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pb-32">
        <HeroCarousel />
        <FeatureGrid />
        <LearningPath />
        <QuoteSection />
        <Footer />
      </main>
      <BottomNav />
    </div>
  );
}
