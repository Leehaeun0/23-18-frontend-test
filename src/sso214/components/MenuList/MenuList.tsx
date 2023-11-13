import { useCallback } from 'react';
import { TEST_ID } from '../../constant/TEST_ID';
import { Menus, MenuItem } from '../../types/Model';
import { CustomList } from '../List';
import { CustomHeading } from '../Heading';
import { CustomMenu } from '../Menu';
import { CustomButton } from '../Button';
import S from './style.module.css';

interface Props {
  data: Menus;
  handleClickMenu: (menuId: MenuItem['id']) => void;
}

const MenuList = ({ data, handleClickMenu }: Props) => {
  const { title, menus } = data;

  const renderItem = useCallback(
    ({ item }: { item: MenuItem }) => (
      <CustomMenu menu={item} data-testid={TEST_ID.MENU_LIST.ITEM} onClick={() => handleClickMenu(item.id)} />
    ),
    [handleClickMenu],
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

      <CustomButton variant="first" size="large" flexible>
        <span data-testid={TEST_ID.MENU_LIST.BUTTON_COUNT}>0</span>
        <span data-testid={TEST_ID.MENU_LIST.BUTTON_TEXT}>주문하기</span>
        <span data-testid={TEST_ID.MENU_LIST.BUTTON_AMOUNT}>0원</span>
      </CustomButton>
    </>
  );
};

export default MenuList;
