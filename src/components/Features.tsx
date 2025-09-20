import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Brain, 
  BarChart3, 
  Zap, 
  Shield, 
  Globe, 
  Target,
  TrendingUp,
  MessageSquare,
  Calendar
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analytics",
      description: "Advanced machine learning algorithms analyze your content performance and predict viral potential with 95% accuracy.",
    },
    {
      icon: BarChart3,
      title: "Multi-Platform Dashboard",
      description: "Unified analytics across Instagram, Twitter, LinkedIn, TikTok, and YouTube in one beautiful interface.",
    },
    {
      icon: MessageSquare,
      title: "Sentiment Analysis",
      description: "Real-time sentiment tracking of comments and mentions using advanced NLP to understand audience reactions.",
    },
    {
      icon: TrendingUp,
      title: "Growth Optimization",
      description: "AI recommendations for posting times, hashtags, and content strategy to maximize engagement.",
    },
    {
      icon: Zap,
      title: "Real-Time Alerts",
      description: "Instant notifications when your content is trending or when important engagement milestones are reached.",
    },
    {
      icon: Calendar,
      title: "Automated Reporting",
      description: "Beautiful PDF reports delivered weekly or monthly with key insights and performance metrics.",
    },
    {
      icon: Target,
      title: "Competitor Analysis",
      description: "Benchmark your performance against industry leaders and discover winning content strategies.",
    },
    {
      icon: Globe,
      title: "Global Insights",
      description: "Understand your audience demographics and engagement patterns across different regions and time zones.",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "SOC2 compliant with enterprise-grade security, data encryption, and privacy protection.",
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Everything You Need to{" "}
            <span className="bg-hero-gradient bg-clip-text text-transparent">
              Dominate Social Media
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            From AI-powered insights to automated reporting, SocialIntel provides 
            all the tools you need to grow your social media presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-card-gradient border-border hover:border-primary/30 transition-all duration-300 hover:shadow-glow group"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;