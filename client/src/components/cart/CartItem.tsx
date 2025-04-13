import { CartItem as CartItemType } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';

interface CartItemProps {
  item: CartItemType;
}

export function CartItemRow({ item }: CartItemProps) {
  const { removeFromCart, updateQuantity } = useCart();
  const { id, name, price, imageUrl, quantity } = item;

  return (
    <div className="flex items-center py-4 border-b">
      <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-1">
        <h3 className="text-sm font-medium">{name}</h3>
        <p className="text-sm font-medium text-gray-900">
          Rp {parseFloat(price.toString()).toLocaleString('id-ID')}
        </p>
      </div>
      
      <div className="flex items-center ml-4">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8"
          onClick={() => updateQuantity(id, quantity - 1)}
          disabled={quantity <= 1}
        >
          <Minus className="h-3 w-3" />
        </Button>
        
        <span className="mx-2 w-8 text-center">{quantity}</span>
        
        <Button 
          variant="outline" 
          size="icon"
          className="h-8 w-8"
          onClick={() => updateQuantity(id, quantity + 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="ml-4 text-right">
        <p className="text-sm font-medium text-gray-900">
          Rp {(parseFloat(price.toString()) * quantity).toLocaleString('id-ID')}
        </p>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon"
        className="ml-4 text-red-500"
        onClick={() => removeFromCart(id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}