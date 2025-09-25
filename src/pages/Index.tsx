import Hero from "@/components/Hero";
import BusinessSection from "@/components/BusinessSection";
import RampTimelineSection from "@/components/RampTimelineSection";
import RichMediaSection from "@/components/RichMediaSection";
import NewsletterSection from "@/components/NewsletterSection";
import AgenticHireSection from "@/components/AgenticHireSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <BusinessSection />
      <RampTimelineSection />
      <RichMediaSection />
      <NewsletterSection />
      <AgenticHireSection />
      <Footer />
    </div>
  );
};

export default Index;
