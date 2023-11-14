import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TEST_ID } from '../../constant/TEST_ID';
import { MenuItem } from '../../types/Model';
import { CustomMenuOption } from './index';
import { getStoreMenu } from '../../utils';

function renderMenuOption(props?: Partial<MenuItem>) {
  const MENU = getStoreMenu(1, 1);

  const mockOnClick = jest.fn();

  const result = render(<CustomMenuOption menu={{ ...MENU, ...props }} handleSubmit={mockOnClick} />);

  const Form = () => result.getByTestId(TEST_ID.MENU_OPTION.FORM);
  const Image = () => result.queryByTestId(TEST_ID.MENU_OPTION.IMAGE);
  const Name = () => result.getByTestId(TEST_ID.MENU_OPTION.NAME);
  const PopularBadge = () => result.queryByTestId(TEST_ID.MENU_OPTION.POPULAR);
  const Description = () => result.queryByTestId(TEST_ID.MENU_OPTION.DESCRIPTION);
  const Price = () => result.queryByTestId(TEST_ID.MENU_OPTION.PRICE);
  const Prices = () => result.queryByTestId(TEST_ID.RADIOS.RADIO_GROUP);
  const PricesItems = () => result.queryAllByTestId(TEST_ID.RADIOS.RADIO_ITEM);
  const PricesItemsRadio = (index: number) => PricesItems()[index].children[0];
  const NumberAdjuster = () => result.getByTestId(TEST_ID.NUMBER_ADJUSTER.NUMBER_ADJUSTER);
  const NumberAdjusterDecreaseButton = () => result.getByTestId(TEST_ID.NUMBER_ADJUSTER.DECREASE_BUTTON);
  const NumberAdjusterIncreaseButton = () => result.getByTestId(TEST_ID.NUMBER_ADJUSTER.INCREASE_BUTTON);
  const SubmitButton = () => result.getByTestId(TEST_ID.MENU_OPTION.SUBMIT_BUTTON);

  async function clickRadio(index: number) {
    await userEvent.click(PricesItemsRadio(index));
  }
  async function clickDecreaseButton() {
    await userEvent.click(NumberAdjusterDecreaseButton());
  }
  async function clickIncreaseButton() {
    await userEvent.click(NumberAdjusterIncreaseButton());
  }
  async function clickSubmitButton() {
    await userEvent.click(SubmitButton());
  }

  return {
    MENU,
    mockOnClick,

    Form,
    Image,
    Name,
    PopularBadge,
    Description,
    Price,
    Prices,
    PricesItems,
    PricesItemsRadio,
    NumberAdjuster,
    NumberAdjusterDecreaseButton,
    NumberAdjusterIncreaseButton,
    SubmitButton,

    clickRadio,
    clickDecreaseButton,
    clickIncreaseButton,
    clickSubmitButton,
  };
}

describe('<MenuOption />', () => {
  it('처음 렌더링 시 각 요소들이 올바르게 렌더링된다.', () => {
    const { MENU, Form, Image, PopularBadge, Name, Description, Prices, NumberAdjuster, SubmitButton } =
      renderMenuOption();

    expect(Form()).toBeInTheDocument();
    expect(Image()).toHaveAttribute('src', MENU.image);
    expect(PopularBadge()).toHaveTextContent('인기');
    expect(Name()).toHaveTextContent(MENU.name);
    expect(Description()).toHaveTextContent(MENU.description);
    expect(Prices()).toHaveTextContent(MENU.options.map(({ name, price }) => `${name}${price}원`).join(''));
    expect(NumberAdjuster()).toHaveTextContent('1개');
    expect(SubmitButton()).toHaveTextContent(`${MENU.options[0].price}원 담기`);
  });

  it('이미지가 없는 경우 이미지를 보여주지 않는다.', () => {
    const { Image } = renderMenuOption({ image: undefined });

    expect(Image()).not.toBeInTheDocument();
  });

  it('isPopular 데이터가 없을 경우 "인기" 태그를 보여주지 않는다.', () => {
    const { PopularBadge } = renderMenuOption({ isPopular: false });

    expect(PopularBadge()).not.toBeInTheDocument();
  });

  it('설명 글이 없을 경우 description 부분을 보여주지 않는다.', () => {
    const { Description } = renderMenuOption({ description: undefined });

    expect(Description()).not.toBeInTheDocument();
  });

  it('가격 옵션이 하나인 경우 가격만 표시된다.', () => {
    const { Prices, Price } = renderMenuOption({ options: [{ price: 2500 }] });

    expect(Prices()).not.toBeInTheDocument();
    expect(Price()).toBeInTheDocument();
    expect(Price()).toHaveTextContent('2500원');
  });

  it('가격 옵션이 여러개인 경우 라디오 버튼 리스트가 노출된다.', () => {
    const { MENU, Price, Prices, PricesItems, PricesItemsRadio } = renderMenuOption();

    expect(Price()).not.toBeInTheDocument();
    expect(Prices()).toHaveTextContent(MENU.options.map(({ name, price }) => `${name}${price}원`).join(''));
    expect(PricesItems().length).toBe(MENU.options.length);
    expect(PricesItemsRadio(0)).toBeChecked();
  });

  it('라디오 버튼 클릭 시, 해당 라디오 버튼이 선택되고 Submit 버튼에 가격이 올바르게 표시된다.', async () => {
    const { MENU, clickRadio, PricesItemsRadio, SubmitButton } = renderMenuOption();

    await clickRadio(2);

    expect(PricesItemsRadio(2)).toBeChecked();
    expect(SubmitButton()).toHaveTextContent(`${MENU.options[2].price}원 담기`);
  });

  it('NumberAdjuster 클릭 시, 숫자 값이 계산되고 Submit 버튼에 가격이 올바르게 표시된다.', async () => {
    const { MENU, NumberAdjuster, clickDecreaseButton, clickIncreaseButton, SubmitButton } =
      renderMenuOption();
    const PRICE = MENU.options[0].price;

    await clickIncreaseButton();
    await clickIncreaseButton();

    expect(NumberAdjuster()).toHaveTextContent('3개');
    expect(SubmitButton()).toHaveTextContent(`${PRICE * 3}원 담기`);

    await clickDecreaseButton();

    expect(NumberAdjuster()).toHaveTextContent('2개');
    expect(SubmitButton()).toHaveTextContent(`${PRICE * 2}원 담기`);
  });

  it('버튼 이벤트가 올바르게 동작하며, formData가 올바르게 return된다.', async () => {
    const { MENU, mockOnClick, clickSubmitButton, clickRadio, clickIncreaseButton } = renderMenuOption();

    await clickRadio(1);
    await clickIncreaseButton();
    await clickSubmitButton();

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenLastCalledWith({
      ...MENU,
      selectedOption: {
        index: 1,
        count: 2,
      },
    });
  });
});
