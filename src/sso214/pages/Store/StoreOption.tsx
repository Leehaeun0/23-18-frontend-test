import { useNavigate, useParams } from 'react-router';
import { CustomMenuOption } from '../../components';
import { useCart } from '../../hooks/useCart';
import { getStoreMenu } from '../../utils';

const StoreOption = () => {
  const { storeId, menuId } = useParams();
  const { addToCart } = useCart();

  const navigate = useNavigate();

  const MENU = getStoreMenu(+storeId, +menuId);

  return <CustomMenuOption menu={MENU} handleSubmit={addToCart} />;
};

export default StoreOption;
