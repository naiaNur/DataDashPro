import { useQuery } from '@tanstack/react-query';
import { useRoute, Link } from 'wouter';
import { Product } from '@shared/schema';
import { ProductGrid } from '@/components/product/ProductGrid';
import { SearchBar } from '@/components/product/SearchBar';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export default function CategoryPage() {
  const [, params] = useRoute<{ category: string }>('/category/:category');
  const category = params?.category;

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: [`/api/products/category/${category}`],
    enabled: !!category,
  });

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Kategori tidak ditemukan</AlertTitle>
          <AlertDescription>
            Silakan pilih kategori yang valid.
          </AlertDescription>
        </Alert>
        <Button variant="outline" asChild>
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Daftar Produk
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Kategori: {category}</h1>
        <Button variant="outline" asChild>
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Semua Produk
          </Link>
        </Button>
      </div>
      
      <div className="mb-8">
        <SearchBar onSearch={(query) => console.log(query)} />
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(8).fill(0).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-48 w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Gagal memuat produk untuk kategori ini. Silakan coba lagi nanti.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          {products && products.length > 0 ? (
            <ProductGrid 
              products={products} 
              title={`${products.length} produk ditemukan`}
            />
          ) : (
            <div className="py-16 text-center">
              <h2 className="text-xl font-medium mb-4">Tidak ada produk dalam kategori ini</h2>
              <p className="text-gray-500 mb-8">Coba pilih kategori lain atau lihat semua produk.</p>
              <Button asChild>
                <Link href="/products">
                  Lihat Semua Produk
                </Link>
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}