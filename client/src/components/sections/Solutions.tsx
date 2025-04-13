import { SolutionCard } from "@/components/ui/solution-card";
import { LineChart, BarChart3, UserCheck } from "lucide-react";

export default function Solutions() {
  const solutions = [
    {
      title: "Marketing Analytics",
      description: "Measure campaign performance, track conversions, and optimize channel allocation.",
      icon: <LineChart className="text-white text-2xl" />,
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      title: "Sales Analytics",
      description: "Track deal flow, forecast revenue, and identify your most profitable customer segments.",
      icon: <BarChart3 className="text-white text-2xl" />,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      title: "Customer Analytics",
      description: "Analyze customer behavior, measure satisfaction, and reduce churn with data-driven insights.",
      icon: <UserCheck className="text-white text-2xl" />,
      image: "https://images.unsplash.com/photo-1573164574001-518958d9baa2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];

  return (
    <div className="py-16 bg-white" id="solutions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Solutions</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Purpose-built for your industry
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Tailored data solutions for every team across your organization.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution, index) => (
              <SolutionCard
                key={index}
                title={solution.title}
                description={solution.description}
                icon={solution.icon}
                image={solution.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
