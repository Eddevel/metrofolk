// components/cart/CartProvider.tsx — FINAL DUPLICATE-PROOF VERSION
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);

  // THIS IS THE KEY: Prevent duplicate adds from Strict Mode
  const [isAdding, setIsAdding] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      getDoc(doc(db, "carts", user.uid)).then((snap) => {
        if (snap.exists()) setCart(snap.data().items || []);
      });
    } else {
      const saved = localStorage.getItem("cart");
      if (saved) setCart(JSON.parse(saved));
    }
  }, [user]);

  const saveCart = async (items: CartItem[]) => {
    if (user) {
      if (items.length === 0) {
        await deleteDoc(doc(db, "carts", user.uid));
      } else {
        await setDoc(doc(db, "carts", user.uid), { items });
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  };

  const addToCart = (productId: string, quantity: number = 1) => {
    // THIS LINE KILLS DUPLICATES IN STRICT MODE
    if (isAdding === productId) return;
    setIsAdding(productId);

    setCart((prev) => {
      const existing = prev.find(i => i.productId === productId);
      let updated: CartItem[];

      if (existing) {
        updated = prev.map(i =>
          i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        updated = [...prev, { productId, quantity }];
      }

      saveCart(updated);
      return updated;
    });

    // Reset after a tick
    setTimeout(() => setIsAdding(null), 0);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const updated = prev.filter(i => i.productId !== productId);
      saveCart(updated);
      return updated;
    });
  };

  const clear = async () => {
    setCart([]);
    if (user) await deleteDoc(doc(db, "carts", user.uid));
    else localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};