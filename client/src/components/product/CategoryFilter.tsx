import { Button } from '@/components/ui/button';
import { categoryList } from '@shared/schema';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onChange: (category: string | null) => void;
}

export function CategoryFilter({ selectedCategory, onChange }: CategoryFilterProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-3">Kategori</h3>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => onChange(null)}
          className="text-sm"
        >
          Semua
        </Button>
        
        {categoryList.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => onChange(category)}
            className="text-sm"
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}