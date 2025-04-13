import { Card } from "@/components/ui/card";

interface ChartPlaceholderProps {
  type: "line" | "bar" | "pie";
}

export function ChartPlaceholder({ type }: ChartPlaceholderProps) {
  let content;

  switch (type) {
    case "pie":
      content = (
        <div className="flex items-center justify-center h-full">
          <div className="relative h-40 w-40">
            <div className="absolute inset-0 rounded-full border-8 border-primary opacity-20"></div>
            <div 
              className="absolute h-full w-full rounded-full border-8 border-transparent border-t-primary border-r-primary" 
              style={{ transform: 'rotate(45deg)' }}
            ></div>
            <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-700">65%</div>
                <div className="text-xs text-gray-500">Main segment</div>
              </div>
            </div>
          </div>
        </div>
      );
      break;
    case "line":
    default:
      content = (
        <div className="flex flex-col h-full w-full">
          <div className="flex justify-between mb-8">
            <div className="space-y-2">
              <div className="h-2 w-16 bg-gray-200 rounded"></div>
              <div className="h-2 w-24 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-16 bg-gray-200 rounded"></div>
              <div className="h-2 w-12 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="flex-1 flex items-end space-x-2">
            <div className="w-1/7 h-1/3 bg-primary/20 rounded-t"></div>
            <div className="w-1/7 h-2/3 bg-primary/40 rounded-t"></div>
            <div className="w-1/7 h-3/4 bg-primary/30 rounded-t"></div>
            <div className="w-1/7 h-2/5 bg-primary/40 rounded-t"></div>
            <div className="w-1/7 h-3/5 bg-primary/40 rounded-t"></div>
            <div className="w-1/7 h-full bg-primary rounded-t"></div>
            <div className="w-1/7 h-2/3 bg-primary/50 rounded-t"></div>
          </div>
        </div>
      );
  }

  return (
    <div className="h-full w-full flex items-center justify-center">
      {content}
    </div>
  );
}
