import Hero from "@/components/Hero";
import PostHeroInsights from "@/components/PostHeroInsights";
import ScrollRevealSection from "@/components/ScrollRevealSection";
import OurWorkSection from "@/components/OurWorkSection";
import FlowingMenuSection from "@/components/FlowingMenuSection";
import IntegrationVisualization from "@/components/IntegrationVisualization";
import FeatureGrid from "@/components/FeatureGrid";
import Footer from "@/components/Footer";
import Ramp30DayTimelineSection from "@/components/Ramp30DayTimelineSection";
import PricingSection from "@/components/PricingSection";
import InsightFeatureSection from "@/components/InsightFeatureSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ScrollRevealSection />
      <FeatureGrid />
      <OurWorkSection />
      <PostHeroInsights />
      <InsightFeatureSection />
      <Ramp30DayTimelineSection />
      <FlowingMenuSection />
      <IntegrationVisualization />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
