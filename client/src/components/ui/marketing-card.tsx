import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MarketingCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  ctaText?: string;
  ctaHref?: string;
}

export function MarketingCard({
  title,
  description,
  icon,
  ctaText = "Learn more",
  ctaHref = "#",
}: MarketingCardProps) {
  return (
    <Card className="transition-all duration-200 hover:shadow-lg">
      <CardHeader>
        <div className="mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button variant="link" asChild>
          <a href={ctaHref}>{ctaText}</a>
        </Button>
      </CardFooter>
    </Card>
  );
}
