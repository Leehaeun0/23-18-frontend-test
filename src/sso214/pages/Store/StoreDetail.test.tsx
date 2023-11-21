import { renderWithRouter, getStoreMenus, getStoreMenu, sumMenusTotalAmount, STORE_LIST } from '../../utils';
import { TEST_ID } from '../../constant/TEST_ID';
import { CartContextProps } from '../../context/CartContext';

function renderStoreDetail(storeId?: number, initialState?: CartContextProps['cartList']) {
  const STORE_ID = storeId ?? 2;
  const MENUS = getStoreMenus(STORE_ID);

  const result = renderWithRouter([`/store/${STORE_ID}`], initialState);

  const Title = () => result.queryByTestId(TEST_ID.MENU_LIST.TITLE);
  const List = () => result.queryByTestId(TEST_ID.MENU_LIST.LIST);
  const Items = () => result.queryAllByTestId(TEST_ID.MENU_LIST.ITEM);
  const Item = (index: number) => Items()[index];
  const Button = () => result.queryByTestId(TEST_ID.MENU_LIST.ORDER_BUTTON);
  const ButtonCountText = () => result.queryByTestId(TEST_ID.MENU_LIST.ORDER_BUTTON_COUNT);
  const ButtonAmountText = () => result.queryByTestId(TEST_ID.MENU_LIST.ORDER_BUTTON_AMOUNT);

  const NoMatch = () => result.queryByTestId(TEST_ID.NO_MATCH.NO_MATCH);
  const StoreOptionPageTitle = () => result.queryByTestId(TEST_ID.MENU_OPTION.NAME);

  async function clickItem(index: number) {
    await result.user.click(Item(index));
  }

  return {
    STORE_ID,
    MENUS,

    Title,
    List,
    Items,
    Item,
    Button,
    ButtonCountText,
    ButtonAmountText,

    NoMatch,
    StoreOptionPageTitle,

    clickItem,
  };
}

describe('/store/:storeId', () => {
  it('해당 경로 접속 시, 화면이 올바르게 노출된다.', () => {
    const { MENUS, Title, NoMatch } = renderStoreDetail();

    expect(Title()).toHaveTextContent(MENUS.title);
    expect(NoMatch()).not.toBeInTheDocument();
  });

  it('메뉴 목록이 최소 1개 이상 노출된다.', () => {
    const { Items } = renderStoreDetail();

    expect(Items().length).toBeGreaterThanOrEqual(1);
  });

  it('잘못된 storeId로 접근 시 <NoMatch /> 페이지가 노출된다.', () => {
    const { Title, NoMatch } = renderStoreDetail(STORE_LIST.length + 1);

    expect(Title()).not.toBeInTheDocument();
    expect(NoMatch()).toBeInTheDocument();
  });

  it('메뉴 아이템 클릭 시 /store/:storeId/menu/:menuId 경로로 이동한다.', async () => {
    const ITEM_INDEX = 2;
    const { MENUS, clickItem, Title, StoreOptionPageTitle } = renderStoreDetail();

    await clickItem(ITEM_INDEX);

    expect(Title()).not.toBeInTheDocument();
    expect(StoreOptionPageTitle()).toHaveTextContent(MENUS.menus[ITEM_INDEX].name);
  });

  it('같은 음식을 여러 번 담은 경우, 장바구니에 중첩되어 담긴다.', () => {
    const MENU = getStoreMenu(2, 3);
    const SELECTED_MENUS = [
      { ...MENU, selectedOption: { index: 0, count: 2 } },
      { ...MENU, selectedOption: { index: 0, count: 5 } },
    ];

    const { ButtonCountText, ButtonAmountText } = renderStoreDetail(2, SELECTED_MENUS);

    expect(ButtonCountText()).toHaveTextContent(`${SELECTED_MENUS.length}`);
    expect(ButtonAmountText()).toHaveTextContent(`${sumMenusTotalAmount(SELECTED_MENUS)}원`);
  });
});
