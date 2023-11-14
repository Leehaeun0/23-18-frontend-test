import { screen } from '@testing-library/react';
import { renderWithRouter, getStoreMenu } from '../../utils';
import { TEST_ID } from '../../constant/TEST_ID';

function renderStoreOption() {
  const STORE_ID = 1;
  const MENU_ID = 1;
  const MENU = getStoreMenu(STORE_ID, MENU_ID);

  const { user, ...result } = renderWithRouter([`/store/${STORE_ID}`, `/store/${STORE_ID}/menu/${MENU_ID}`]);

  const Form = () => result.queryByTestId(TEST_ID.MENU_OPTION.FORM);
  const Name = () => result.queryByTestId(TEST_ID.MENU_OPTION.NAME);
  const Price = () => result.queryByTestId(TEST_ID.MENU_OPTION.PRICE);
  const Prices = () => result.queryByTestId(TEST_ID.RADIOS.RADIO_GROUP);
  const PricesItems = () => result.queryAllByTestId(TEST_ID.RADIOS.RADIO_ITEM);
  const PricesItemsRadio = (index: number) => PricesItems()[index].children[0];
  const NumberAdjuster = () => result.getByTestId(TEST_ID.NUMBER_ADJUSTER.NUMBER_ADJUSTER);
  const NumberAdjusterDecreaseButton = () => result.getByTestId(TEST_ID.NUMBER_ADJUSTER.DECREASE_BUTTON);
  const NumberAdjusterIncreaseButton = () => result.getByTestId(TEST_ID.NUMBER_ADJUSTER.INCREASE_BUTTON);
  const SubmitButton = () => result.getByTestId(TEST_ID.MENU_OPTION.SUBMIT_BUTTON);

  const StoreDetailPageTitle = () => result.queryByTestId(TEST_ID.MENU_LIST.TITLE);
  const StoreDetailItems = () => result.queryAllByTestId(TEST_ID.MENU_LIST.ITEM);
  const StoreDetailItem = (index: number) => StoreDetailItems()[index];
  const StoreDetailPageOrderButton = () => result.queryByTestId(TEST_ID.MENU_LIST.ORDER_BUTTON);
  const StoreDetailPageOrderButtonCount = () => result.queryByTestId(TEST_ID.MENU_LIST.ORDER_BUTTON_COUNT);
  const StoreDetailPageOrderButtonAmount = () => result.queryByTestId(TEST_ID.MENU_LIST.ORDER_BUTTON_AMOUNT);

  async function clickRadio(index: number) {
    await user.click(PricesItemsRadio(index));
  }
  async function clickDecreaseButton() {
    await user.click(NumberAdjusterDecreaseButton());
  }
  async function clickIncreaseButton() {
    await user.click(NumberAdjusterIncreaseButton());
  }
  async function clickSubmitButton() {
    await user.click(SubmitButton());
  }
  async function clickStoreDetailItem(index: number) {
    await user.click(StoreDetailItem(index));
  }

  return {
    MENU,

    Form,
    Name,
    Price,
    Prices,
    NumberAdjuster,

    StoreDetailPageTitle,
    StoreDetailItems,
    StoreDetailItem,
    StoreDetailPageOrderButton,
    StoreDetailPageOrderButtonCount,
    StoreDetailPageOrderButtonAmount,

    clickRadio,
    clickDecreaseButton,
    clickIncreaseButton,
    clickSubmitButton,
    clickStoreDetailItem,
  };
}

describe('/store/:storeId/menu/:menuId', () => {
  it('해당 경로 접속 시, 화면이 올바르게 노출된다.', () => {
    const { MENU, Form, Name } = renderStoreOption();

    expect(Form()).toBeInTheDocument();
    expect(Name()).toHaveTextContent(MENU.name);
  });

  it('수량 초기값이 1로 노출된다.', () => {
    const { NumberAdjuster } = renderStoreOption();

    expect(NumberAdjuster()).toHaveTextContent('1개');
  });

  it('담기 버튼 클릭 시, 선택한 옵션이 장바구니에 담기고 /store/:storeId 경로로 이동한다.', async () => {
    const {
      MENU,
      clickSubmitButton,
      Form,
      StoreDetailPageTitle,
      clickRadio,
      clickIncreaseButton,
      StoreDetailPageOrderButtonCount,
      StoreDetailPageOrderButtonAmount,
    } = renderStoreOption();

    await clickRadio(2);
    await clickIncreaseButton();
    await clickIncreaseButton();
    await clickSubmitButton();

    expect(Form()).not.toBeInTheDocument();
    expect(StoreDetailPageTitle()).toBeInTheDocument();
    expect(StoreDetailPageOrderButtonCount()).toHaveTextContent('1');
    expect(StoreDetailPageOrderButtonAmount()).toHaveTextContent(`${MENU.options[2].price * 3}원`);
  });

  it.skip('브라우저의 뒤로가기 버튼 클릭 시, 장바구니에는 변동이 없고 /store/:storeId 경로로 이동한다.', async () => {
    const {
      MENU,
      Name,
      StoreDetailPageOrderButtonCount,
      StoreDetailPageOrderButtonAmount,
      clickRadio,
      clickIncreaseButton,
      clickSubmitButton,
      clickStoreDetailItem,
    } = renderStoreOption();

    // await clickRadio(2);
    // await clickIncreaseButton();
    // await clickIncreaseButton();
    // await clickSubmitButton();
    //
    // expect(StoreDetailPageOrderButtonCount()).toHaveTextContent('1');
    // expect(StoreDetailPageOrderButtonAmount()).toHaveTextContent(`${MENU.options[2].price * 3}원`);
    //
    // await clickStoreDetailItem(0);
    // await clickRadio(2);
    // await clickIncreaseButton();
    //
    // expect(Name()).toHaveTextContent(MENU.name);

    // window.history.go(`/store/1`);
    // window.history.go(`/store/1/menu/1`);
    window.history.pushState(null, null, '/store/1');
    screen.debug();
    window.history.pushState(null, null, '/store/1/menu/1');
    screen.debug();
    window.history.back();
    screen.debug();

    // expect(StoreDetailPageOrderButtonCount()).toHaveTextContent('1');
    // expect(StoreDetailPageOrderButtonAmount()).toHaveTextContent(`${MENU.options[2].price * 3}원`);

    // expect(StoreDetailPageOrderButtonCount()).toHaveTextContent('1');
    // expect(StoreDetailPageOrderButtonAmount()).toHaveTextContent(`${MENU.options[2].price * 3}원`);
  });
});
