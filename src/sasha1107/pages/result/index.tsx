import { useQueryString } from '../../hooks';
import data from '../../constants/data.json';
import { useLocation } from 'react-router-dom';

const Result = () => {
  const { cart, price } = useQueryString();
  const { search } = useLocation();
  const storeId = new URLSearchParams(search).get('storeId');
  const storeData = data.find((item) => item.storeId === Number(storeId))?.menus;

  return (
    <div>
      <h2>장바구니</h2>
      <ol>
        {cart.map((item) => {
          const menuData = storeData?.find((menu) => menu.id === item.menuId);
          return (
            <li key={item.menuId}>
              <span>{menuData?.name}</span>
              {menuData?.image && <img src={menuData?.image} alt={`${menuData?.name} 이미지`} />}
              <span>{item.quantity}</span>
            </li>
          );
        })}
      </ol>
      <div>총 금액 {price.toLocaleString()}원</div>
    </div>
  );
};

export default Result;
