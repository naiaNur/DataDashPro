import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Campaign } from "@shared/schema";
import { ChartPlaceholder } from "@/components/ui/chart-placeholder";
import { MetricCard } from "@/components/ui/metric-card";
import { 
  Download, 
  RefreshCw, 
  MoreHorizontal, 
  Filter, 
  ChevronUp,
  ChevronDown,
  Mail,
  Instagram,
  Search
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Dashboard() {
  const { data: campaigns, isLoading, error } = useQuery({
    queryKey: ['/api/campaigns'],
  });

  const metrics = [
    {
      title: "Total Conversion",
      value: "12,546",
      change: "+12.5%",
      trend: "up",
      icon: <div className="bg-blue-100 p-3 rounded-md">
        <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
    },
    {
      title: "Average Cost",
      value: "$4.25",
      change: "-3.2%",
      trend: "down",
      icon: <div className="bg-green-100 p-3 rounded-md">
        <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    },
    {
      title: "Engagement Rate",
      value: "5.2%",
      change: "+1.8%",
      trend: "up",
      icon: <div className="bg-purple-100 p-3 rounded-md">
        <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCampaignIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'email marketing':
        return <Mail className="text-primary" />;
      case 'social media':
        return <Instagram className="text-purple-600" />;
      case 'search ads':
        return <Search className="text-green-600" />;
      default:
        return <Mail className="text-primary" />;
    }
  };

  return (
    <div className="bg-gray-50 py-16" id="dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Analytics Dashboard</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Build custom dashboards in minutes
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-gray-800 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <h3 className="text-white text-lg font-medium">Marketing Campaign Performance</h3>
            </div>
            <div className="flex space-x-3 text-gray-300">
              <button className="hover:text-white"><Download className="h-5 w-5" /></button>
              <button className="hover:text-white"><RefreshCw className="h-5 w-5" /></button>
              <button className="hover:text-white"><MoreHorizontal className="h-5 w-5" /></button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {metrics.map((metric, index) => (
                <MetricCard 
                  key={index} 
                  title={metric.title} 
                  value={metric.value} 
                  change={metric.change} 
                  trend={metric.trend} 
                  icon={metric.icon}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg shadow-sm p-5 dashboard-card">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-700">Campaign Performance</h4>
                  <div className="flex space-x-2">
                    <Select defaultValue="7days">
                      <SelectTrigger className="text-sm w-[160px] h-8 bg-gray-50">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7days">Last 7 days</SelectItem>
                        <SelectItem value="30days">Last 30 days</SelectItem>
                        <SelectItem value="quarter">Last quarter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="h-64 relative">
                  <ChartPlaceholder type="line" />
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 dashboard-card">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-700">Audience Breakdown</h4>
                  <button className="text-gray-400 hover:text-gray-500">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
                <div className="h-64 relative">
                  <ChartPlaceholder type="pie" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 dashboard-card">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-gray-700">Campaign Results</h4>
                <div>
                  <button className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md mr-2">
                    <Filter className="h-4 w-4 inline mr-1" /> Filter
                  </button>
                  <button className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md">
                    <Download className="h-4 w-4 inline mr-1" /> Export
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversions</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {isLoading ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">Loading campaigns...</td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-red-500">Error loading campaigns</td>
                      </tr>
                    ) : campaigns && campaigns.length > 0 ? (
                      campaigns.map((campaign: Campaign) => (
                        <tr key={campaign.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                {getCampaignIcon(campaign.type)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                                <div className="text-sm text-gray-500">{campaign.type}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline" className={getStatusColor(campaign.status)}>
                              {campaign.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.budget}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.conversions}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex items-center">
                              <span className={campaign.roi.includes('-') ? 'text-red-500 font-medium' : 'text-green-500 font-medium'}>
                                {campaign.roi}
                              </span>
                              {campaign.roi.includes('-') ? (
                                <ChevronDown className="w-4 h-4 text-red-500 ml-1" />
                              ) : (
                                <ChevronUp className="w-4 h-4 text-green-500 ml-1" />
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No campaigns found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
