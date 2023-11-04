import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MenuOption from '../components/MenuOption';
import type { MenuInterface } from '../types';
import { BrowserRouter as Router } from 'react-router-dom';
const mock: MenuInterface = {
  id: 1,
  name: '[부산] 가래떡 떡볶이',
  options: [
    {
      price: 1000,
    },
  ],
  isPopular: true,
  tags: [],
};

const renderMenuOption = (props?: Partial<MenuInterface>) => {
  return render(
    <Router>
      <MenuOption {...mock} {...props} />
    </Router>,
  );
};

describe('MenuOption Component', () => {
  it('메뉴 이름을 보여준다.', () => {
    const { getByRole } = renderMenuOption({ name: '왕김밥' });
    const menuName = getByRole('heading');
    expect(menuName).toHaveTextContent('왕김밥');
  });

  it('description prop이 있으면 메뉴에 대한 설명을 보여준다.', () => {
    const { getByRole } = renderMenuOption({ description: '맛있는 계란말이 김밥' });
    const menuDescription = getByRole('caption');
    expect(menuDescription).toHaveTextContent('맛있는 계란말이 김밥');
  });

  it('description prop이 없으면 메뉴에 대한 설명이 존재하지 않는다.', () => {
    const { queryByRole } = renderMenuOption();
    const menuDescription = queryByRole('caption');
    expect(menuDescription).not.toBeInTheDocument();
  });

  describe('메뉴 이미지', () => {
    it('메뉴 이미지가 있으면 보여준다.', () => {
      const { getByRole } = renderMenuOption({ name: '왕김밥', image: 'king_kimbab.png' });
      const image = getByRole('img');
      expect(image).toHaveAttribute('src', 'king_kimbab.png');
      expect(image).toHaveAttribute('alt', '왕김밥 이미지');
    });

    it('메뉴 이미지가 없으면 보여주지 않는다.', () => {
      const { queryByRole } = renderMenuOption();
      const image = queryByRole('img'); // getByRole은 없으면 에러를 뱉고 queryByRole은 없으면 null을 뱉음
      expect(image).not.toBeInTheDocument();
    });
  });

  describe('인기 표시 뱃지', () => {
    it('isPopular이 true면 인기 표시를 보여준다.', () => {
      const { getByRole } = renderMenuOption({ isPopular: true });
      const badge = getByRole('badge');
      expect(badge).toBeInTheDocument();
    });

    it('isPopular이 false면 인기 표시를 보여주지 않는다.', () => {
      const { queryByRole } = renderMenuOption({ isPopular: false });
      expect(queryByRole('badge')).not.toBeInTheDocument();
    });
  });

  describe('가격', () => {
    it('가격 옵션이 여러개인 경우 라디오 버튼으로 옵션을 나열한다.', () => {
      const { getByRole } = renderMenuOption({
        options: [
          {
            name: '2줄',
            price: 2700,
          },
          {
            name: '3줄',
            price: 3700,
          },
          {
            name: '4줄',
            price: 4700,
          },
        ],
      });
      const menuOptions = getByRole('radiogroup');
      expect(menuOptions).toBeInTheDocument();
    });

    it('가격 옵션이 하나인 경우 가격만 표시한다.', () => {
      const { getByTestId } = renderMenuOption({
        options: [
          {
            name: '2줄',
            price: 2700,
          },
        ],
      });
      const menuPrice = getByTestId('priceOnly');
      expect(menuPrice).toHaveTextContent('2,700원');
    });

    it('수량을 변경할 수 있는 버튼이 있다.', () => {
      const { getByRole } = renderMenuOption({
        options: [
          {
            name: '2줄',
            price: 2700,
          },
        ],
      });
      const minusBtn = getByRole('button', { name: '수량 감소' });
      const plusBtn = getByRole('button', { name: '수량 증가' });
      expect(minusBtn).toBeInTheDocument();
      expect(plusBtn).toBeInTheDocument();
    });

    it('수량이 1일 때 수량을 감소할 수 없다.', async () => {
      const user = userEvent.setup();
      const { getByRole } = renderMenuOption({
        options: [
          {
            name: '2줄',
            price: 2700,
          },
        ],
      });
      const minusBtn = getByRole('button', { name: '수량 감소' });
      const plusBtn = getByRole('button', { name: '수량 증가' });

      expect(minusBtn).toBeDisabled();
      expect(plusBtn).not.toBeDisabled();

      await user.click(plusBtn);
      expect(minusBtn).not.toBeDisabled();
    });

    describe('수량을 변경하면 최종 가격이 변경된다.', () => {
      it('+ 버튼을 클릭', async () => {
        const user = userEvent.setup();
        const { getByRole } = renderMenuOption({
          options: [
            {
              name: '2줄',
              price: 2700,
            },
          ],
        });
        const plusBtn = getByRole('button', { name: '수량 증가' });
        const menuPrice = getByRole('button', { name: '최종금액' });

        expect(menuPrice).toHaveTextContent('2,700원');

        await user.click(plusBtn);

        expect(menuPrice).toHaveTextContent('5,400원');
      });

      it('- 버튼을 클릭', async () => {
        const user = userEvent.setup();
        const { getByRole } = renderMenuOption({
          options: [
            {
              name: '2줄',
              price: 2700,
            },
          ],
        });
        const minusBtn = getByRole('button', { name: '수량 감소' });
        const plusBtn = getByRole('button', { name: '수량 증가' });
        const menuPrice = getByRole('button', { name: '최종금액' });

        await user.click(plusBtn);
        expect(menuPrice).toHaveTextContent('5,400원');

        await user.click(minusBtn);
        expect(menuPrice).toHaveTextContent('2,700원');
      });
    });
  });
});
