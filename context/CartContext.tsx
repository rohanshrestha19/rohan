
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, selectedSize: number) => void;
  removeFromCart: (productId: string, selectedSize: number) => void;
  updateQuantity: (productId: string, selectedSize: number, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product, selectedSize: number) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id && item.selectedSize === selectedSize);
      if (existingItem) {
        return prev.map(item => 
          (item.id === product.id && item.selectedSize === selectedSize)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, selectedSize, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string, selectedSize: number) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.selectedSize === selectedSize)));
  }, []);

  const updateQuantity = useCallback((productId: string, selectedSize: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId && item.selectedSize === selectedSize) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
