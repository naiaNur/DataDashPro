import { useState, useEffect } from 'react';
import { WishlistItem } from '@shared/schema';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const savedWishlist = localStorage.getItem('wishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    }
    return [];
  });

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Add item to wishlist
  const addToWishlist = (item: WishlistItem) => {
    setWishlist(prevWishlist => {
      const exists = prevWishlist.some(wishlistItem => wishlistItem.id === item.id);
      
      if (!exists) {
        return [...prevWishlist, item];
      }
      
      return prevWishlist;
    });
  };

  // Remove item from wishlist
  const removeFromWishlist = (id: number) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== id));
  };

  // Toggle item in wishlist (add if not present, remove if present)
  const toggleWishlistItem = (item: WishlistItem) => {
    setWishlist(prevWishlist => {
      const exists = prevWishlist.some(wishlistItem => wishlistItem.id === item.id);
      
      if (exists) {
        return prevWishlist.filter(wishlistItem => wishlistItem.id !== item.id);
      } else {
        return [...prevWishlist, item];
      }
    });
  };

  // Check if item is in wishlist
  const isInWishlist = (id: number) => {
    return wishlist.some(item => item.id === id);
  };

  // Clear entire wishlist
  const clearWishlist = () => {
    setWishlist([]);
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlistItem,
    isInWishlist,
    clearWishlist
  };
}