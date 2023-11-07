import { render } from '@testing-library/react';
import MenuItem from './MenuItem';

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
  tags: ['사장님 추천', '배민 추천'],
};

describe('MenuItem Component', () => {
  it('메뉴 이름, 설명이 랜더링 되는지 확인.', () => {
    const { getByText } = render(<MenuItem data={MENU_ITEM} />);
    expect(getByText(MENU_ITEM.name)).toBeInTheDocument();
    expect(getByText(MENU_ITEM.description)).toBeInTheDocument();
  });

  it('isPopular 값이 있을때 인기 텍스트가 랜더링되는지 확인', () => {
    const { getByText } = render(<MenuItem data={MENU_ITEM} />);
    expect(getByText('인기')).toBeInTheDocument();
  });

  it('isPopular 값이 없을때 인기 텍스트가 랜더링되지 않는지 확인', () => {
    const { queryByText } = render(<MenuItem data={{ ...MENU_ITEM, isPopular: false }} />);
    expect(queryByText('인기')).not.toBeInTheDocument();
  });

  it('메뉴 옵션들이 올바르게 랜더링되는지 확인', () => {
    const { getByText } = render(<MenuItem data={MENU_ITEM} />);
    MENU_ITEM.options.forEach((option) => {
      expect(getByText(`${option.name} : `)).toBeInTheDocument();
      expect(getByText(option.price.toString())).toBeInTheDocument();
    });
  });

  it('메뉴 태그들이 올바르게 랜더링되는지 확인', () => {
    const { getByText } = render(<MenuItem data={MENU_ITEM} />);
    MENU_ITEM.tags.forEach((tag) => {
      expect(getByText(tag)).toBeInTheDocument();
    });
  });

  it('메뉴 이미지가 올바르게 랜더링되는지 확인', () => {
    const { getByRole } = render(<MenuItem data={MENU_ITEM} />);
    const image = getByRole('img');
    expect(image).toHaveAttribute('src', MENU_ITEM.image);
  });
});
