import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import KeyInsightsSection from "@/components/KeyInsightsSection";
import FeaturesSection from "@/components/FeaturesSection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <HeroSection />
        <KeyInsightsSection />
        <FeaturesSection />
        <CTABanner />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
