import { createContext, PropsWithChildren, useCallback, useState } from 'react';
import { CartItem } from '../types/Model';

export interface CartContextProps {
  cartList: CartItem[];
  addToCart: (item: CartItem) => void;
}

export const CartContext = createContext<CartContextProps>({
  cartList: [],
  addToCart: () => {
    //
  },
});

export const CartProvider = ({
  children,
  initialState,
}: PropsWithChildren<{ initialState?: CartContextProps['cartList'] }>) => {
  const [cartList, setCartList] = useState(initialState ?? []);

  const addToCart = useCallback((item: CartItem) => {
    setCartList((prevState) => [...prevState, item]);
  }, []);

  return <CartContext.Provider value={{ cartList, addToCart }}>{children}</CartContext.Provider>;
};
