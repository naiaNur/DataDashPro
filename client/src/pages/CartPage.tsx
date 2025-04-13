import { useCart } from '@/hooks/use-cart';
import { CartItemRow } from '@/components/cart/CartItem';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'wouter';

export default function CartPage() {
  const { cart, clearCart, getTotalPrice, getItemCount } = useCart();
  const { toast } = useToast();

  const handleCheckout = () => {
    toast({
      title: "Checkout berhasil",
      description: "Terima kasih telah berbelanja di toko kami!",
    });
    clearCart();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Keranjang Belanja</h1>
      
      {cart.length === 0 ? (
        <div className="py-16 text-center">
          <ShoppingCart className="h-16 w-16 mx-auto text-gray-300 mb-6" />
          <h2 className="text-xl font-medium mb-4">Keranjang belanja Anda kosong</h2>
          <p className="text-gray-500 mb-8">Tambahkan beberapa produk ke keranjang untuk memulai belanja.</p>
          <Button asChild>
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Lanjutkan Belanja
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  Item dalam Keranjang ({getItemCount()})
                </h2>
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
              
              <Separator className="mb-4" />
              
              <div className="space-y-4">
                {cart.map((item) => (
                  <CartItemRow key={item.id} item={item} />
                ))}
              </div>
            </div>
            
            <Button variant="outline" asChild className="mt-4">
              <Link href="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Lanjutkan Belanja
              </Link>
            </Button>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Ringkasan Pesanan</h2>
              
              <Separator className="mb-4" />
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>Rp {getTotalPrice().toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pengiriman</span>
                  <span>Gratis</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>Rp {getTotalPrice().toLocaleString('id-ID')}</span>
                </div>
              </div>
              
              <Button className="w-full" onClick={handleCheckout}>
                Checkout
              </Button>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                Dengan melakukan checkout, Anda menyetujui syarat dan ketentuan yang berlaku.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}