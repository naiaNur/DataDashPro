import { useQuery } from '@tanstack/react-query';
import { Product, categoryList } from '@shared/schema';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onChange: (category: string | null) => void;
}

export function CategoryFilter({ selectedCategory, onChange }: CategoryFilterProps) {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  // Get a list of all categories from products with count
  const categories = products ? 
    Object.entries(
      products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ).sort((a, b) => b[1] - a[1]) : 
    [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-24" />
        <div className="space-y-2">
          {Array(6).fill(0).map((_, index) => (
            <Skeleton key={index} className="h-10 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">Kategori</h3>
      
      <div className="space-y-2">
        <Button
          variant={selectedCategory === null ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => onChange(null)}
        >
          <span>Semua Produk</span>
          {selectedCategory === null && (
            <Badge className="ml-auto" variant="secondary">
              {products?.length || 0}
            </Badge>
          )}
        </Button>
        
        {categories.map(([category, count]) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onChange(category)}
          >
            <span>{category}</span>
            <Badge className="ml-auto" variant={selectedCategory === category ? "secondary" : "outline"}>
              {count}
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  );
}