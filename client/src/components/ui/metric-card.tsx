import { Card } from "@/components/ui/card";
import { ChevronUp, ChevronDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ReactNode;
}

export function MetricCard({ title, value, change, trend, icon }: MetricCardProps) {
  return (
    <Card className="bg-gray-50 shadow-sm rounded-lg p-5 dashboard-card">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <div className="flex items-center mt-2">
            <span className={`flex items-center text-sm ${trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500'}`}>
              {trend === 'up' ? <ChevronUp className="h-4 w-4" /> : trend === 'down' ? <ChevronDown className="h-4 w-4" /> : null}
              {change}
            </span>
            <span className="text-gray-500 text-sm ml-1">vs last month</span>
          </div>
        </div>
        {icon}
      </div>
    </Card>
  );
}
