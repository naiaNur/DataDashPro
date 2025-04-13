import { Product } from '@shared/schema';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
}

export function ProductGrid({ products, title }: ProductGridProps) {
  return (
    <div className="my-8">
      {title && (
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
      )}
      
      {products.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-gray-500">Tidak ada produk yang ditemukan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}