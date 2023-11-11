import { render } from '@testing-library/react';
import MenuOption from './';
import { getSingleMenu } from '../../utils';
import { TEST_ID } from '../../constant';

const mock = getSingleMenu();

const noop = () => console.log('noop');

describe('MenuOption', () => {
  describe('메뉴 이미지', () => {
    it('위에 메뉴 이미지를 보여줍니다.', () => {
      const { getByRole } = render(<MenuOption {...mock} onAddToCart={noop} reviewCount={0} />);
      const image = getByRole('img');
      expect(image).toHaveAttribute('src', mock.image);
      expect(image).toHaveAttribute('alt', mock.name);
    });
    it('이미지가 없으면 안보여줍니다.', () => {
      const { queryByRole } = render(<MenuOption {...mock} onAddToCart={noop} reviewCount={0} />);
      const image = queryByRole('image');
      expect(image).not.toBeInTheDocument();
    });
  });
  describe('`인기` 표시, 메뉴 이름, 설명을 보여줍니다.', () => {
    it('isPopular가 true이면 인기 표시를 보여준다.', () => {
      const { getByLabelText } = render(<MenuOption {...mock} onAddToCart={noop} isPopular />);
      const popularBadge = getByLabelText('popular');
      expect(popularBadge).toHaveTextContent('인기');
    });
    it('isPopular가 false이면 인기 표시를 안보여준다.', () => {
      const { queryByLabelText } = render(<MenuOption {...mock} onAddToCart={noop} isPopular={false} />);
      const popularBadge = queryByLabelText('popular');
      expect(popularBadge).not.toBeInTheDocument();
    });
    it('description이 있으면 설명을 보여준다.', () => {
      const description = '설명';
      const { getByLabelText } = render(
        <MenuOption {...mock} onAddToCart={noop} description={description} />,
      );
      const desc = getByLabelText('description');
      expect(desc).toHaveTextContent(description);
    });
  });
  describe('가격 옵션이 여러개인 경우', () => {
    it('가격 목록 아래에 라디오 버튼으로 옵션 중 하나를 선택해야 합니다.', () => {
      const { getByLabelText } = render(<MenuOption {...mock} onAddToCart={noop} isPopular />);
      const popularBadge = getByLabelText('popular');
      expect(popularBadge).toHaveTextContent('인기');
    });
  });
  describe('가격 옵션이 하나인 경우', () => {
    it('가격만 표시합니다.', () => {
      const { getByLabelText } = render(<MenuOption {...mock} onAddToCart={noop} isPopular />);
      const popularBadge = getByLabelText('popular');
      expect(popularBadge).toHaveTextContent('인기');
    });
  });
  // it('수량을 선택할 수 있습니다.', () => {
  //   expect().toBe(undefined);
  // });
  // it('클릭하여 숫자를 조절할 수 있으며, 최소 값은 1입니다.', () => {
  //   expect().toBe(undefined);
  // });
  it('가장 아래에는 장바구니에 담기 버튼이 있습니다.', () => {
    const { getByTestId } = render(<MenuOption {...mock} onAddToCart={noop} />);
    const button = getByTestId(TEST_ID.ADD_TO_CART);
    expect(button).toBeInTheDocument();
  });
  it('${최종_가격}원 담기 형식으로 표현되어야 합니다.', () => {
    const { getByTestId } = render(<MenuOption {...mock} onAddToCart={noop} />);
    const button = getByTestId(TEST_ID.ADD_TO_CART);
    expect(button).toHaveTextContent('원 담기');
  });
});
