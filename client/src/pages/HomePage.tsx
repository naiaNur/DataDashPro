import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@shared/schema';
import { Link } from 'wouter';
import type { EmblaCarouselType } from 'embla-carousel-react';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from '@/components/ui/carousel';

export default function HomePage() {
  const [api, setApi] = React.useState<EmblaCarouselType | null>(null);
  
  // Autoplay functionality
  React.useEffect(() => {
    if (!api) return;
    
    const interval = setInterval(() => {
      if (api?.scrollNext) {
        api.scrollNext();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [api]);

  const { data: featuredProducts, isLoading: isFeaturedLoading, error: featuredError } = useQuery<Product[]>({
    queryKey: ['/api/products/featured'],
  });

  const { data: allProducts, isLoading: isAllLoading, error: allError } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  // Get a list of all categories from products with count
  const categories = allProducts ? 
    Object.entries(
      allProducts.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ).sort((a, b) => b[1] - a[1]) : 
    [];

  const renderFeaturedProducts = () => {
    if (isFeaturedLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, index) => (
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
      );
    }

    if (featuredError) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Gagal memuat produk unggulan. Silakan coba lagi nanti.
          </AlertDescription>
        </Alert>
      );
    }

    if (!featuredProducts || featuredProducts.length === 0) {
      return (
        <div className="py-8 text-center">
          <p className="text-gray-500">Tidak ada produk unggulan saat ini.</p>
        </div>
      );
    }

    return (
      <ProductGrid 
        products={featuredProducts.slice(0, 4)} 
      />
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="rounded-lg mb-16 overflow-hidden">
        <Carousel className="w-full" opts={{ loop: true, duration: 20 }} setApi={setApi}>
          <CarouselContent>
            <CarouselItem>
              <div className="h-[400px] w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-transparent z-10 flex items-center">
                  <div className="text-white ml-8 md:ml-16 max-w-lg">
                    <h1 className="text-4xl font-bold mb-4">Temukan Produk Terbaik</h1>
                    <p className="text-xl mb-8">
                      Berbagai produk pilihan dengan kualitas terbaik dan harga terjangkau
                    </p>
                    <Button size="lg" variant="secondary" asChild>
                      <Link href="/products">
                        Belanja Sekarang
                      </Link>
                    </Button>
                  </div>
                </div>
                <img 
                  src="https://placehold.co/1200x400?text=Electronic+Devices" 
                  alt="Electronic Devices" 
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="h-[400px] w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-transparent z-10 flex items-center">
                  <div className="text-white ml-8 md:ml-16 max-w-lg">
                    <h1 className="text-4xl font-bold mb-4">Koleksi Pakaian Terbaru</h1>
                    <p className="text-xl mb-8">
                      Tampil stylish dengan pilihan pakaian terbaru dari brand ternama
                    </p>
                    <Button size="lg" variant="secondary" asChild>
                      <Link href="/category/Clothing">
                        Lihat Koleksi
                      </Link>
                    </Button>
                  </div>
                </div>
                <img 
                  src="https://placehold.co/1200x400?text=Fashion+Collection" 
                  alt="Fashion Collection" 
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="h-[400px] w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-transparent z-10 flex items-center">
                  <div className="text-white ml-8 md:ml-16 max-w-lg">
                    <h1 className="text-4xl font-bold mb-4">Perlengkapan Rumah</h1>
                    <p className="text-xl mb-8">
                      Lengkapi kebutuhan rumah Anda dengan produk berkualitas
                    </p>
                    <Button size="lg" variant="secondary" asChild>
                      <Link href="/category/Home & Kitchen">
                        Jelajahi Sekarang
                      </Link>
                    </Button>
                  </div>
                </div>
                <img 
                  src="https://placehold.co/1200x400?text=Home+Appliances" 
                  alt="Home Appliances" 
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
            <CarouselPrevious className="relative -translate-y-0 -left-0 mx-2" />
            <CarouselNext className="relative -translate-y-0 -right-0 mx-2" />
          </div>
        </Carousel>
      </div>

      {/* Featured Products Section */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Produk Unggulan</h2>
          <Button variant="outline" size="sm" asChild>
            <Link href="/products">
              Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        {renderFeaturedProducts()}
      </div>

      {/* Categories Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Kategori</h2>
        
        {isAllLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array(8).fill(0).map((_, index) => (
              <Skeleton key={index} className="h-32 w-full" />
            ))}
          </div>
        ) : allError ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Gagal memuat kategori. Silakan coba lagi nanti.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map(([category, count]) => (
              <Link key={category} href={`/category/${category}`}>
                <div className="bg-primary/10 hover:bg-primary/20 transition-colors rounded-lg p-6 text-center cursor-pointer h-full flex flex-col justify-center items-center">
                  <h3 className="font-bold mb-2">{category}</h3>
                  <p className="text-sm text-gray-600">{count} produk</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Dapatkan Penawaran Eksklusif</h2>
        <p className="text-gray-700 mb-6 max-w-xl mx-auto">
          Daftar newsletter kami untuk mendapatkan informasi terbaru dan penawaran menarik
        </p>
        <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Email Anda" 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <Button className="sm:w-auto">Daftar</Button>
        </div>
      </div>
    </div>
  );
}