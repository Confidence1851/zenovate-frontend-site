import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, Price } from '@/types';

export interface CartItem {
  productId: number;
  priceId: string;
  quantity: number;
  product: Product;
  selectedPrice: Price;
}

interface CartStore {
  items: CartItem[];
  addToCart: (product: Product, selectedPrice: Price, quantity?: number) => void;
  removeFromCart: (productId: number, priceId: string) => void;
  updateQuantity: (productId: number, priceId: string, quantity: number) => void;
  clearCart: () => void;
  getCartItemCount: () => number;
  getCartTotal: () => number;
  getCartItems: () => CartItem[];
}

export const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],

      addToCart: (product: Product, selectedPrice: Price, quantity: number = 1) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.productId === product.id && item.priceId === selectedPrice.id
          );

          if (existingItemIndex >= 0) {
            // Update quantity if item already exists
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + quantity,
            };
            return { items: updatedItems };
          } else {
            // Add new item
            return {
              items: [
                ...state.items,
                {
                  productId: product.id,
                  priceId: selectedPrice.id,
                  quantity,
                  product,
                  selectedPrice,
                },
              ],
            };
          }
        });
      },

      removeFromCart: (productId: number, priceId: string) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.productId === productId && item.priceId === priceId)
          ),
        }));
      },

      updateQuantity: (productId: number, priceId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, priceId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId && item.priceId === priceId
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getCartItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getCartTotal: () => {
        return get().items.reduce((total, item) => {
          return total + item.selectedPrice.value * item.quantity;
        }, 0);
      },

      getCartItems: () => {
        return get().items;
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);



