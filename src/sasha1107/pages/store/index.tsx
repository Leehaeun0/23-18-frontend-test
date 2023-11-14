import { useParams, useNavigate } from 'react-router-dom';
import { MenuList } from '../../components';
import data from '../../constants/data.json';
import { useQueryString } from '../../hooks';

const Store = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const storeData = data.find((item) => item.storeId === Number(storeId));
  const { cart, price, queryString } = useQueryString();
  const totalAmount = cart.map((item) => item.quantity).reduce((acc, cur) => acc + cur, 0);
  if (!storeData) return null;
  return (
    <>
      <MenuList data={storeData} />
      {cart.length > 0 && (
        <button
          role="button"
          aria-label="주문하기"
          onClick={() => navigate(`/result${queryString}&storeId=${storeId}`)}
        >
          {cart.map((item) => item.quantity).reduce((acc, cur) => acc + cur, 0) > 0 && (
            <span>{totalAmount}</span>
          )}
          주문하기
          {price > 0 && <span>{price.toLocaleString()}원</span>}
        </button>
      )}
    </>
  );
};

export default Store;
