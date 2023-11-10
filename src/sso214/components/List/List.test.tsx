import { render } from '@testing-library/react';
import { TEST_ID } from '../../constant/TEST_ID';
import { MenuItem } from '../../types/Model';
import snack_menu from '../../mock/snack_menu.json';
import { Props, CONTAINER_TAGS } from './List';
import { CustomList } from './index';

function renderList(props?: Partial<Props<MenuItem>>) {
  const DATA = snack_menu.menus;

  const result = render(
    <CustomList<MenuItem>
      data={DATA}
      renderItem={() => <li data-testid={TEST_ID.LIST.ITEM} />}
      keyExtractor={(item) => item.name}
      containerTag="ol"
      {...props}
    />,
  );

  const ListWrap = () => result.getByTestId(TEST_ID.LIST.LIST);
  const ListItems = () => result.queryAllByTestId(TEST_ID.LIST.ITEM);

  return {
    DATA,
    ListWrap,
    ListItems,
  };
}

describe('<List />', () => {
  it.each(CONTAINER_TAGS)('주어진 containerTag 에 맞는 태그가 렌더링된다.', (tag) => {
    const { ListWrap } = renderList({ containerTag: tag });

    expect(ListWrap().tagName).toBe(tag.toUpperCase());
  });

  it('주어진 데이터들을 올바르게 렌더링한다.', () => {
    const { ListItems, DATA } = renderList();

    expect(ListItems().length).toBe(DATA.length);
  });
});
