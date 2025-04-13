import { useState } from 'react';
import { Link } from 'wouter';
import { Product } from '@shared/schema';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlistItem } = useWishlist();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  // Handle add to cart
  const handleAddToCart = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      imageUrl: product.imageUrl,
      quantity: 1
    });
    
    toast({
      title: "Produk ditambahkan ke keranjang",
      description: `${product.name} telah ditambahkan ke keranjang belanja.`,
    });
  };

  // Handle toggle wishlist
  const handleToggleWishlist = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
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
  };

  return (
    <Card 
      className="overflow-hidden h-full transition-all duration-200 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`}>
        <a className="block h-full">
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
            {product.featured === "true" && (
              <div className="absolute top-2 left-2 z-10">
                <Badge variant="destructive">Featured</Badge>
              </div>
            )}
            
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className={`h-full w-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
            />
            
            <div className={`absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`}>
              <Button 
                className="m-2"
                onClick={handleAddToCart}
              >
                Lihat Detail
              </Button>
            </div>
          </div>
          
          <CardContent className="p-4">
            <div className="flex justify-between mb-2">
              <Badge variant="outline">{product.category}</Badge>
              <div className="flex items-center text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-xs ml-1">{product.rating}</span>
              </div>
            </div>
            
            <h3 className="font-medium text-lg mb-1 line-clamp-1">{product.name}</h3>
            
            <p className="text-gray-500 text-sm mb-2 line-clamp-2">
              {product.description}
            </p>
            
            <div className="text-primary font-bold mt-2">
              Rp {parseFloat(product.price).toLocaleString('id-ID')}
            </div>
          </CardContent>
          
          <CardFooter className="p-4 pt-0 mt-auto">
            <div className="flex space-x-2 w-full">
              <Button 
                variant="outline" 
                size="icon"
                className={`rounded-full ${isInWishlist(product.id) ? 'text-red-500 border-red-200' : ''}`}
                onClick={handleToggleWishlist}
              >
                <Heart 
                  className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} 
                />
              </Button>
              
              <Button 
                className="flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Tambahkan
              </Button>
            </div>
          </CardFooter>
        </a>
      </Link>
    </Card>
  );
}