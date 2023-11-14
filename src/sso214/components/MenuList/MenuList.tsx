import { useCallback, useMemo } from 'react';
import { Menus, MenuItem, SelectedMenuItem } from '../../types/Model';
import { sumMenusTotalAmount } from '../../utils';
import { TEST_ID } from '../../constant/TEST_ID';
import { CustomList } from '../List';
import { CustomHeading } from '../Heading';
import { CustomMenu } from '../Menu';
import { CustomButton } from '../Button';
import S from './style.module.css';

interface Props {
  storeMenus: Menus;
  selectedMenus: SelectedMenuItem[];
  handleClickItem: (menuId: MenuItem['id']) => void;
}

const MenuList = ({ storeMenus, selectedMenus, handleClickItem }: Props) => {
  const { title, menus } = storeMenus;

  const [itemCount, totalAmount] = useMemo(() => {
    const count = selectedMenus.length;
    const amount = sumMenusTotalAmount(selectedMenus);
    return [count, amount];
  }, [selectedMenus]);

  const keyExtractor = useCallback((item: MenuItem) => item.name, []);
  const renderItem = useCallback(
    ({ item }: { item: MenuItem }) => (
      <CustomMenu menu={item} data-testid={TEST_ID.MENU_LIST.ITEM} onClick={() => handleClickItem(item.id)} />
    ),
    [handleClickItem],
  );

  return (
    <>
      <CustomHeading headingLevel="h2" className={S.title} data-testid={TEST_ID.MENU_LIST.TITLE}>
        {title}
      </CustomHeading>

      <CustomList<MenuItem>
        containerTag="ul"
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        data={menus}
        data-testid={TEST_ID.MENU_LIST.LIST}
      />

      {selectedMenus.length > 0 && (
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
