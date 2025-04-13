import { useState, useEffect } from 'react';
import { CartItem } from '@shared/schema';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Item already exists, increment quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1
        };
        return updatedCart;
      } else {
        // Add new item with quantity 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  // Update item quantity
  const updateQuantity = (id: number, quantity: number) => {
    setCart(prevCart => {
      if (quantity <= 0) {
        return prevCart.filter(item => item.id !== id);
      }
      
      return prevCart.map(item => 
        item.id === id ? { ...item, quantity } : item
      );
    });
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + (parseFloat(item.price.toString()) * item.quantity);
    }, 0);
  };

  // Get total item count
  const getItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getItemCount
  };
}