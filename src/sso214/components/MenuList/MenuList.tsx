import { useCallback, useMemo } from 'react';
import { TEST_ID } from '../../constant/TEST_ID';
import { Menus, MenuItem, CartItem } from '../../types/Model';
import { CustomList } from '../List';
import { CustomHeading } from '../Heading';
import { CustomMenu } from '../Menu';
import { CustomButton } from '../Button';
import { sumCartListTotalAmount } from '../../utils';
import S from './style.module.css';

interface Props {
  storeMenus: Menus;
  cartList: CartItem[];
  handleClickItem: (menuId: MenuItem['id']) => void;
}

const MenuList = ({ storeMenus, handleClickItem, cartList }: Props) => {
  const { title, menus } = storeMenus;

  const [itemCount, totalAmount] = useMemo(() => {
    const count = cartList.length;
    const amount = sumCartListTotalAmount(cartList);

    return [count, amount];
  }, [cartList]);

  const renderItem = useCallback(
    ({ item }: { item: MenuItem }) => (
      <CustomMenu menu={item} data-testid={TEST_ID.MENU_LIST.ITEM} onClick={() => handleClickItem(item.id)} />
    ),
    [handleClickItem],
  );
  const keyExtractor = useCallback((item: MenuItem) => item.name, []);

  return (
    <>
      <CustomHeading headingLevel="h2" className={S.title} data-testid={TEST_ID.MENU_LIST.TITLE}>
        {title}
      </CustomHeading>

      <CustomList<MenuItem>
        containerTag="ul"
        data={menus}
        data-testid={TEST_ID.MENU_LIST.LIST}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />

      {cartList.length > 0 && (
        <CustomButton variant="first" size="large" flexible data-testid={TEST_ID.MENU_LIST.ORDER_BUTTON}>
          <span data-testid={TEST_ID.MENU_LIST.ORDER_BUTTON_COUNT}>{itemCount}</span>
          <span>주문하기</span>
          <span data-testid={TEST_ID.MENU_LIST.ORDER_BUTTON_AMOUNT}>{totalAmount}원</span>
        </CustomButton>
      )}
    </>
  );
};

export default MenuList;
