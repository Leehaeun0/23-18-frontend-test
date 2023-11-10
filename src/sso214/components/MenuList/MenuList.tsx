import { useCallback } from 'react';
import { TEST_ID } from '../../constant/TEST_ID';
import { Menus, MenuItem } from '../../types/Model';
import { CustomList } from '../List';
import { CustomHeading } from '../Heading';
import { CustomMenu } from '../Menu';
import { CustomButton } from '../Button';
import S from './style.module.css';

type Props = Menus;

const MenuList = ({ title, menus }: Props) => {
  const renderItem = useCallback(
    ({ item }: { item: MenuItem }) => <CustomMenu data-testid={TEST_ID.MENU_LIST.ITEM} menu={item} />,
    [],
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
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        data-testid={TEST_ID.MENU_LIST.LIST}
      />

      <CustomButton variant="first" size="large" flexible>
        <span data-testid={TEST_ID.MENU_LIST.BUTTON_COUNT}>1</span>
        <span data-testid={TEST_ID.MENU_LIST.BUTTON_TEXT}>주문하기</span>
        <span data-testid={TEST_ID.MENU_LIST.BUTTON_AMOUNT}>3,100원</span>
      </CustomButton>
    </>
  );
};

export default MenuList;
