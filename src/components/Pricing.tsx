import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useState } from "react";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Free",
      subtitle: "Begin with the essentials",
      price: 0,
      billingText: "per month, billed annually",
      features: [
        "Up to 2 seats",
        "10,000 Logs writes/mo",
        "100 Continuous Evaluations runs/mo",
        "1,000 Deployments reads/mo"
      ],
      cta: "START FOR FREE",
      ctaVariant: "outline" as const,
      popular: false,
      cardStyle: "border-border bg-card/50"
    },
    {
      name: "Grow",
      subtitle: "Unlock advanced capabilities",
      price: isAnnual ? 375 : 450,
      billingText: "per month, billed annually",
      features: [
        "Up to 5 seats",
        "100,000 Logs writes/mo",
        "5,000 Continuous Evaluations runs/mo",
        "100,000 Deployments reads/mo",
        "Pair Prompting",
        "Custom Providers"
      ],
      cta: "START FOR FREE",
      ctaVariant: "default" as const,
      popular: true,
      cardStyle: "border-primary bg-primary/5 relative"
    },
    {
      name: "Scale",
      subtitle: "Tailored solutions for enterprises",
      price: null,
      billingText: "Custom pricing",
      features: [
        "Pair Prompting",
        "Custom Providers",
        "Dedicated Deployed Engineer",
        "SSO + SAML",
        "SOC 2 + HIPAA",
        "On-prem deployment"
      ],
      cta: "CONTACT US",
      ctaVariant: "outline" as const,
      popular: false,
      cardStyle: "border-border bg-card/50"
    }
  ];


  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container mx-auto">

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4 bg-muted/30 rounded-full p-1">
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                isAnnual 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Annually
            </button>
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                !isAnnual 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative transition-all duration-300 hover:shadow-lg ${plan.cardStyle}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="pb-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm">{plan.subtitle}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-4xl font-bold">
                        ${plan.price === null ? "" : plan.price}
                      </span>
                      {plan.price === null && (
                        <span className="text-2xl font-bold text-muted-foreground">
                          Custom pricing
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.billingText}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="pt-4">
                  <Button 
                    variant={plan.ctaVariant}
                    size="lg" 
                    className={`w-full font-medium ${
                      plan.popular 
                        ? 'bg-green-600 hover:bg-green-700 text-white border-green-600'
                        : ''
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
