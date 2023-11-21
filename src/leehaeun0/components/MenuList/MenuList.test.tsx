import { render } from '@testing-library/react';
import MenuList from './MenuList';
import { MENU_DATA } from '../../mocks/menu';

describe('MenuList Component', () => {
  it('메뉴 타이틀 랜더링 확인', () => {
    const { getByRole } = render(<MenuList data={MENU_DATA} />);
    const heading = getByRole('heading', { level: 2 });

    expect(heading).toHaveTextContent(MENU_DATA.title);
  });

  it('메뉴 목록 갯수 확인', () => {
    const { getAllByRole } = render(<MenuList data={MENU_DATA} />);
    const menuItems = getAllByRole('listitem');

    expect(menuItems).toHaveLength(MENU_DATA.menus.length);
  });
});
