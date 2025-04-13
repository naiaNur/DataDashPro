import { useState } from 'react';
import { useWishlist } from '@/hooks/use-wishlist';
import { WishlistItemRow } from './WishlistItem';
import { Button } from '@/components/ui/button';
import { Heart, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from '@/components/ui/separator';

export function Wishlist() {
  const { wishlist, clearWishlist } = useWishlist();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

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
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Heart className="h-5 w-5" />
          {wishlist.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Wishlist</SheetTitle>
          <SheetDescription>
            {wishlist.length === 0 
              ? "Wishlist Anda kosong." 
              : `Ada ${wishlist.length} item di wishlist Anda.`}
          </SheetDescription>
        </SheetHeader>
        
        {wishlist.length > 0 && (
          <>
            <div className="flex justify-end my-2">
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
            
            <div className="my-6 max-h-[calc(100vh-250px)] overflow-y-auto pr-1">
              {wishlist.map((item) => (
                <WishlistItemRow key={item.id} item={item} />
              ))}
            </div>
            
            <Separator />
          </>
        )}
        
        {wishlist.length === 0 && (
          <div className="py-8 text-center">
            <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Wishlist Anda kosong.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setIsOpen(false)}
            >
              Lanjutkan Belanja
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}