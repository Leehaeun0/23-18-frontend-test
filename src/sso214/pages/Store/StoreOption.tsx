import { useNavigate, useParams } from 'react-router';
import { useCart } from '../../hooks/useCart';
import { getStoreMenu } from '../../utils';
import { SelectedMenuItem } from '../../types/Model';
import { CustomMenuOption } from '../../components';

const StoreOption = () => {
  const { storeId, menuId } = useParams();
  const { addToCart } = useCart();

  const navigate = useNavigate();

  const MENU = getStoreMenu(+storeId, +menuId);

  const handleSubmit = (item: SelectedMenuItem) => {
    addToCart(item);
    navigate(`/store/${storeId}`);
  };

  return <CustomMenuOption menu={MENU} handleSubmit={handleSubmit} />;
};

export default StoreOption;
