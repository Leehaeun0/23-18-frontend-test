import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface CartItem {
  menuId: number;
  quantity: number;
}
const useQueryString = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [queryString, setQueryString] = useState<string>('');
  const { search } = useLocation();
  useEffect(() => {
    const query = new URLSearchParams(search);
    const queryString = query.get('data');
    const totalPrice = query.get('price');
    setPrice(Number(totalPrice) || 0);
    setQueryString(search);
    if (!queryString) return;
    setCart(JSON.parse(atob(queryString)) as CartItem[]);
  }, [search]);
  return { cart, queryString, price };
};

export default useQueryString;
