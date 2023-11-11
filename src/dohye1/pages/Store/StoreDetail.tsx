import { useParams } from 'react-router-dom';
import MenuList from '../../component/MenuList';
import { getMenuGroupList } from '../../utils';
import { TEST_ID } from '../../constant';

export default function StoreDetail() {
  const { storeId } = useParams();

  const menuList = getMenuGroupList(['인기메뉴', '포케', '보울']);
  const title = storeId;

  return (
    <div>
      <h2 data-testid={TEST_ID.STORE_TITLE} key={TEST_ID.STORE_TITLE}>
        {title}
      </h2>
      <MenuList menuList={menuList} />
    </div>
  );
}
