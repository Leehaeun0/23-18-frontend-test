import { render } from '@testing-library/react';
import MenuDetailPage from './MenuDetailPage';
import userEvent from '@testing-library/user-event';

const MENU_ITEM = {
  name: '[꼬마] 새우마요김밥',
  options: [
    { name: '1줄', price: 1500 },
    { name: '3줄', price: 4000 },
    { name: '5줄', price: 7000 },
  ],
  image: 'image01.png',
  description: '고소한 새우튀김과 특제 마요소스',
  isPopular: true,
  minOrderPrice: 9900,
};

describe('MenuDetailPage Component 랜더링 테스트', () => {
  it('메뉴 이미지 랜더링 된다', () => {
    const { getByAltText } = render(<MenuDetailPage data={MENU_ITEM} />);

    const image = getByAltText(MENU_ITEM.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', MENU_ITEM.image);
  });

  it('메뉴 이름, 설명이 랜더링 된다', () => {
    const { getByText } = render(<MenuDetailPage data={MENU_ITEM} />);

    expect(getByText(MENU_ITEM.name)).toBeInTheDocument();
    expect(getByText(MENU_ITEM.description)).toBeInTheDocument();
  });

  it('isPopular 값이 있을때 인기 텍스트가 랜더링 된다', () => {
    const { getByText } = render(<MenuDetailPage data={MENU_ITEM} />);

    expect(getByText('인기')).toBeInTheDocument();
  });

  it('가격 옵션이 하나인 경우, 가격만 랜더링 된다', () => {
    const { getByTestId, queryByRole } = render(
      <MenuDetailPage data={{ ...MENU_ITEM, options: [{ name: '1줄', price: 1500 }] }} />,
    );

    expect(queryByRole('radiogroup')).not.toBeInTheDocument();
    expect(getByTestId('priceOnly')).toBeInTheDocument();
  });

  it('가격 옵션이 여러개인 경우, 라디오 버튼이 랜더링 된다', () => {
    const { queryByTestId, getByRole, getByLabelText } = render(<MenuDetailPage data={MENU_ITEM} />);

    expect(getByRole('radiogroup')).toBeInTheDocument();
    MENU_ITEM.options.forEach((option) => {
      expect(getByLabelText(option.name)).toBeInTheDocument();
    });
    expect(queryByTestId('priceOnly')).not.toBeInTheDocument();
  });
});

describe('라디오 동작 테스트', () => {
  it('초기 랜더링시 첫번째 라디오 버튼이 선택되어 있고, 최종금액에 첫번째 옵션 가격이 랜더링된다', () => {
    const { getByRole } = render(<MenuDetailPage data={MENU_ITEM} />);
    const { name, price } = MENU_ITEM.options[0];

    expect(getByRole('radio', { name })).toBeChecked();

    const finalPrice = getByRole('button', { name: '최종금액' });
    expect(finalPrice).toHaveTextContent(`${price.toLocaleString()}원 담기`);
  });

  it('다른 옵션을 선택할 경우 최종금액에 반영된다', async () => {
    const { getByRole } = render(<MenuDetailPage data={MENU_ITEM} />);
    const user = userEvent.setup();
    const { name, price } = MENU_ITEM.options[2];

    const radioButton = getByRole('radio', { name });
    await user.click(radioButton);

    expect(radioButton).toBeChecked();

    const finalPrice = getByRole('button', { name: '최종금액' });
    expect(finalPrice).toHaveTextContent(`${price.toLocaleString()}원 담기`);
  });
});

describe('수량 버튼 동작 테스트', () => {
  it('수량 버튼의 초기값은 1이다', () => {
    const { getByLabelText } = render(<MenuDetailPage data={MENU_ITEM} />);

    expect(getByLabelText('수량 값')).toHaveTextContent('1');
  });

  it('수량이 1일 경우, 수량을 감소할 수 없다', async () => {
    const { getByRole } = render(<MenuDetailPage data={MENU_ITEM} />);
    const user = userEvent.setup();

    const minusButton = getByRole('button', { name: '수량 감소' });
    const plusButton = getByRole('button', { name: '수량 증가' });

    expect(minusButton).toBeDisabled();
    expect(plusButton).not.toBeDisabled();

    await user.click(plusButton);
    expect(minusButton).not.toBeDisabled();
  });

  it('수량 증가/감소 버튼이 정상 동작한다', async () => {
    const { getByRole, getByLabelText } = render(<MenuDetailPage data={MENU_ITEM} />);
    const user = userEvent.setup();

    const minusButton = getByRole('button', { name: '수량 감소' });
    const plusButton = getByRole('button', { name: '수량 증가' });
    await user.click(plusButton);

    expect(getByLabelText('수량 값')).toHaveTextContent('2');

    await user.click(minusButton);

    expect(getByLabelText('수량 값')).toHaveTextContent('1');
  });

  it('수량의 변경에따라 최종 가격이 변경된다', async () => {
    const { getByRole } = render(
      <MenuDetailPage data={{ ...MENU_ITEM, options: [{ name: '1줄', price: 2200 }] }} />,
    );
    const user = userEvent.setup();
    const minusButton = getByRole('button', { name: '수량 감소' });
    const plusButton = getByRole('button', { name: '수량 증가' });

    await user.click(plusButton);

    const finalPrice = getByRole('button', { name: '최종금액' });
    expect(finalPrice).toHaveTextContent('4,400원 담기');

    await user.click(minusButton);

    expect(finalPrice).toHaveTextContent('2,200원 담기');
  });
});
