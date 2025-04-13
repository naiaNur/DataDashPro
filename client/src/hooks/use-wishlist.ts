import { useState, useEffect } from 'react';
import { WishlistItem } from '@shared/schema';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  
  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Failed to parse wishlist from localStorage:', error);
        localStorage.removeItem('wishlist');
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Add item to wishlist
  const addToWishlist = (item: WishlistItem) => {
    setWishlist(prevWishlist => {
      // Check if item already exists in wishlist
      const existingItemIndex = prevWishlist.findIndex(wishlistItem => wishlistItem.id === item.id);
      
      if (existingItemIndex !== -1) {
        // Item already exists, do nothing
        return prevWishlist;
      } else {
        // Item doesn't exist, add it
        return [...prevWishlist, item];
      }
    });
  };

  // Remove item from wishlist
  const removeFromWishlist = (id: number) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== id));
  };

  // Check if an item is in the wishlist
  const isInWishlist = (id: number) => {
    return wishlist.some(item => item.id === id);
  };

  // Toggle item in wishlist (add if not present, remove if present)
  const toggleWishlistItem = (item: WishlistItem) => {
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  // Clear wishlist
  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem('wishlist');
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlistItem,
    clearWishlist
  };
}