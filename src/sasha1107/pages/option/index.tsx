import { MenuOption } from '../../components';
import { useParams, useNavigate } from 'react-router-dom';
import data from '../../constants/data.json';

const Option = () => {
  const { menuId, storeId } = useParams();
  const store = data.find((item) => item.storeId === Number(storeId));
  const menu = store?.menus.find((item) => item.id === Number(menuId));
  const navigate = useNavigate();
  if (!menu) return null;

  return (
    <div>
      <button role="button" aria-label="뒤로가기" onClick={() => navigate(-1)}>
        뒤로가기
      </button>
      <MenuOption {...menu} />
    </div>
  );
};

export default Option;
