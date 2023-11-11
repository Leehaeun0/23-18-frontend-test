import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw Error('CartContextProvider 내부에서 호출해주세요.');
  }

  return context;
}
