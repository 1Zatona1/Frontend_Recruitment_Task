import { createContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';

interface CartContextType {
  cartItems: number;
  setCartItems: Dispatch<SetStateAction<number>>;
}

export const CartContext = createContext<CartContextType | null>(null);
