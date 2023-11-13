import { render } from '@testing-library/react';
import { TEST_ID } from '../../constant/TEST_ID';
import snack_menu from '../../mock/snack_menu.json';
import { CustomMenuList } from './index';

function renderMenuList() {
  const DATA = snack_menu.menus;
  const TITLE = snack_menu.title;

  const mockOnClick = jest.fn();

  const result = render(
    <CustomMenuList storeMenus={snack_menu} handleClickItem={mockOnClick} cartList={[]} />,
  );

  const Title = () => result.getByTestId(TEST_ID.MENU_LIST.TITLE);
  const List = () => result.queryByTestId(TEST_ID.MENU_LIST.LIST);
  const ListItems = () => result.queryAllByTestId(TEST_ID.MENU_LIST.ITEM);

  return {
    DATA,
    TITLE,

    mockOnClick,

    Title,
    List,
    ListItems,
  };
}

describe('<MenuList />', () => {
  it('타이틀이 올바르게 렌더링된다.', () => {
    const { Title, TITLE } = renderMenuList();

    expect(Title()).toHaveTextContent(TITLE);
  });

  it('메뉴 아이템들이 올바르게 렌더링된다.', () => {
    const { List, ListItems, DATA } = renderMenuList();

    expect(List()).toBeInTheDocument();
    DATA.forEach(({ name }, index) => {
      expect(ListItems()[index]).toHaveTextContent(name);
    });
    expect(ListItems().length).toBe(DATA.length);
  });
});
