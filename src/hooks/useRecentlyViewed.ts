import { useState, useEffect } from 'react';
import { ShopifyProduct } from '@/lib/shopify';

const RECENTLY_VIEWED_KEY = 'printora_recently_viewed';
const MAX_ITEMS = 8;

export function useRecentlyViewed(currentProduct?: ShopifyProduct) {
  const [recentlyViewed, setRecentlyViewed] = useState<ShopifyProduct[]>([]);

  useEffect(() => {
    try {
      // 1. Get existing items from localStorage
      const storedItems = localStorage.getItem(RECENTLY_VIEWED_KEY);
      let items: ShopifyProduct[] = storedItems ? JSON.parse(storedItems) : [];

      // 2. If we have a current product, add it to the list
      if (currentProduct) {
        // Remove it if it's already in the list to avoid duplicates
        items = items.filter(item => item.id !== currentProduct.id);
        
        // Add to the front of the array
        items.unshift(currentProduct);

        // Limit the array size
        if (items.length > MAX_ITEMS) {
          items = items.slice(0, MAX_ITEMS);
        }

        // Save back to localStorage
        localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(items));
      }

      // 3. Set the state, filtering out the current product so it doesn't show in its own recently viewed list
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRecentlyViewed(currentProduct ? items.filter(item => item.id !== currentProduct.id) : items);
    } catch (e) {
      console.error('Error parsing recently viewed items from localStorage', e);
    }
  }, [currentProduct]);

  return recentlyViewed;
}
