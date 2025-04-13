import { 
  Database, 
  LineChart, 
  Share, 
  Lock 
} from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className="relative">
      <dt>
        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
          {icon}
        </div>
        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{title}</p>
      </dt>
      <dd className="mt-2 ml-16 text-base text-gray-500">
        {description}
      </dd>
    </div>
  );
}

export default function Features() {
  const features = [
    {
      icon: <Database className="h-6 w-6" />,
      title: "Connect Any Data Source",
      description: "Seamlessly integrate with SQL databases, spreadsheets, APIs, and cloud services. Our drag-and-drop connectors make data access simple."
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: "Powerful Visualizations",
      description: "Choose from charts, tables, maps, and custom widgets to visualize your data. Apply filters and interactions without coding."
    },
    {
      icon: <Share className="h-6 w-6" />,
      title: "Easy Sharing",
      description: "Share dashboards via secure links, schedule automated exports, or embed visualizations directly in your applications."
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Enterprise Security",
      description: "Control access with role-based permissions, SSO integration, and audit logs. Your data remains secure and compliant."
    }
  ];

  return (
    <div className="py-12 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to master your data
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Build interactive dashboards and reports without writing a single line of code.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature, index) => (
              <Feature 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
