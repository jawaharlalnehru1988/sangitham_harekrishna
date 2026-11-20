import Header from "@/components/layout/Header";
import HeroCarousel from "@/components/home/HeroCarousel";
import WelcomeCards from "@/components/home/WelcomeCards";
import QuoteSection from "@/components/home/QuoteSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div role="main" className="flex-grow pb-32">
        <HeroCarousel />
        <WelcomeCards />
        <QuoteSection />
      </div>
      <Footer />
    </div>
  );
}
