import { useNavigate, useParams } from 'react-router';
import { CustomMenuList } from '../../components';
import cafe_menu from '../../mock/cafe_menu.json';
import { useCallback } from 'react';
import { MenuItem } from '../../types/Model';

const StoreDetail = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();

  const handleClickMenu = useCallback(
    (menuId: MenuItem['id']) => navigate(`/store/${storeId}/menu/${menuId}`),
    [storeId, navigate],
  );

  return <CustomMenuList {...cafe_menu} handleClickMenu={handleClickMenu} />;
};

export default StoreDetail;
