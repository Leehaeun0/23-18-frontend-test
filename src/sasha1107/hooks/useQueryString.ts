import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { decodeBase64 } from '../utils';
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
    setQueryString(search);

    const queryString = query.get('data');
    const totalPrice = query.get('price');

    queryString && setCart(decodeBase64(queryString) as CartItem[]);
    totalPrice && setPrice(Number(decodeBase64(totalPrice)));
  }, [search]);

  return { cart, queryString, price };
};

export default useQueryString;
