import { PropsWithChildren, createContext, useReducer } from 'react';
import { CartItem } from '../types';

type CartList = Record<string, CartItem>; // id는 메뉴 하나의 아이디

interface State {
  cartList?: CartList;
}

export interface CartContext {
  cartList?: CartList;
  addToCart?: (payload: { id: string; item: CartItem }) => void;
}

export const CartContext = createContext<CartContext | null>(null);

type Action =
  | {
      type: 'ADD_TO_CART';
      payload: { id: string; item: CartItem };
    }
  | {
      type: 'UPDATE_CART';
      payload: { id: string; item: CartItem };
    }
  | {
      type: 'REMOVE_FROM_CART';
      payload: string;
    };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      state.cartList = {
        ...state.cartList,
        [action.payload.id]: action.payload.item,
      };
      break;
    }
    case 'UPDATE_CART': {
      if (state.cartList && action.payload.id in state.cartList) {
        state.cartList[action.payload.id] = action.payload.item;
      }
      break;
    }
    case 'REMOVE_FROM_CART': {
      if (state.cartList && action.payload in state.cartList) {
        delete state.cartList[action.payload];
      }
      break;
    }
    default:
      break;
  }
  return state;
};

export const CartProvider = ({
  children,
  initialState,
}: PropsWithChildren<{ initialState?: CartContext }>) => {
  const [state, dispatch] = useReducer(reducer, initialState ?? {});

  const addToCart = (payload: { id: string; item: CartItem }) => {
    dispatch({ type: 'ADD_TO_CART', payload });
  };

  return <CartContext.Provider value={{ ...state, addToCart }}>{children}</CartContext.Provider>;
};
