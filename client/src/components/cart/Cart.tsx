import { useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import { CartItemRow } from './CartItem';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2 } from 'lucide-react';
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

export function Cart() {
  const { cart, clearCart, getTotalPrice, getItemCount } = useCart();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckout = () => {
    toast({
      title: "Checkout berhasil",
      description: "Terima kasih telah berbelanja di toko kami!",
    });
    clearCart();
    setIsOpen(false);
  };

  const itemCount = getItemCount();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Keranjang Belanja</SheetTitle>
          <SheetDescription>
            {cart.length === 0 
              ? "Keranjang belanja Anda kosong." 
              : `Ada ${itemCount} item di keranjang belanja Anda.`}
          </SheetDescription>
        </SheetHeader>
        
        {cart.length > 0 && (
          <>
            <div className="flex justify-end my-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-500 text-xs"
                onClick={clearCart}
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Kosongkan Keranjang
              </Button>
            </div>
            
            <div className="my-6 max-h-[calc(100vh-250px)] overflow-y-auto pr-1">
              {cart.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>
            
            <Separator />
            
            <div className="pt-4 pb-6">
              <div className="flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-bold text-lg">
                  Rp {getTotalPrice().toLocaleString('id-ID')}
                </span>
              </div>
            </div>
            
            <SheetFooter>
              <Button 
                className="w-full"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </SheetFooter>
          </>
        )}
        
        {cart.length === 0 && (
          <div className="py-8 text-center">
            <ShoppingCart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Keranjang belanja Anda kosong.</p>
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