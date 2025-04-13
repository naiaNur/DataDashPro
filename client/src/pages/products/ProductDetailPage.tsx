import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRoute, Link } from 'wouter';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Heart, Minus, Plus, ShoppingCart, Star, ChevronLeft } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

export default function ProductDetailPage() {
  const [, params] = useRoute<{ id: string }>('/product/:id');
  const productId = params?.id ? parseInt(params.id) : 0;
  
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlistItem } = useWishlist();
  const { toast } = useToast();

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
    enabled: !!productId,
  });

  const handleAddToCart = () => {
    if (product) {
      // Add multiple items based on quantity
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.id,
          name: product.name,
          price: parseFloat(product.price),
          imageUrl: product.imageUrl
        });
      }
      
      toast({
        title: "Produk ditambahkan ke keranjang",
        description: `${quantity} ${product.name} telah ditambahkan ke keranjang belanja.`,
      });
    }
  };

  const handleToggleWishlist = () => {
    if (product) {
      toggleWishlistItem({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        imageUrl: product.imageUrl
      });

      toast({
        title: isInWishlist(product.id) ? "Produk dihapus dari favorit" : "Produk ditambahkan ke favorit",
        description: isInWishlist(product.id) 
          ? `${product.name} telah dihapus dari daftar favorit.` 
          : `${product.name} telah ditambahkan ke daftar favorit.`,
      });
    }
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-96 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-28 w-full" />
            <div className="flex space-x-4">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Produk tidak dapat ditemukan. Silakan coba lagi nanti.
          </AlertDescription>
        </Alert>
        <Button variant="outline" asChild>
          <Link href="/products">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Kembali ke Daftar Produk
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" className="mb-6" asChild>
        <Link href="/products">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Kembali ke Daftar Produk
        </Link>
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          {product.featured === "true" && (
            <div className="absolute top-4 left-4 z-10">
              <Badge variant="destructive">Featured</Badge>
            </div>
          )}
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-auto object-cover rounded-lg shadow-md" 
          />
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center">
              <Badge variant="outline" className="mb-2">
                {product.category}
              </Badge>
              <div className="flex items-center ml-auto">
                <Star className="h-4 w-4 fill-current text-yellow-400" />
                <span className="text-sm ml-1">{product.rating}</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-bold text-primary mt-2">
              Rp {parseFloat(product.price).toLocaleString('id-ID')}
            </p>
            <p className="text-sm text-gray-500">Tersedia: {product.stock}</p>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-medium mb-2">Deskripsi</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-sm font-medium">Jumlah:</span>
              <div className="flex items-center ml-4">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-9 w-9"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                
                <span className="mx-4 w-8 text-center">{quantity}</span>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-9 w-9"
                  onClick={increaseQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Button 
                variant="outline"
                size="lg"
                className={isInWishlist(product.id) ? "text-red-500 border-red-200" : ""}
                onClick={handleToggleWishlist}
              >
                <Heart 
                  className={`h-5 w-5 mr-2 ${isInWishlist(product.id) ? "fill-current" : ""}`} 
                />
                Favorit
              </Button>
              
              <Button 
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Tambahkan ke Keranjang
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}