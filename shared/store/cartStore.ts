import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  selectedSizes?: string[];
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  // Optimistic UI state
  isSyncing: boolean;
  setSyncing: (status: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isSyncing: false,
      setSyncing: (status) => set({ isSyncing: status }),
      addItem: (item) => set((state) => {
        const existingItem = state.items.find((i) => i._id === item._id);
        if (existingItem) {
          return {
            items: state.items.map((i) => 
              i._id === item._id ? { ...i, quantity: i.quantity + item.quantity } : i
            )
          };
        }
        return { items: [...state.items, item] };
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((i) => i._id !== id)
      })),
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map((i) => 
          i._id === id ? { ...i, quantity: Math.max(1, quantity) } : i
        )
      })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'kimpactify-cart-storage',
    }
  )
);
