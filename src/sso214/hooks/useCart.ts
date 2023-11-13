import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export function useCart() {
  const context = useContext(CartContext);

  if (!context) throw Error('StoreProvider 외부에서 호출되었습니다.');
  return context;
}
