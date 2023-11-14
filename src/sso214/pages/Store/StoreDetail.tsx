import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import { CustomMenuList, CustomNoMatch } from '../../components';
import { MenuItem } from '../../types/Model';
import { useCart } from '../../hooks/useCart';
import { getStoreMenus } from '../../utils';

const StoreDetail = () => {
  const { storeId } = useParams();
  const { cartList } = useCart();

  const navigate = useNavigate();

  const MENUS = getStoreMenus(+storeId);

  const handleClickMenu = useCallback(
    (menuId: MenuItem['id']) => navigate(`/store/${storeId}/menu/${menuId}`),
    [storeId, navigate],
  );

  if (!MENUS) return <CustomNoMatch />;
  return <CustomMenuList storeMenus={MENUS} selectedMenus={cartList} handleClickItem={handleClickMenu} />;
};

export default StoreDetail;
