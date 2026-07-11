import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ShopifyCart, createCart, getCart, addToCart, removeFromCart, updateCart } from '../lib/shopify';

interface CartState {
  cart: ShopifyCart | null;
  isLoading: boolean;
  initCart: () => Promise<void>;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,
      isLoading: false,
      initCart: async () => {
        const { cart } = get();
        if (cart?.id) {
          try {
            const freshCart = await getCart(cart.id);
            if (freshCart) {
              set({ cart: freshCart });
              return;
            }
          } catch (e) {
            console.error('Failed to fetch existing cart', e);
          }
        }
        // If no cart or fetching failed, create a new one
        try {
          const newCart = await createCart();
          set({ cart: newCart });
        } catch (e) {
          console.error('Failed to create cart', e);
        }
      },
      addItem: async (variantId, quantity = 1) => {
        set({ isLoading: true });
        try {
          let { cart } = get();
          if (!cart?.id) {
            cart = await createCart();
          }
          const updatedCart = await addToCart(cart.id, [{ merchandiseId: variantId, quantity }]);
          set({ cart: updatedCart });
        } catch (e) {
          console.error('Failed to add item to cart', e);
        } finally {
          set({ isLoading: false });
        }
      },
      removeItem: async (lineId) => {
        set({ isLoading: true });
        try {
          const { cart } = get();
          if (!cart?.id) return;
          const updatedCart = await removeFromCart(cart.id, [lineId]);
          set({ cart: updatedCart });
        } catch (e) {
          console.error('Failed to remove item from cart', e);
        } finally {
          set({ isLoading: false });
        }
      },
      updateQuantity: async (lineId, quantity) => {
        set({ isLoading: true });
        try {
          const { cart } = get();
          if (!cart?.id) return;
          const updatedCart = await updateCart(cart.id, [{ id: lineId, quantity }]);
          set({ cart: updatedCart });
        } catch (e) {
          console.error('Failed to update cart quantity', e);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'printora-shopify-cart',
    }
  )
);
