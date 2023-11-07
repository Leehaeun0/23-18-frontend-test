import { screen, render } from '@testing-library/react';
import { Menu } from './Menu';

describe('Menu 컴포넌트 테스트', () => {
  const title = '분식의 왕';
  const sampleData = [
    {
      name: '만두떠보기',
      isPopular: true,
      description: '개꿀맛',
      options: {
        price: 10000,
      },
      tags: ['꿀맛', 'JMT'],
      image: '음식1.jpg',
    },
    {
      name: '삼첩분식짱',
      isPopular: true,
      description: '하이 삼첩분식',
      options: {
        price: 1230000,
      },
      tags: ['개노맛', 'DOG'],
      image: '',
    },
  ];

  it('올바르게 렌더링되는지 확인', () => {
    const { getByText, getAllByRole } = render(<Menu menus={sampleData} title={title} />);

    // 각 상품의 제목이 렌더링되는지 확인
    expect(getByText('만두떠보기')).toBeInTheDocument();
    expect(getByText('삼첩분식짱')).toBeInTheDocument();

    // '인기' 태그가 있는 상품의 경우, 해당 태그가 렌더링되는지 확인
    const elementsWithText = screen.getAllByText('인기');

    // elementsWithText 배열에 요소가 있는지 확인합니다.
    expect(elementsWithText.length).toBeGreaterThan(0);

    // 각 요소가 HTMLElement인지 확인합니다.
    elementsWithText.forEach((element) => {
      expect(element).toBeInTheDocument();
    });

    // 설명과 가격이 있는지 확인
    expect(getByText('개꿀맛')).toBeInTheDocument();
    expect(getByText('10000')).toBeInTheDocument();
    expect(getByText('1230000')).toBeInTheDocument();
    expect(getByText('하이 삼첩분식')).toBeInTheDocument();

    // 태그는 한개 이상 있어야 됨
    const tags = getAllByRole('listitem');
    expect(tags.length).toBeGreaterThanOrEqual(1);
  });

  it('설명이 없는 상품의 경우, 설명이 렌더링되지 않아야 함', () => {
    const { queryByText } = render(<Menu menus={sampleData} title={title} />);

    expect(queryByText('이런건 없겟지?')).not.toBeInTheDocument();
    expect(queryByText('이것또한')).not.toBeInTheDocument();
  });

  it('이미지 URL이 없는 상품의 경우, 대체값이 렌더링되어야 함', () => {
    const { getAllByAltText } = render(<Menu menus={sampleData} title={title} />);

    const altTexts = sampleData.filter((data) => !data.image).map((data) => data.name);

    altTexts.forEach((altText) => {
      expect(getAllByAltText(altText).length).toBeGreaterThan(0);
    });
  });
});
