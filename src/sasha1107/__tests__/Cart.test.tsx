import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const user = userEvent.setup();

describe('App Component', () => {
  it('should render App component', () => {
    const { getByText } = render(<App />);
    expect(getByText('Home')).toBeInTheDocument();
  });

  it('should navigate to /store/1 when click on the first store', async () => {
    const { getByText, getByRole } = render(<App />);
    const firstStore = getByRole('link', { name: '카페' });

    await user.click(firstStore);
    expect(getByText('카페')).toBeInTheDocument();
    expect(window.location.pathname).toBe('/store/1');
  });
});

describe('Store Component', () => {
  it('메뉴를 클릭하면 옵션 선택 페이지로 이동한다.', async () => {
    const { getByText } = render(<App />);

    const menu = getByText('생 아메리카노');
    await user.click(menu);
    expect(window.location.pathname).toBe('/store/1/menu/1');
  });

  it('장바구니에 담긴 음식이 없는 경우 주문하기 버튼이 보이지 않는다', () => {
    const { queryByText } = render(<App />);
    const orderBtn = queryByText('주문하기');
    expect(orderBtn).not.toBeInTheDocument();
  });

  it('장바구니에 담긴 음식이 있는 경우 주문하기 버튼이 보인다', async () => {
    const { getByText, getByRole } = render(<App />);
    const menu1 = getByText('생 아메리카노');
    await user.click(menu1);
    const plusBtn = getByRole('button', { name: '수량 증가' });
    await user.click(plusBtn);
    await user.click(plusBtn);
    const addBtn = getByRole('button', { name: '최종금액' });
    await user.click(addBtn);
    const orderBtn = getByRole('button', { name: '주문하기' });
    expect(orderBtn).toBeInTheDocument();
    expect(orderBtn).toHaveTextContent('주문하기');
    expect(orderBtn).toHaveTextContent('3'); // 수량
    expect(orderBtn).toHaveTextContent('8,400원');
  });
});

describe('장바구니에 음식 담기', () => {
  it('음식을 담으면 장바구니에 담긴다.', async () => {
    const { getByText, getByRole } = render(<App />);
    const menu2 = getByText('NEW) 시나몬 츄러스 (30cm)');
    await user.click(menu2);
    const plusBtn = getByRole('button', { name: '수량 증가' });
    await user.click(plusBtn);
    const addBtn = getByRole('button', { name: '최종금액' });
    await user.click(addBtn);
    const orderBtn = getByRole('button', { name: '주문하기' });
    expect(orderBtn).toBeInTheDocument();
    expect(orderBtn).toHaveTextContent('주문하기');
    expect(orderBtn).toHaveTextContent('5'); // 수량
    expect(orderBtn).toHaveTextContent('14,600');
  });
  it('같은 음식을 여러 번 담으면 수량이 증가한다.', async () => {
    const { getByText, getByRole } = render(<App />);
    const menu1 = getByText('생 아메리카노');
    await user.click(menu1);
    const plusBtn = getByRole('button', { name: '수량 증가' });
    await user.click(plusBtn);
    await user.click(plusBtn);
    const addBtn = getByRole('button', { name: '최종금액' });
    await user.click(addBtn);
    const orderBtn = getByRole('button', { name: '주문하기' });
    expect(orderBtn).toBeInTheDocument();
    expect(orderBtn).toHaveTextContent('주문하기');
    expect(orderBtn).toHaveTextContent('8'); // 수량
    expect(orderBtn).toHaveTextContent('23,000원');
  });
});

describe('장바구니에 음식을 담지 않고 뒤로가기', () => {
  it('브라우저의 뒤로가기 버튼을 클릭하면 장바구니에 담지 않고 메뉴 선택 페이지로 돌아간다.', async () => {
    const { getByText, getByRole } = render(<App />);
    const menu1 = getByText('생 아메리카노');

    await user.click(menu1);
    const plusBtn = getByRole('button', { name: '수량 증가' });
    await user.click(plusBtn);
    await user.click(plusBtn);
    const addBtn = getByRole('button', { name: '최종금액' });
    await user.click(addBtn);
    const orderBtn = getByRole('button', { name: '주문하기' });
    expect(orderBtn).toBeInTheDocument();
    expect(orderBtn).toHaveTextContent('주문하기');
    expect(orderBtn).toHaveTextContent('11'); // 수량
    expect(orderBtn).toHaveTextContent('31,400원');

    const menu3 = getByText('1리터 보틀 아메리카노');
    await user.click(menu3);

    // 뒤로가기 버튼 클릭
    const backBtn = getByRole('button', { name: '뒤로가기' });
    await user.click(backBtn);

    // 메뉴 선택 페이지로 돌아왔는지 확인
    expect(orderBtn).toHaveTextContent('주문하기');
    expect(orderBtn).toHaveTextContent('11'); // 수량
    expect(orderBtn).toHaveTextContent('31,400원');
  });
});
