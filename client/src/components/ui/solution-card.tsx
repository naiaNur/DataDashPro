import { ArrowRight } from "lucide-react";

interface SolutionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

export function SolutionCard({ title, description, icon, image }: SolutionCardProps) {
  return (
    <div className="relative group">
      <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100">
        <img src={image} alt={title} className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-100 transition"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="bg-white/10 backdrop-blur-sm p-2 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="mt-2 text-sm text-gray-300">{description}</p>
          <a href="#" className="mt-4 inline-flex items-center text-sm font-medium text-blue-200 hover:text-white">
            Learn more
            <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
