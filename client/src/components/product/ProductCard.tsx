import { useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { Product } from '@shared/schema';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { id, name, price, imageUrl, category, rating, featured } = product;
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlistItem } = useWishlist();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price: parseFloat(price),
      imageUrl
    });
    
    toast({
      title: "Produk ditambahkan ke keranjang",
      description: `${name} telah ditambahkan ke keranjang belanja.`,
    });
  };

  const handleToggleWishlist = () => {
    toggleWishlistItem({
      id,
      name,
      price: parseFloat(price),
      imageUrl
    });

    toast({
      title: isInWishlist(id) ? "Produk dihapus dari favorit" : "Produk ditambahkan ke favorit",
      description: isInWishlist(id) 
        ? `${name} telah dihapus dari daftar favorit.` 
        : `${name} telah ditambahkan ke daftar favorit.`,
    });
  };

  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {featured === "true" && (
          <div className="absolute top-2 left-2 z-10">
            <Badge variant="destructive">Featured</Badge>
          </div>
        )}
        <Button
          size="icon"
          variant={isInWishlist(id) ? "destructive" : "outline"}
          className="absolute top-2 right-2 z-10 opacity-90"
          onClick={handleToggleWishlist}
        >
          <Heart className={isInWishlist(id) ? "fill-current" : ""} size={16} />
        </Button>
        <div className="h-48 overflow-hidden">
          <Link href={`/product/${id}`}>
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-full h-full object-cover transition-transform duration-300 transform-gpu hover:scale-105 cursor-pointer" 
            />
          </Link>
        </div>
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-sm text-gray-500">{category}</span>
            <CardTitle className="text-lg mt-1 line-clamp-1">
              <Link href={`/product/${id}`} className="hover:underline">
                {name}
              </Link>
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pb-0">
        <div className="flex items-center space-x-1 mb-2">
          <Star className="h-4 w-4 fill-current text-yellow-400" />
          <span className="text-sm">{rating}</span>
        </div>
        <div className="text-xl font-bold text-primary">
          Rp {parseFloat(price).toLocaleString('id-ID')}
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button 
          className="w-full"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Tambahkan ke Keranjang
        </Button>
      </CardFooter>
    </Card>
  );
}