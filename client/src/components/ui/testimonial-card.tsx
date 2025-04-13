import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialCardProps {
  quote: string;
  author: string;
  title: string;
  avatar: string;
}

export function TestimonialCard({ quote, author, title, avatar }: TestimonialCardProps) {
  return (
    <Card className="bg-gray-50 rounded-lg p-6 shadow-sm">
      <CardContent className="p-0">
        <div className="flex items-center mb-4">
          <div className="text-yellow-400 flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
        </div>
        <blockquote className="text-gray-700 mb-4">
          "{quote}"
        </blockquote>
        <div className="flex items-center">
          <img className="h-12 w-12 rounded-full object-cover" src={avatar} alt={author} />
          <div className="ml-4">
            <div className="font-medium text-gray-900">{author}</div>
            <div className="text-gray-500 text-sm">{title}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
