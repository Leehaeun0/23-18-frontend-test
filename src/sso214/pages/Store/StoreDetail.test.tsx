import userEvent from '@testing-library/user-event';
import { getStoreMenus, renderWithRouter, sumCartListTotalAmount } from '../../utils';
import { TEST_ID } from '../../constant/TEST_ID';
import snack_menu from '../../mock/snack_menu.json';
import cafe_menu from '../../mock/cafe_menu.json';
import { CartContextProps } from '../../context/CartContext';

function renderStoreDetail(storeId?: number, initialState?: CartContextProps['cartList']) {
  const STORE_LIST = [snack_menu, cafe_menu];
  const STORE_ID = storeId ?? 2;
  const DATA = getStoreMenus(STORE_ID);

  const result = renderWithRouter([`/store/${STORE_ID}`], initialState);

  const Title = () => result.queryByTestId(TEST_ID.MENU_LIST.TITLE);
  const List = () => result.queryByTestId(TEST_ID.MENU_LIST.LIST);
  const Items = () => result.queryAllByTestId(TEST_ID.MENU_LIST.ITEM);
  const Item = (index: number) => Items()[index];
  const OrderButton = () => result.queryByTestId(TEST_ID.MENU_LIST.ORDER_BUTTON);
  const OrderButtonCount = () => result.queryByTestId(TEST_ID.MENU_LIST.ORDER_BUTTON_COUNT);
  const OrderButtonAmount = () => result.queryByTestId(TEST_ID.MENU_LIST.ORDER_BUTTON_AMOUNT);
  const NoMatch = () => result.queryByTestId(TEST_ID.NO_MATCH.NO_MATCH);
  const StoreOptionPageTitle = () => result.queryByTestId(TEST_ID.MENU_OPTION.NAME);

  async function clickItem(index: number) {
    await userEvent.click(Item(index));
  }

  return {
    STORE_LIST,
    STORE_ID,
    DATA,

    result,

    Title,
    List,
    Items,
    Item,
    OrderButton,
    OrderButtonCount,
    OrderButtonAmount,
    NoMatch,
    StoreOptionPageTitle,

    clickItem,
  };
}

describe('/store/:storeId', () => {
  it('해당 경로 접속 시, 화면이 올바르게 노출된다.', () => {
    const { DATA, Title, List, Items, OrderButton, NoMatch } = renderStoreDetail();

    expect(Title()).toHaveTextContent(DATA.title);
    expect(List()).toBeInTheDocument();
    expect(Items().length).toBe(DATA.menus.length);
    expect(OrderButton()).not.toBeInTheDocument();
    expect(NoMatch()).not.toBeInTheDocument();
  });

  it('메뉴 목록이 최소 1개 이상 노출된다.', () => {
    const { Items } = renderStoreDetail();

    expect(Items().length).toBeGreaterThanOrEqual(1);
  });

  it('잘못된 storeId로 접근 시 <NoMatch /> 페이지가 노출된다.', () => {
    const { Title, NoMatch } = renderStoreDetail(5);

    expect(Title()).not.toBeInTheDocument();
    expect(NoMatch()).toBeInTheDocument();
  });

  it('메뉴 아이템 클릭 시 /store/:storeId/menu/:menuId 경로로 이동한다.', async () => {
    const { clickItem, Title, StoreOptionPageTitle, DATA } = renderStoreDetail();

    await clickItem(2);

    expect(Title()).not.toBeInTheDocument();
    expect(StoreOptionPageTitle()).toHaveTextContent(DATA.menus[2].name);
  });

  it('장바구니에 담긴 음식이 없는 경우, 하단 주문하기 버튼이 노출되지 않는다.', () => {
    const { OrderButton } = renderStoreDetail();

    expect(OrderButton()).not.toBeInTheDocument();
  });

  it('장바구니에 담긴 음식이 있는 경우, 하단 주문하기 버튼의 {개수}와 {총 금액}이 올바르게 노출된다.', () => {
    const items = [
      { ...cafe_menu.menus[0], option: { price: 2000, count: 2 } },
      { ...cafe_menu.menus[1], option: { price: 3000, count: 3 } },
      { ...cafe_menu.menus[2], option: { price: 3000, count: 4 } },
    ] as const;
    const { OrderButtonCount, OrderButtonAmount } = renderStoreDetail(cafe_menu.id, items);

    expect(OrderButtonCount()).toHaveTextContent(`${items.length}`);
    expect(OrderButtonAmount()).toHaveTextContent(`${sumCartListTotalAmount(items)}원`);
  });

  it('같은 음식을 여러 번 담은 경우, 장바구니에 중첩되어 담긴다.', () => {
    const items = [
      { ...cafe_menu.menus[2], option: { price: 3000, count: 2 } },
      { ...cafe_menu.menus[2], option: { price: 2000, count: 5 } },
    ] as const;
    const { OrderButtonCount, OrderButtonAmount } = renderStoreDetail(cafe_menu.id, items);

    expect(OrderButtonCount()).toHaveTextContent(`${items.length}`);
    expect(OrderButtonAmount()).toHaveTextContent(`${sumCartListTotalAmount(items)}원`);
  });
});
