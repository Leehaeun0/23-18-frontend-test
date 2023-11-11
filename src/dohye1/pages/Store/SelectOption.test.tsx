import { TEST_ID } from '../../constant';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithRouter } from '../../utils';

const storeId = 'test-id';
const menuId = 'menu-id';

describe('페이지 경로: /store/:storeId/menu/:menuId', () => {
  it('해당 페이지에 접근 시, 메뉴 선택 UI(3주차의 MenuOption)를 보여줍니다.', () => {
    const { getByTestId } = renderWithRouter([`/store/${storeId}/menu/${menuId}`]);

    expect(getByTestId(TEST_ID.GROUP_TITLE)).toBeInTheDocument();
  });

  it('수량의 초기값은 1입니다.', () => {
    const { getByTestId } = renderWithRouter([`/store/${storeId}/menu/${menuId}`]);
    const button = getByTestId(TEST_ID.ADD_TO_CART);
    const count = button.getAttribute('data-count');

    expect(count).toBe('1');
  });

  it('담기 버튼을 클릭하면, 선택한 옵션을 장바구니에 담고 메뉴 선택 페이지로 돌아갑니다.', async () => {
    const item = { price: 30_000, count: 3 };
    const { getByTestId, user } = renderWithRouter([`/store/${storeId}/menu/${menuId}`], {
      cartList: { test: item },
    });

    const addButton = getByTestId(TEST_ID.ADD_TO_CART);

    await user.click(addButton);

    expect(screen.getByTestId(TEST_ID.STORE_TITLE)).toBeInTheDocument();

    const orderButton = screen.getByTestId(TEST_ID.ORDER);

    expect(orderButton).toHaveTextContent(`${1} 주문하기 ${item.count * item.price}원`);
  });
  it('브라우저의 뒤로가기 버튼을 클릭하면, 장바구니에 담지 않고 메뉴 선택 페이지로 돌아갑니다.', () => {
    renderWithRouter([`store/${storeId}`, `/store/${storeId}/menu/${menuId}`]);

    window.history.back();
    screen.debug();

    expect(screen.getByTestId(TEST_ID.GROUP_TITLE)).toBeInTheDocument();
  });
});
