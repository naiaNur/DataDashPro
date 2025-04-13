import { WishlistItem as WishlistItemType } from '@shared/schema';
import { useWishlist } from '@/hooks/use-wishlist';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Trash2, ShoppingCart } from 'lucide-react';
import { Link } from 'wouter';
import { useToast } from '@/hooks/use-toast';

interface WishlistItemProps {
  item: WishlistItemType;
}

export function WishlistItemRow({ item }: WishlistItemProps) {
  const { removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { id, name, price, imageUrl } = item;

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      imageUrl,
    });
    
    toast({
      title: "Produk ditambahkan ke keranjang",
      description: `${name} telah ditambahkan ke keranjang belanja.`,
    });
  };

  return (
    <div className="flex items-center py-4 border-b">
      <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden">
        <Link href={`/product/${id}`}>
          <img 
            src={imageUrl} 
            alt={name} 
            className="h-full w-full object-cover cursor-pointer" 
          />
        </Link>
      </div>
      
      <div className="ml-4 flex-1">
        <Link href={`/product/${id}`}>
          <h3 className="text-sm font-medium hover:underline cursor-pointer">{name}</h3>
        </Link>
        <p className="text-sm font-medium text-gray-900">
          Rp {price.toLocaleString('id-ID')}
        </p>
      </div>
      
      <div className="flex space-x-2">
        <Button 
          size="sm"
          variant="outline"
          className="flex items-center"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Tambahkan</span>
        </Button>
        
        <Button 
          size="sm"
          variant="ghost" 
          className="text-red-500"
          onClick={() => removeFromWishlist(id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}