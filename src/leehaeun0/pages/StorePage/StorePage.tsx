import MenuList from '../../components/MenuList/MenuList';
import { MenuListType } from 'src/leehaeun0/types/menu';

export default function StorePage({ data }: { data: MenuListType }) {
  return (
    <main>
      <MenuList data={data} />
      <OrderButton count={1} price={3200} />
    </main>
  );
}

function OrderButton({ count, price }: { count: number; price: number }) {
  return (
    <button type="button" aria-label="주문하기">
      <span aria-label="장바구니 개수">{count}</span>
      <span>주문하기</span>
      <span aria-label="장바구니 가격">{price.toLocaleString()}원</span>
    </button>
  );
}
