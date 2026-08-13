'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

export type CartItem = {
  variant_id: string;
  product_id: string;
  name: string;
  price: number;
  image_url: string;
  size: string;
  color: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (variant_id: string) => void;
  updateQuantity: (variant_id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('styleatlas_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('styleatlas_cart', JSON.stringify(items));
    }
  }, [items, isInitialized]);

  const addToCart = (newItem: CartItem) => {
    setItems(current => {
      const existing = current.find(item => item.variant_id === newItem.variant_id);
      if (existing) {
        return current.map(item =>
          item.variant_id === newItem.variant_id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...current, newItem];
    });
  };

  const removeFromCart = (variant_id: string) => {
    setItems(current => current.filter(item => item.variant_id !== variant_id));
  };

  const updateQuantity = (variant_id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(variant_id);
      return;
    }
    setItems(current =>
      current.map(item => (item.variant_id === variant_id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setItems([]);

  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
