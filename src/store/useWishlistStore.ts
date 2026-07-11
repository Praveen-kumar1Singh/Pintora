import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ShopifyProduct } from '../lib/shopify';

interface WishlistState {
  items: ShopifyProduct[];
  addItem: (item: ShopifyProduct) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        set((state) => {
          if (state.items.find((i) => i.id === product.id)) {
            return state;
          }
          return { items: [...state.items, product] };
        });
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },
      isInWishlist: (id) => {
        const { items } = get();
        return items.some((i) => i.id === id);
      },
    }),
    {
      name: 'printora-wishlist',
    }
  )
);
