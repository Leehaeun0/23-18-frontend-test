import { getSingleMenu } from '../../utils';
import { useNavigate, useParams } from 'react-router-dom';
import { TEST_ID } from '../../constant';
import MenuOption from '../../component/MenuOption';
import useCart from '../../hooks/useCart';
import { CartItem } from '../../types';

export default function SelectOption() {
  const { storeId, menuId } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const mock = getSingleMenu();

  const handleAddToCart = (value: { id: string; item: CartItem }) => {
    addToCart?.(value);
    navigate(`/store/${storeId}`);
  };

  return (
    <div>
      <h2 data-testid={TEST_ID.GROUP_TITLE} key={TEST_ID.GROUP_TITLE}>
        {storeId} / {menuId}
      </h2>
      <MenuOption {...mock} onAddToCart={handleAddToCart} />
    </div>
  );
}
