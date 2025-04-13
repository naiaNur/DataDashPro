import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingTierProps {
  title: string;
  description: string;
  price: React.ReactNode;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  buttonVariant?: "default" | "outline" | "secondary";
}

function PricingTier({ 
  title, 
  description, 
  price, 
  features, 
  isPopular = false, 
  buttonText,
  buttonVariant = "outline"
}: PricingTierProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm overflow-hidden ${isPopular ? 'border-2 border-primary shadow-lg relative' : 'border border-gray-200'}`}>
      {isPopular && (
        <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-sm font-medium">
          Most Popular
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <p className="mt-1 text-gray-500">{description}</p>
        <p className="mt-4">
          {price}
        </p>
        <ul className="mt-6 space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
              <span className="ml-3 text-gray-500">{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Button 
            variant={buttonVariant as any} 
            className="w-full"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Pricing() {
  const pricingTiers = [
    {
      title: "Starter",
      description: "Perfect for small teams",
      price: (
        <>
          <span className="text-4xl font-extrabold text-gray-900">$49</span>
          <span className="text-base font-medium text-gray-500">/month</span>
        </>
      ),
      features: [
        "Up to 5 team members",
        "3 data sources",
        "5 dashboards",
        "Basic charts and tables",
        "Daily data refreshes",
        "Email support"
      ],
      buttonText: "Start free trial",
      buttonVariant: "outline"
    },
    {
      title: "Professional",
      description: "For growing businesses",
      price: (
        <>
          <span className="text-4xl font-extrabold text-gray-900">$149</span>
          <span className="text-base font-medium text-gray-500">/month</span>
        </>
      ),
      features: [
        "Up to 15 team members",
        "10 data sources",
        "Unlimited dashboards",
        "Advanced visualizations",
        "Hourly data refreshes",
        "Priority email & chat support",
        "Team collaboration features"
      ],
      isPopular: true,
      buttonText: "Start free trial",
      buttonVariant: "default"
    },
    {
      title: "Enterprise",
      description: "For large organizations",
      price: (
        <span className="text-4xl font-extrabold text-gray-900">Custom</span>
      ),
      features: [
        "Unlimited team members",
        "Unlimited data sources",
        "Custom visualizations",
        "Real-time data refresh",
        "SSO & advanced security",
        "Dedicated account manager",
        "API access & custom integrations"
      ],
      buttonText: "Contact sales",
      buttonVariant: "secondary"
    }
  ];

  return (
    <div className="bg-gray-50 py-16" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Pricing</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Plans that scale with your needs
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Choose the right plan for your team size and data requirements.
          </p>
        </div>
        
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {pricingTiers.map((tier, index) => (
            <PricingTier
              key={index}
              title={tier.title}
              description={tier.description}
              price={tier.price}
              features={tier.features}
              isPopular={tier.isPopular}
              buttonText={tier.buttonText}
              buttonVariant={tier.buttonVariant as any}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
