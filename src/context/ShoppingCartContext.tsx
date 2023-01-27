import React, { useState } from 'react'
import { createContext, ReactNode, useContext } from "react";
import { ShoppingCart } from '../components/ShoppingCart';
import { useLocalStorage } from '../hooks/useLocalStorage';

type ShoppingCartProviderProps = {
  children: ReactNode;
}

type CartItem = {
  id: number;
  quantity: number;
}

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[];
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);
  const [isOpen, setIsOpen] = useState(false);
  const cartQuantity = cartItems.reduce((q, i) => i.quantity + q, 0);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemQuantity(id: number) {
    return cartItems.find(i => i.id === id)?.quantity || 0;
  }

  function increaseItemQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(i => i.id === id) == null)
        return [...currItems, { id, quantity: 1 }];
      return currItems.map(i => {
        if (i.id === id) return { ...i, quantity: i.quantity + 1 }
        else return i;
      })
    })
  }

  function decreaseItemQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(i => i.id === id)?.quantity === 1)
        return currItems.filter(i => i.id !== id);
      return currItems.map(i => {
        if (i.id === id) return { ...i, quantity: i.quantity - 1 }
        else return i;
      })
    })
  }

  function removeFromCart(id: number) {
    setCartItems(currItems => currItems.filter(i => i.id !== id));
  }

  return (
    <ShoppingCartContext.Provider value={{ openCart, closeCart, cartItems, cartQuantity, getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeFromCart }}>
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  )
}