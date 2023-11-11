import { TEST_ID } from '../../constant';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithRouter } from '../../utils';

const storeId = 'test-id';
const menuId = 'menu-id';

describe('메뉴 선택 페이지', () => {
  describe('페이지 경로: /store/:storeId', () => {
    it('해당 페이지에 접근 시, 메뉴 목록(2주차의 MenuList)을 보여줍니다.', () => {
      const { getByText } = renderWithRouter([`/store/${storeId}`]);

      expect(getByText(storeId)).toBeInTheDocument();
    });
    it('메뉴 목록을 1개 이상 가지고 있습니다.', () => {
      const page = renderWithRouter([`/store/${storeId}`]);
      const groupList = page.getAllByTestId(TEST_ID.MENU_GROUP);

      expect(groupList.length).toBeGreaterThanOrEqual(1);
    });
    it('메뉴를 클릭 하면, 옵션 선택 페이지로 이동해야 합니다.', async () => {
      const { getAllByTestId, user } = renderWithRouter([`/store/${storeId}`]);
      const itemList = getAllByTestId(TEST_ID.MENU_ITEM);

      await user.click(itemList[0]);

      expect(screen.getByTestId(TEST_ID.GROUP_TITLE)).toBeInTheDocument();
    });
    it('장바구니에 담긴 음식이 없는 경우, 하단 주문하기 버튼이 보이지 않아야 합니다.', () => {
      const { queryByRole } = renderWithRouter([`/store/${storeId}/menu/${menuId}`]);
      const orderButton = queryByRole('button', { name: 'order' });
      expect(orderButton).not.toBeInTheDocument();
    });
    it('장바구니에 담긴 음식이 있는 경우, 하단 주문하기 버튼이 {개수} 주문하기 {총 금액} 형태로 노출돼야 합니다.', () => {
      const item = { price: 30_000, count: 3 };

      const { getByTestId } = renderWithRouter([`/store/${storeId}`], {
        cartList: { test: item },
      });

      const orderButton = getByTestId(TEST_ID.ORDER);

      expect(orderButton).toHaveTextContent(`${1} 주문하기 ${item.count * item.price}원`);
    });
  });
});
``;
