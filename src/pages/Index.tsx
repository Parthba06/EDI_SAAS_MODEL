import Hero from "@/components/Hero";
import ScrollRevealSection from "@/components/ScrollRevealSection";
import FlowingMenuSection from "@/components/FlowingMenuSection";
import IntegrationVisualization from "@/components/IntegrationVisualization";
import RampTimelineSection from "@/components/RampTimelineSection";
import AgenticHireSection from "@/components/AgenticHireSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ScrollRevealSection />
      <FlowingMenuSection />
      <IntegrationVisualization />
      <RampTimelineSection />
      <AgenticHireSection />
      <Footer />
    </div>
  );
};

export default Index;
