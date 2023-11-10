import { render } from '@testing-library/react';
import { renderWithRouter } from '../../utils';
import { StoreDetail } from './index';

function renderStoreDetail() {
  const result = render(renderWithRouter(<StoreDetail />));

  return {
    result,
  };
}

describe('/store/:storeId', () => {
  it('해당 경로 접속 시, 화면이 올바르게 노출된다.', () => {
    // 메뉴 목록 올바르게 노출되는지 체크
    // 메뉴 목록이 최소 1개 이상인지 체크
  });

  it('잘못된 경로 접근 시 데이터 없음 페이지가 노출된다.', () => {
    // 없는 storeId로 접근 시 에러 페이지 노출
  });

  it('메뉴 아이템 클릭 시 /store/:storeId/menu/:menuId 경로로 이동한다.', () => {
    //
  });

  it('장바구니에 담긴 음식이 없는 경우, 하단 주문하기 버튼이 노출되지 않는다.', () => {
    //
  });

  it('장바구니에 담긴 음식이 있는 경우, 하단 주문하기 버튼의 {개수}와 {총 금액}이 올바르게 노출된다.', () => {
    // 개수, 총 금액 올바르게 노출되는지 체크
  });
});
