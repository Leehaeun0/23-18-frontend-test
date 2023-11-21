import { createContext, PropsWithChildren, useCallback, useState } from 'react';
import { SelectedMenuItem } from '../types/Model';

export interface CartContextProps {
  cartList: SelectedMenuItem[];
  addToCart: (item: SelectedMenuItem) => void;
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

  const addToCart = useCallback((item: SelectedMenuItem) => {
    setCartList((prevState) => [...prevState, item]);
  }, []);

  return <CartContext.Provider value={{ cartList, addToCart }}>{children}</CartContext.Provider>;
};
