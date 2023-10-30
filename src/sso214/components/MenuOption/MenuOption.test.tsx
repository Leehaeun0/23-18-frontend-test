import { render } from '@testing-library/react';
import { MENU_LIST } from '../../data/MENU_LIST';
import { MenuInfo } from '../Menu/types';
import MenuOption from './MenuOption';

function renderMenuOption(props?: Partial<MenuInfo>) {
  const DATA = MENU_LIST[0] as Required<MenuInfo>;

  const result = render(<MenuOption menu={{ ...DATA, ...props }} />);

  const Form = () => result.getByTestId('form');
  const Image = () => result.queryByTestId('image');
  const Name = () => result.getByTestId('name');
  const PopularBadge = () => result.queryByTestId('popular');
  const Description = () => result.queryByTestId('description');
  const Price = () => result.queryByTestId('price');
  const Prices = () => result.queryByTestId('prices');
  const PricesItem = () => result.queryAllByTestId('pricesItem');
  const NumberAdjuster = () => result.getByTestId('numberAdjuster');
  const SubmitButton = () => result.getByTestId('submitButton');

  return {
    DATA,

    Form,
    Image,
    Name,
    PopularBadge,
    Description,
    Price,
    Prices,
    PricesItem,
    NumberAdjuster,
    SubmitButton,
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
    expect(Prices()).toHaveTextContent(
      DATA.options.map(({ name, price }) => `${name && `${name}`}${price}원`).join(''),
    );
    expect(NumberAdjuster()).toHaveTextContent('1개');
    expect(SubmitButton()).toHaveTextContent('0원 담기');
  });

  it('이미지가 없는 경우 이미지를 보여주지 않는다.', () => {
    const { Image } = renderMenuOption({ image: undefined });

    expect(Image()).not.toBeInTheDocument();
  });

  it('isPopular 데이터가 없을 경우 "인기" 태그를 보여주지 않는다.', () => {
    const { PopularBadge } = renderMenuOption({ isPopular: false });

    expect(PopularBadge()).not.toBeInTheDocument();
  });

  it('설명 글이 없을 경우 해당 부분을 보여주지 않는다.', () => {
    const { Description } = renderMenuOption({ description: undefined });

    expect(Description()).not.toBeInTheDocument();
  });

  it('가격 옵션이 여러개인 경우 라디오 버튼 리스트가 노출된다.', () => {
    const { Prices, PricesItem, Price, DATA } = renderMenuOption();

    expect(Prices()).toBeInTheDocument();
    expect(Price()).not.toBeInTheDocument();
    expect(PricesItem().length).toBe(DATA.options.length);
    expect(Prices()).toHaveTextContent(
      DATA.options.map(({ name, price }) => `${name && `${name}`}${price}원`).join(''),
    );
  });

  it('가격 옵션이 하나인 경우 가격만 표시된다.', () => {
    const { Prices, Price } = renderMenuOption({ options: [{ price: 2500 }] });

    expect(Prices()).not.toBeInTheDocument();
    expect(Price()).toBeInTheDocument();
    expect(Price()).toHaveTextContent('2500원');
  });

  it('radio 이벤트가 올바르게 동작한다.', () => {
    //
  });

  it('NumberAdjuster 이벤트가 올바르게 동작한다.', () => {
    //
  });

  it('버튼에 최종 가격이 표시된다.', () => {
    const { SubmitButton } = renderMenuOption();
    //
  });

  it('버튼 이벤트가 올바르게 동작하며, formData가 올바르게 리턴된다.', () => {
    //
  });
});
