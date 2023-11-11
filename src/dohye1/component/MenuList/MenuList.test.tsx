import { getMenuGroupList, renderWithRouter } from '../../utils';
import { TEST_ID } from '../../constant';

describe('메뉴 리스트 그리기', () => {
  it('메뉴 리스트가 내가 넘겨준 길이만큼 그려졌나?', () => {
    const menuList = getMenuGroupList(['인기메뉴', '포케', '보울']);

    const { getAllByTestId } = renderWithRouter([`/store/1`]);

    const groupLength = getAllByTestId(TEST_ID.MENU_GROUP);

    expect(groupLength.length).toBe(menuList.length);
  });
});
