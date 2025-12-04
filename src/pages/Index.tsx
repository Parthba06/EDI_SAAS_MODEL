import Hero from "@/components/Hero";
import PostHeroInsights from "@/components/PostHeroInsights";
import ScrollRevealSection from "@/components/ScrollRevealSection";
import OurWorkSection from "@/components/OurWorkSection";
import FlowingMenuSection from "@/components/FlowingMenuSection";
import IntegrationVisualization from "@/components/IntegrationVisualization";
import RampTimelineSection from "@/components/RampTimelineSection";
import AgenticHireSection from "@/components/AgenticHireSection";
import FeatureGrid from "@/components/FeatureGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ScrollRevealSection />
      <FeatureGrid />
      <OurWorkSection />
      <PostHeroInsights />
      <FlowingMenuSection />
      <IntegrationVisualization />
      <RampTimelineSection />
      <AgenticHireSection />
      <Footer />
    </div>
  );
};

export default Index;
