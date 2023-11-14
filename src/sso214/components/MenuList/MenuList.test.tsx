import { render } from '@testing-library/react';
import { TEST_ID } from '../../constant/TEST_ID';
import { SelectedMenuItem } from '../../types/Model';
import { getStoreMenus, sumMenusTotalAmount } from '../../utils';
import { CustomMenuList } from './index';

function renderMenuList(selectedMenus?: SelectedMenuItem[]) {
  const MENUS = getStoreMenus(1);
  const mockOnClick = jest.fn();

  const result = render(
    <CustomMenuList storeMenus={MENUS} selectedMenus={selectedMenus ?? []} handleClickItem={mockOnClick} />,
  );

  const Title = () => result.getByTestId(TEST_ID.MENU_LIST.TITLE);
  const List = () => result.queryByTestId(TEST_ID.MENU_LIST.LIST);
  const Items = () => result.queryAllByTestId(TEST_ID.MENU_LIST.ITEM);
  const Button = () => result.queryByTestId(TEST_ID.MENU_LIST.ORDER_BUTTON);
  const ButtonCountText = () => result.queryByTestId(TEST_ID.MENU_LIST.ORDER_BUTTON_COUNT);
  const ButtonAmountText = () => result.queryByTestId(TEST_ID.MENU_LIST.ORDER_BUTTON_AMOUNT);

  return {
    MENUS,

    mockOnClick,

    Title,
    List,
    Items,
    Button,
    ButtonCountText,
    ButtonAmountText,
  };
}

describe('<MenuList />', () => {
  it('타이틀이 올바르게 노출된다.', () => {
    const { MENUS, Title } = renderMenuList();

    expect(Title()).toHaveTextContent(MENUS.title);
  });

  it('메뉴 아이템들이 올바르게 노출된다.', () => {
    const { MENUS, List, Items } = renderMenuList();

    expect(List()).toBeInTheDocument();
    MENUS.menus.forEach(({ name }, index) => {
      expect(Items()[index]).toHaveTextContent(name);
    });
    expect(Items().length).toBe(MENUS.menus.length);
  });

  it('선택된 메뉴가 없을 경우, 주문하기 버튼이 노출되지 않는다.', () => {
    const { Button } = renderMenuList();

    expect(Button()).not.toBeInTheDocument();
  });

  it('선택된 메뉴가 있을 경우, 주문하기 버튼의 {선택된 메뉴의 갯수}, {총 금액}이 올바르게 노출된다.', () => {
    const MENUS = getStoreMenus(1);
    const SELECTED_MENUS = [
      { ...MENUS.menus[0], selectedOption: { index: 1, count: 2 } },
      { ...MENUS.menus[1], selectedOption: { index: 0, count: 1 } },
    ];
    const { Button, ButtonCountText, ButtonAmountText } = renderMenuList(SELECTED_MENUS);

    expect(Button()).toBeInTheDocument();
    expect(ButtonCountText()).toHaveTextContent(`${SELECTED_MENUS.length}`);
    expect(ButtonAmountText()).toHaveTextContent(`${sumMenusTotalAmount(SELECTED_MENUS)}원`);
  });
});
