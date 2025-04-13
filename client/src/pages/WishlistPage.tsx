import { useWishlist } from '@/hooks/use-wishlist';
import { WishlistItemRow } from '@/components/wishlist/WishlistItem';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Heart, Trash2 } from 'lucide-react';
import { Link } from 'wouter';

export default function WishlistPage() {
  const { wishlist, clearWishlist } = useWishlist();
  const { toast } = useToast();

  const handleClearWishlist = () => {
    if (wishlist.length > 0) {
      toast({
        title: "Wishlist dikosongkan",
        description: "Semua item telah dihapus dari wishlist Anda.",
      });
    }
    clearWishlist();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Wishlist Saya</h1>
      
      {wishlist.length === 0 ? (
        <div className="py-16 text-center">
          <Heart className="h-16 w-16 mx-auto text-gray-300 mb-6" />
          <h2 className="text-xl font-medium mb-4">Wishlist Anda kosong</h2>
          <p className="text-gray-500 mb-8">Tambahkan produk favorit ke wishlist untuk disimpan.</p>
          <Button asChild>
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Jelajahi Produk
            </Link>
          </Button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              Produk Favorit ({wishlist.length})
            </h2>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-red-500 text-xs"
              onClick={handleClearWishlist}
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Kosongkan Wishlist
            </Button>
          </div>
          
          <Separator className="mb-4" />
          
          <div className="space-y-4">
            {wishlist.map((item) => (
              <WishlistItemRow key={item.id} item={item} />
            ))}
          </div>
          
          <Separator className="my-6" />
          
          <div className="flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Produk
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}