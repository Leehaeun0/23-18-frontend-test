import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MENU_LIST } from '../../data/MENU_LIST';
import { MenuInfo } from '../Menu/types';
import MenuOption from './MenuOption';

function renderMenuOption(props?: Partial<MenuInfo>) {
  const DATA = MENU_LIST[0] as Required<MenuInfo>;

  const mockOnClick = jest.fn();

  const result = render(<MenuOption menu={{ ...DATA, ...props }} handleSubmit={mockOnClick} />);

  const Form = () => result.getByTestId('form');
  const Image = () => result.queryByTestId('image');
  const Name = () => result.getByTestId('name');
  const PopularBadge = () => result.queryByTestId('popular');
  const Description = () => result.queryByTestId('description');
  const Price = () => result.queryByTestId('price');
  const Prices = () => result.queryByTestId('radioGroup');
  const PricesItems = () => result.queryAllByTestId('radioItem');
  const PricesItemsRadio = (index: number) => PricesItems()[index].children[0];
  const NumberAdjuster = () => result.getByTestId('numberAdjuster');
  const NumberAdjusterDecreaseButton = () => result.getByTestId('decreaseButton');
  const NumberAdjusterIncreaseButton = () => result.getByTestId('increaseButton');
  const SubmitButton = () => result.getByTestId('submitButton');

  async function clickRadio(index: number) {
    await userEvent.click(PricesItemsRadio(index));
  }
  async function clickDecreaseButton() {
    await userEvent.click(NumberAdjusterDecreaseButton());
  }
  async function clickIncreaseButton() {
    await userEvent.click(NumberAdjusterIncreaseButton());
  }
  function clickSubmitButton() {
    fireEvent.submit(SubmitButton());
  }

  return {
    DATA,
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
    const { DATA, Form, Image, PopularBadge, Name, Description, Prices, NumberAdjuster, SubmitButton } =
      renderMenuOption();

    expect(Form()).toBeInTheDocument();
    expect(Image()).toHaveAttribute('src', DATA.image);
    expect(PopularBadge()).toHaveTextContent('인기');
    expect(Name()).toHaveTextContent(DATA.name);
    expect(Description()).toHaveTextContent(DATA.description);
    expect(Prices()).toHaveTextContent(DATA.options.map(({ name, price }) => `${name}${price}원`).join(''));
    expect(NumberAdjuster()).toHaveTextContent('1개');
    expect(SubmitButton()).toHaveTextContent(`${DATA.options[0].price}원 담기`);
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
    const { Price, Prices, PricesItems, PricesItemsRadio, DATA } = renderMenuOption();

    expect(Price()).not.toBeInTheDocument();
    expect(Prices()).toHaveTextContent(DATA.options.map(({ name, price }) => `${name}${price}원`).join(''));
    expect(PricesItems().length).toBe(DATA.options.length);
    expect(PricesItemsRadio(0)).toBeChecked();
  });

  it('라디오 버튼 클릭 시, 해당 라디오 버튼이 선택되고 Submit 버튼에 가격이 올바르게 표시된다.', async () => {
    const { clickRadio, PricesItemsRadio, SubmitButton, DATA } = renderMenuOption();

    await clickRadio(2);

    expect(PricesItemsRadio(2)).toBeChecked();
    expect(SubmitButton()).toHaveTextContent(`${DATA.options[2].price}원 담기`);
  });

  it('NumberAdjuster 클릭 시, 숫자 값이 계산되고 Submit 버튼에 가격이 올바르게 표시된다.', async () => {
    const { DATA, NumberAdjuster, clickDecreaseButton, clickIncreaseButton, SubmitButton } =
      renderMenuOption();
    const price = DATA.options[0].price;

    await clickIncreaseButton();
    await clickIncreaseButton();

    expect(NumberAdjuster()).toHaveTextContent('3개');
    expect(SubmitButton()).toHaveTextContent(`${price * 3}원 담기`);

    await clickDecreaseButton();

    expect(NumberAdjuster()).toHaveTextContent('2개');
    expect(SubmitButton()).toHaveTextContent(`${price * 2}원 담기`);
  });

  it('버튼 이벤트가 올바르게 동작하며, formData가 올바르게 return된다.', async () => {
    const { mockOnClick, clickSubmitButton, DATA, clickRadio, clickIncreaseButton } = renderMenuOption();

    await clickRadio(1);
    await clickIncreaseButton();
    clickSubmitButton();

    await waitFor(() => {
      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(mockOnClick).toHaveBeenLastCalledWith({
        price: DATA.options[1].price,
        quantity: 2,
        amount: DATA.options[1].price * 2,
      });
    });
  });
});
