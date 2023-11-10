import { useParams } from 'react-router';
import { CustomButton, CustomMenuList } from '../../components';
import cafe_menu from '../../mock/cafe_menu.json';

const StoreDetail = () => {
  const { storeId } = useParams();

  return (
    <div>
      <CustomMenuList {...cafe_menu} />

      <CustomButton variant="first" size="large" flexible>
        <span data-testid="count">1</span>
        <span data-testid="buttonText">주문하기</span>
        <span data-testid="amount">3,100원</span>
      </CustomButton>
    </div>
  );
};

export default StoreDetail;
